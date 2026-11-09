/* Forever Yours: turns a class's generated game data (classes/data/<class>.js, from talentsforever.com)
   and its hand-written layout file (classes/<class>.js) into what the pages read. */
window.FY_makeClass = function(cls, H){
  const D = (window.FY_DATA || {})[cls];
  const states = H.CLASS_PROFILE.states;
  const SPELLS = {};
  Object.entries(D.spells).forEach(([n, s]) => {
    SPELLS[n] = {form: s.form, cd: s.cd, lvl: s.lvl, d: [s.cost, s.d].filter(Boolean).join('. '), ...(s.talent ? {talent: true} : {})};
  });
  /* racials of this class's races, so they can go on a key too */
  (D.races || []).forEach(r => r.abilities.forEach(([n, d]) => { if (!SPELLS[n] && /Instant|cooldown/i.test(d)) SPELLS[n] = {form: 'Racial · ' + r.race, cd: (d.match(/(\d+ (?:sec|min)) cooldown/) || [,''])[1], lvl: 1, d}; }));
  Object.assign(SPELLS, H.extraSpells || {});
  /* what each talent gives, worked out from its own rank text: talents that name your spells are listed under those spells */
  const spellNames = Object.keys(SPELLS).filter(n => n.length > 3).sort((x, y) => y.length - x.length);
  const mentions = text => { const found = []; let t = ' ' + (text || '') + ' '; spellNames.forEach(n => { const re = new RegExp('(^|[^A-Za-z])' + n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?![A-Za-z])'); if (re.test(t)){ found.push(n); t = t.replace(re, '$1#'); } }); return found; };
  const short = t => (t || '').split(/(?<=\.)\s/)[0].replace(/\.$/, '');
  const FX = {}, TALENT_USE = {};
  Object.entries(D.ranks || {}).forEach(([name, ranks]) => {
    const own = D.spells[name] && D.spells[name].talent;
    const named = mentions(ranks[ranks.length - 1]).filter(n => n !== name);
    FX[name] = r => {
      const text = short(ranks[Math.min(r, ranks.length) - 1]);
      if (own) return [[['@new'], `${name}: ${short(D.spells[name].d)}`]];
      return [[named.length ? named : ['@all'], text]];
    };
    const lv = named.map(n => (SPELLS[n] && SPELLS[n].lvl) || 1);
    TALENT_USE[name] = lv.length ? Math.min(...lv) : 10;
  });
  Object.assign(TALENT_USE, H.TALENT_USE || {});
  const G = {all: '@all', neu: '@new'};
  const GROUP_LABEL = {'@new': 'New abilities', '@all': 'Always'};
  const stateOf = f => Object.values(states).find(st => st.match && st.match.test(f || ''));
  const notes = (D.notes || []).map(([n, t]) => `<p><b style="font-family:var(--cond);font-weight:600">${n}</b>. ${t}</p>`).join('');
  const NOTES_HTML = notes ? `<details><summary>Good to know in Forever</summary><div class="dbody notes">${notes}<p class="muted" style="font-size:13px">From talentsforever.com's notes on the Forever ${D.class}.</p></div></details>` : '';
  const SB_FORMS = [['all', 'All', 'var(--muted)']].concat(Object.values(states).filter(st => st.match).map(st => [st.label, st.label, st.c]), [['Any', 'Any', 'var(--gold)']]);
  const sbForm = f => (stateOf(f) || {label: 'Any'}).label;
  const FORM_COLOR = f => (stateOf(f) || {c: 'var(--gold)'}).c;
  const targetLevel = t => t.startsWith('@') ? 1 : ((SPELLS[t] && SPELLS[t].lvl) || 1);
  const PRESETS = Object.assign({}, D.presets || {}, H.PRESETS || {});
  /* the plan behind "Next point" for each spec: the community leveling order for its tree */
  const PLAN = Object.fromEntries(Object.entries(H.SPEC_PLAN || {}).map(([spec, id]) => [spec, ((PRESETS[id] || {}).seq || []).map(([tr, n, to]) => [tr, n, to, (((D.ranks || {})[n] || []).slice(-1)[0] || '').split('. ')[0].replace(/\.$/, '')])]));
  /* the big talent at the bottom of each spec's plan, and when it should land */
  const KEY_TALENT = Object.fromEntries(Object.entries(PLAN).map(([spec, seq]) => {
    const deep = seq.map(([tr, n]) => [tr, n, (D.trees[tr].list.find(x => x[0] === n) || [])[1] || 0]).filter(x => x[2] === 7);
    return deep.length ? [spec, [deep[0][0], deep[0][1], 40]] : null;
  }).filter(Boolean));
  const groups = {lvl: 'Leveling', dng: 'Dungeons', raid: 'Dungeons and raids at 60', pvp: 'PvP'};
  const GOALS_HTML = Object.entries(groups).map(([g, label]) => {
    const opts = Object.entries(PRESETS).filter(([id]) => id.startsWith(g + '-')).map(([id, p]) => `<option value="${id}">${p.label}</option>`).join('');
    return opts ? `<optgroup label="${label}">${opts}</optgroup>` : '';
  }).join('');
  const WIZ = Object.assign({
    lv: Object.fromEntries(Object.entries(SPELLS).map(([n, s]) => [n, s.lvl || 1])),
    talents: Object.keys(D.spells).filter(n => D.spells[n].talent),
    notSpells: ['Mount', 'Trinket', 'Healing Potion', 'Mana Potion', 'Bandage', 'Shoot'].concat(Object.values(D.classRacials || {}).flat()),
  }, H.WIZ);
  const slug = r => r.toLowerCase().replace(/[^a-z]+/g, '');
  if (!H.WIZ.races) WIZ.races = (D.races || []).map(r => [slug(r.race), r.race, r.faction]);
  WIZ.racials = Object.fromEntries((D.races || []).map(r => [slug(r.race), ((D.classRacials || {})[r.race] || []).concat(r.abilities.filter(([n, d]) => /Instant|cooldown/i.test(d)).map(([n]) => n))]));
  WIZ.lv = Object.assign({Mount: 10, Trinket: 1, 'Healing Potion': 1, Bandage: 1}, WIZ.lv);
  return {
    WIZ, CLASS_PROFILE: H.CLASS_PROFILE, SPECS: H.SPECS, MACROS: H.MACROS || {},
    TREES: D.trees, TREE_ORDER: D.order, PLAN, TT: {}, RANKS: D.ranks, SPELLS,
    FORM_COLOR, G, GROUP_LABEL, FX, TALENT_USE, TALENT_LATER: {}, targetLevel, KEY_TALENT,
    PRESETS, SB_FORMS, sbForm, FIGHT_HTML: H.FIGHT_HTML || '', NOTES_HTML: H.NOTES_HTML || NOTES_HTML, PLAN_NOTE: H.PLAN_NOTE || '', GOALS_HTML,
    CLASS_NOTES: D.notes || [], DATA_SOURCE: D.talentSource || ''
  };
};
