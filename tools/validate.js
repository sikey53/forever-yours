/* Checks that every spell and talent a class layout names still exists in today's game data.
   Writes data/changes/layout-problems.json; the nightly check fixes what it lists.
   Run: node tools/validate.js */
const fs = require('fs'), path = require('path');
const ROOT = path.join(__dirname, '..');
const classes = ['druid', 'warrior', 'paladin', 'hunter', 'rogue', 'priest', 'shaman', 'mage', 'warlock'];
global.window = {};
const problems = [];
const load = f => { try { require(path.join(ROOT, f)); return true; } catch (e) { problems.push({file: f, problem: 'does not load: ' + e.message}); return false; } };
load('classes/common.js');
for (const c of classes) {
  if (!load(`classes/data/${c}.js`) || !load(`classes/summaries/${c}.js`) || !load(`classes/${c}.js`)) continue;
  const C = window.FY_CLASSES[c], W = C.WIZ, S = C.SPELLS;
  const talents = new Set(Object.values(C.TREES).flatMap(t => t.list.map(x => x[0])));
  const spell = (n, where) => { if (n && !S[n] && !talents.has(n) && !(C.MACROS && Object.values(C.MACROS).some(m => m.name === n))) problems.push({class: c, where, name: n, problem: 'spell not in the game data'}); };
  for (const [role, kit] of Object.entries(W.kits)) for (const f of kit.forms) {
    const k = kit[f]; if (!k) { problems.push({class: c, where: `kits.${role}`, name: f, problem: 'missing page'}); continue; }
    ['spam', 'rot', 'short', 'once'].forEach(j => (k[j] || []).forEach(n => spell(n, `kits.${role}.${f}.${j}`)));
    spell(k.interrupt, `kits.${role}.${f}.interrupt`); spell(k.defensive, `kits.${role}.${f}.defensive`);
  }
  const races = W.races.map(r => r[0]);
  for (const [role] of W.roles) {
    (W.stance(role) || []).forEach(n => spell(n, 'stance'));
    races.forEach(r => (W.long(r, role, (W.racials || {})[r] || []) || []).forEach(n => spell(n, `long (${r})`)));
  }
  races.forEach(r => ['none', 'few', 'useful'].forEach(m => Object.values(W.mouse(r, m, (W.racials || {})[r] || [])).filter(Boolean).forEach(x => spell(x.base || x.n, 'mouse'))));
  const tal = (n, where) => { if (!talents.has(n)) problems.push({class: c, where, name: n, problem: 'talent not in the game data'}); };
  Object.entries(C.PLAN).forEach(([s, seq]) => seq.forEach(x => tal(x[1], `PLAN.${s}`)));
  Object.entries(C.PRESETS).forEach(([id, p]) => (p.seq || []).forEach(x => tal(x[1], `PRESETS.${id}`)));
  Object.entries(C.KEY_TALENT || {}).forEach(([s, k]) => tal(k[1], `KEY_TALENT.${s}`));
  Object.keys(C.TALENT_USE || {}).forEach(n => tal(n, 'TALENT_USE'));
}
const out = path.join(ROOT, 'data', 'changes', 'layout-problems.json');
fs.mkdirSync(path.dirname(out), {recursive: true});
fs.writeFileSync(out, JSON.stringify({problems}, null, 1));
console.log(`${problems.length} layout problems`);
problems.slice(0, 40).forEach(p => console.log(' ', JSON.stringify(p)));
