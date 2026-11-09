"""Turn the talentsforever.com exports (data/talentsforever/<class>.json, CC BY 4.0)
into classes/data/<class>.js, the format the Forever Yours pages read.
Runs in the daily Sync game data workflow, so talents, ranks and spells stay current on their own."""
import json, re, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, 'data', 'talentsforever')
OUT = os.path.join(ROOT, 'classes', 'data')
CLASSES = ['warrior', 'paladin', 'hunter', 'rogue', 'priest', 'shaman', 'mage', 'warlock', 'druid']
TREE_KEYS = {'Feral Combat': 'feral', 'Restoration': 'resto', 'Beast Mastery': 'bm'}

def key(name):
    return TREE_KEYS.get(name) or re.sub(r'[^a-z]', '', name.lower())

def learn_level(text):
    m = re.search(r'level (\d+)', text or '')
    return int(m.group(1)) if m else None


ORDER_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

def decode_alloc(code, trees):
    """'0330-05-2500' -> {treeKey: {talent: points}} using the export's talent order."""
    parts = code.split('-')
    out = {}
    for (k, t), digits in zip(trees.items(), parts + [''] * 3):
        for (name, *_), ch in zip(t['list'], digits):
            if ch.isdigit() and int(ch): out.setdefault(k, {})[name] = int(ch)
    return out

def decode_order(order, alloc, trees):
    """'CB2EFB...' -> [[tree, talent, rankTo], ...]; a letter is a talent, an optional number how many points, else up to the final rank."""
    flat = [(k, x[0]) for k, t in trees.items() for x in t['list']]
    seq, have = [], {}
    for ch, num in re.findall(r'([A-Za-z])(\d*)', order):
        i = ORDER_CHARS.find(ch)
        if i < 0 or i >= len(flat): continue
        k, n = flat[i]
        final = alloc.get(k, {}).get(n, 0)
        to = min(final, have.get(n, 0) + int(num)) if num else final
        if to > have.get(n, 0): seq.append([k, n, to]); have[n] = to
    return seq

def row_order(alloc, trees):
    """a finished build as a legal order: main tree first, row by row."""
    seq = []
    main = dominant(alloc)
    for k, t in sorted(trees.items(), key=lambda kv: kv[0] != main):
        for row in range(1, 8):
            for x in t['list']:
                if x[1] == row and alloc.get(k, {}).get(x[0]): seq.append([k, x[0], alloc[k][x[0]]])
    return seq

def dominant(alloc):
    return max(alloc, key=lambda k: sum(alloc[k].values())) if alloc else None

