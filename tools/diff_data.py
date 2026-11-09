"""Compare yesterday's and today's generated class data and write what changed.

  python3 tools/diff_data.py OLD_DIR NEW_DIR

Writes data/changes/YYYY-MM-DD.json (only when something changed) with one entry per change:
  {"class", "kind": "spell" | "talent", "name", "what": "added" | "removed" | "changed", "field", "old", "new"}
The nightly check turns these into readable patch notes and summaries."""
import json, os, re, sys, datetime
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def load(path):
    try: txt = open(path).read()
    except OSError: return None
    return json.loads(txt[txt.index(' = {') + 3: txt.rstrip().rindex(';')])

def main(old_dir, new_dir):
    out = []
    for f in sorted(os.listdir(new_dir)):
        if not f.endswith('.js'): continue
        cls = f[:-3]
        a, b = load(os.path.join(old_dir, f)), load(os.path.join(new_dir, f))
        if not a or not b: continue
        add = lambda **k: out.append({'class': cls, **k})
        for n in b['spells'].keys() - a['spells'].keys(): add(kind='spell', name=n, what='added', new=b['spells'][n])
        for n in a['spells'].keys() - b['spells'].keys(): add(kind='spell', name=n, what='removed', old=a['spells'][n])
        for n in a['spells'].keys() & b['spells'].keys():
            for k in ('lvl', 'levels', 'cd', 'cost', 'form', 'd', 'talent'):
                if a['spells'][n].get(k) != b['spells'][n].get(k):
                    add(kind='spell', name=n, what='changed', field=k, old=a['spells'][n].get(k), new=b['spells'][n].get(k))
        ta = {x[0]: x for t in a['trees'].values() for x in t['list']}
        tb = {x[0]: x for t in b['trees'].values() for x in t['list']}
        for n in tb.keys() - ta.keys(): add(kind='talent', name=n, what='added', new={'ranks': b['ranks'].get(n)})
        for n in ta.keys() - tb.keys(): add(kind='talent', name=n, what='removed', old={'ranks': a['ranks'].get(n)})
        for n in ta.keys() & tb.keys():
            for i, k in enumerate(['name', 'row', 'col', 'max', 'req']):
                if ta[n][i] != tb[n][i]: add(kind='talent', name=n, what='changed', field=k, old=ta[n][i], new=tb[n][i])
            if a['ranks'].get(n) != b['ranks'].get(n):
                add(kind='talent', name=n, what='changed', field='ranks', old=a['ranks'].get(n), new=b['ranks'].get(n))
    if out:
        d = os.path.join(ROOT, 'data', 'changes'); os.makedirs(d, exist_ok=True)
        day = datetime.date.today().isoformat()
        path = os.path.join(d, day + '.json')
        prev = json.load(open(path))['changes'] if os.path.exists(path) else []
        json.dump({'date': day, 'changes': prev + out}, open(path, 'w'), indent=1, ensure_ascii=False)
    print(f'{len(out)} changes')

if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