def text(h):
    return re.sub(r'\s+([,.])', r'\1', re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', h))).strip()

def presets_for(cls, trees):
    pages = os.path.join(SRC, 'pages')
    out, lvl_seq = {}, {}
    # leveling orders: the most common order per spec, as far as players agree
    try: lv = open(os.path.join(pages, cls + '-leveling.html')).read()
    except OSError: lv = ''
    best = {}
    for lvl, code, order in re.findall(r'href="/%s/(\d+)/([0-9-]+?)-([A-Za-z0-9]+)-\d+"' % cls, lv):
        alloc = decode_alloc(code, trees); k = dominant(alloc)
        if k and int(lvl) > best.get(k, (0,))[0]: best[k] = (int(lvl), decode_order(order, alloc, trees))
    for k, (lvl, seq) in best.items(): lvl_seq[k] = (lvl, seq)
    # level 60 builds, by what players tagged them for
    try: bd = open(os.path.join(pages, cls + '-builds.html')).read()
    except OSError: bd = ''
    bd = bd[bd.find('<body'):]
    cards = []
    for m in re.finditer(r'<h3[^>]*>(.*?)</h3>(.*?)href="/%s/60/([0-9-]+?)-\d+"' % cls, bd, re.S):
        name, body, code = text(m.group(1)), m.group(2), m.group(3)
        tag = re.search(r'(\d+)\s*</?[^>]*>?\s*(Leveling|PvE|PvP) tags', body) or re.search(r'(\d+)\D{0,40}?(Leveling|PvE|PvP) tags', text(body))
        maxes = re.search(r'(Maxes .*?\.)( Takes .*?\.)?', text(body))
        cards.append({'name': name, 'code': code, 'tag': tag.group(2) if tag else None, 'n': int(tag.group(1)) if tag else 0, 'why': (maxes.group(0) if maxes else '')})
    pick = {}
    for c in cards:
        alloc = decode_alloc(c['code'], trees); k = dominant(alloc)
        if not k: continue
        for tag in ([c['tag']] if c['tag'] else []):
            key = (tag, k)
            if c['n'] > pick.get(key, {'n': -1})['n']: pick[key] = {**c, 'alloc': alloc}
        if ('Top', k) not in pick: pick[('Top', k)] = {**c, 'alloc': alloc}
    group = {'Leveling': 'lvl', 'PvE': 'raid', 'PvP': 'pvp'}
    for (tag, k), c in pick.items():
        if tag == 'Top': continue
        tree_label = trees[k]['label']
        seq = row_order(c['alloc'], trees)
        if tag == 'Leveling' and k in lvl_seq:
            first = lvl_seq[k][1]
            seq = first + [s for s in seq if not any(f[1] == s[1] and f[2] >= s[2] for f in first)]
        label = {'Leveling': 'Leveling', 'PvE': 'Dungeons and raids', 'PvP': 'PvP'}[tag] + ' · ' + c['name'].replace(' ' + title_of(cls), '')
        why = f"The most tagged {tag} build for {tree_label} on talentsforever.com ({c['n']} tags). " + c['why']
        out[f"{group[tag]}-{k}"] = {'label': label, 'why': why.strip(), 'seq': seq}
    # a spec with a leveling order but no tagged level 60 build still gets its order
    for k, (lvl, seq) in lvl_seq.items():
        if f'lvl-{k}' not in out:
            top = pick.get(('PvE', k)) or pick.get(('Top', k))
            more = row_order(top['alloc'], trees) if top else []
            out[f'lvl-{k}'] = {'label': f"Leveling · {trees[k]['label']}", 'why': f"The order most {trees[k]['label']} players follow to level {lvl} on talentsforever.com, then a popular level 60 build.", 'seq': seq + [s for s in more if not any(f[1] == s[1] and f[2] >= s[2] for f in seq)]}
    return out

def title_of(cls):
    return cls.capitalize()

def build(cls):
    d = json.load(open(os.path.join(SRC, cls + '.json')))
    title = d['class']
    sd = d['spell_desc']
    # talents
    trees, order, ranks, talent_row = {}, [], {}, {}
    for t in d['talents']['trees']:
        k = key(t['name']); order.append(k)
        lst = []
        for x in t['talents']:
            desc = x['desc'][-1] if x.get('desc') else ''
            lst.append([x['name'], x['row'], x['col'], x['max'], x.get('req'), desc])
            ranks[x['name']] = x.get('desc') or []
            talent_row[x['name']] = x['row']
        trees[k] = {'label': t['name'], 'list': lst}
    # spells
    sb = d['spellbook']
    talent_spells = set(sb.get('talents') or [])
    spells = {}
    def entry(name, rank):
        for r in ([rank] if rank else []) + ['', 'Rank 1']:
            v = sd.get(f'{title}|{name}|{r}')
            if v: return v
        return None
    names = []
    for tab in sb['tabs']:
        for name, rank in tab['spells']:
            if name not in names: names.append(name)
            first_tab = spells.get(name, {}).get('tab') or tab['name']
            spells.setdefault(name, {'tab': first_tab})
    for name in names:
        v = entry(name, 'Rank 1') or {}
        lines = v.get('l') or []
        flat = [x for pair in lines for x in pair if x]
        req = [x[len('Requires '):] for x in flat if x.startswith('Requires ')]
        stance = [r for r in req if re.search(r'Stance|Form|Stealth|Shadowform|Aura', r)]
        cd = next((x for x in flat if 'cooldown' in x), '')
        cost = next((x for x in flat if re.search(r'\d+ (Rage|Energy|Mana|Focus)|\d+% of base mana', x)), '')
        levels = sb['levels'].get(name)
        lvl = levels[0] if levels else learn_level(v.get('lv'))
        is_talent = name in talent_spells
        if lvl is None and is_talent and name in talent_row:
            lvl = 10 + (talent_row[name] - 1) * 5
        spells[name] = {
            'form': ', '.join(stance) if stance else 'Any',
            'cd': cd.replace(' cooldown', '') if cd else '',
            'cost': cost, 'lvl': lvl or 1,
            'ranks': len(levels) if levels else 1,
            'levels': levels or ([lvl] if lvl else []),
            'd': v.get('d', ''),
            'tab': spells[name]['tab'],
        }
        if is_talent: spells[name]['talent'] = True
    # races and racials for this class
    races = []
    for faction, lst in d.get('racials', {}).items():
        for r in lst:
            if title in r.get('classes', []):
                races.append({'race': r['race'], 'faction': faction, 'abilities': [[a[0], a[1]] for a in r.get('abilities', [])]})
    out = {
        'class': title, 'generated': d.get('generated'), 'source': 'talentsforever.com (CC BY 4.0)',
        'talentSource': d['talents'].get('source', ''),
        'trees': trees, 'order': order, 'ranks': ranks, 'spells': spells, 'races': races,
        'notes': [[a[0], a[1]] for a in d.get('class_abilities', [])],
        'gone': sb.get('gone') or [],
        'presets': presets_for(cls, trees),
    }
    js = ('/* Generated by tools/build_data.py from talentsforever.com (CC BY 4.0). Do not edit by hand. */\n'
          f'(window.FY_DATA ||= {{}}).{cls} = ' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
    os.makedirs(OUT, exist_ok=True)
    open(os.path.join(OUT, cls + '.js'), 'w').write(js)
    return len(spells), sum(len(t['list']) for t in trees.values())

if __name__ == '__main__':
    for c in (sys.argv[1:] or CLASSES):
        if os.path.exists(os.path.join(SRC, c + '.json')):
            print(c, *build(c))
