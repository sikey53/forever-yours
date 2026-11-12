/* Forever Yours class layout: Druid.
   Spells, levels, ranks and talents come from classes/data/druid.js (talentsforever.com, CC BY 4.0, refreshed daily),
   short texts from classes/summaries/druid.js. This file decides the forms, where things go on the bars,
   the plans and what the rotations say. */
(window.FY_CLASSES ||= {}).druid = (() => {
const MACROS = {
  clawpounce:{name:'Claw or Pounce', code:'#showtooltip\n/cast [stealth] Pounce; Claw', note:'In Prowl it casts Pounce, out of stealth Claw. Until you learn Pounce at 36 it does nothing in Prowl, so open with 1 Rake instead.'},
  shredravage:{name:'Shred or Ravage', code:'#showtooltip\n/cast [stealth] Ravage; Shred', note:'In Prowl it casts Ravage, out of stealth Shred. Both need you behind the target. Until you learn Ravage at 32 it does nothing in Prowl, so open with 1 Rake instead.'},
  enragebash:{name:'Enrage + Bash', code:'#showtooltip Bash\n/cast Enrage\n/cast Bash', note:'Enrage is off the global cooldown and gives 10 rage at once, exactly what Bash costs.'},
  travel:{name:'Travel or Aquatic', code:'#showtooltip\n/cast [swimming] Aquatic Form; Travel Form', note:'One key for land and water.'},
  dash:{name:'Cat, then Dash', code:'#showtooltip Dash\n/cast Dash\n/cast [noform][form:1] Cat Form', note:'In cat it Dashes. From caster or bear it goes cat, then Dashes on the next press. The 1 is bear, the first icon on your stance bar.'},
  heal:{name:'Emergency Regrowth', code:'#showtooltip Regrowth\n/cancelform\n/cast [@target,help,nodead][@mouseover,help,nodead][@player] Regrowth', note:'Drops your form and heals your friendly target. With an enemy targeted it heals whoever you hover, otherwise you. Leaves you in caster form.'},
  poison:{name:'Abolish Poison on mouseover', code:'#showtooltip\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Abolish Poison', note:'Cleanses whoever you hover, a name, a character or a party frame. Otherwise your friendly target, otherwise you.'},
  curse:{name:'Remove Curse on mouseover', code:'#showtooltip\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Remove Curse', note:'Cleanses whoever you hover, a name, a character or a party frame. Otherwise your friendly target, otherwise you.'},
  instant:{name:'Instant Rejuvenation', code:'#showtooltip Rejuvenation\n/cancelform\n/cast [@target,help,nodead][@mouseover,help,nodead][@player] Rejuvenation', note:'Same targeting, but instant: use it while moving or taking hits.'}
};
/* talents (Forever data from talentsforever.com): [name,row,col,max,req,desc] */

/* talent plans behind "Next point". feral: the most taken level 60 shape on talentsforever.com (9/32/10), ordered for cat damage
   with only two tank points. pvp: a battleground hybrid that heals and fights in cat and bear (7/23/21). */
const PLAN = {
  feral:[
    ['feral','Ferocity',5,'Cheaper Maul and Swipe now, Claw and Rake from 20'],
    ['feral','Feral Instinct',3,'Stronger Swipe for bear pulls, and it opens row 3. Any three points you already spent in rows 1 and 2 do the same job',true],
    ['feral','Feral Swiftness',2,'30% faster in cat and 4% dodge'],
    ['feral','Savage Fury',2,'10% more damage on Claw, Rake, Shred, Maul and Swipe'],
    ['feral','Sharpened Claws',2,'6% crit in cat and bear'],
    ['feral','Feral Charge',1,'Bear charge that interrupts, cat leap behind the target'],
    ['feral','Predatory Strikes',3,'Attack power in cat and bear that grows with your level'],
    ['feral','Blood Frenzy',2,'An extra combo point on every crit in cat, 5 rage on every crit in bear'],
    ['feral','Lacerate',1,'One point that makes you a tank: a stacking bleed with high threat, and the bleed turns on Rend and Tear in bear'],
    ['feral','Leader of the Pack',1,'3% crit for you and your party'],
    ['feral','Natural Instinct',2,'20% bigger melee crits, and stronger heals from your Intellect'],
    ['feral','Rend and Tear',5,'15% more damage on bleeding targets, so on everything you Rake or Lacerate'],
    ['feral','Predatory Discipline',1,'Ferocious Bite keeps your extra energy. Needed for Shifting Power'],
    ['feral','Shifting Power',1,'Turns mana into 40 energy, your damage cooldown in cat'],
    ['feral','Primal Bite',1,'The second tank point: a big threat hit that also does full weapon damage'],
    ['resto','Heart of the Wild',5,'10% Strength in cat, 20% Stamina in bear, 10% Intellect'],
    ['resto','Naturalist',5,'10% more damage on everything you do'],
    ['balance','Genesis',5,'10% more damage from your bleeds: Rake, Rip and Lacerate'],
    ['balance',"Nature's Majesty",2,'4% crit in melee'],
    ['balance',"Nature's Reach",2,'4% more chance to hit']
  ],
  pvp:[
    ['feral','Furor',5,'Keep your energy when you leave cat to heal, and 10 rage every time you go bear'],
    ['feral','Feral Swiftness',2,'30% faster in cat and 4% dodge'],
    ['feral','Brutal Impact',2,'Longer Bash and Pounce stuns, Bash back 30 sec sooner'],
    ['feral','Thick Hide',1,'Armor in cat and bear, and it opens row 3'],
    ['feral','Feral Charge',1,'Roots and interrupts a caster from bear, leaps behind them from cat'],
    ['feral','Savage Fury',2,'10% more damage on Claw, Rake, Shred, Maul and Swipe'],
    ['feral','Sharpened Claws',2,'6% crit in cat and bear'],
    ['feral','Predatory Strikes',3,'Attack power in cat and bear that grows with your level'],
    ['feral','Blood Frenzy',2,'An extra combo point on every crit in cat, 5 rage on every crit in bear'],
    ['feral','Natural Instinct',2,'20% bigger melee crits, and your heals grow with your Intellect'],
    ['feral','Leader of the Pack',1,'3% crit for you and your group'],
    ['resto','Heart of the Wild',5,'More mana for heals, Strength in cat and 20% Stamina in bear'],
    ['resto','Naturalist',5,'Faster Healing Touch and 10% more damage in every form'],
    ['resto','Natural Shapeshifter',3,'30% cheaper shifting, the thing you do most in a battleground'],
    ['resto','Gift of Nature',5,'10% stronger heals'],
    ['resto','Bloom',1,'A free extra heal when Rejuvenation or Regrowth ends or is dispelled'],
    ['resto','Swiftmend',1,'Instant heal from a Rejuvenation or Regrowth already on the target'],
    ['resto',"Nature's Swiftness",1,'One instant Healing Touch or Entangling Roots, the save button'],
    ['balance','Genesis',5,'10% stronger heals over time and bleeds'],
    ['balance',"Nature's Majesty",2,'4% crit on heals and melee']
  ]
};

/* the level a talent starts doing something, where it is earlier or later than the spells it names */
const TALENT_USE = {
  'Ferocity':10,'Furor':10,'Feral Swiftness':20,'Feral Instinct':16,'Brutal Impact':14,'Thick Hide':10,'Shredding Attacks':20,'Savage Fury':10,'Feral Charge':10,'Sharpened Claws':10,
  'Predatory Strikes':10,'Lacerate':10,'Predatory Discipline':24,'Blood Frenzy':10,'Leader of the Pack':10,'Natural Instinct':10,'Rend and Tear':20,'Natural Reaction':10,'Primal Bite':10,'Shifting Power':20,
  "Nature's Focus":1,'Heart of the Wild':1,'Naturalist':1,'Reflection':1,'Natural Shapeshifter':10,'Subtlety':1,'Gift of Nature':1,'Bloom':4,'Tranquil Spirit':1,'Improved Rejuvenation':4,
  'Swiftmend':4,"Nature's Swiftness":1,'Living Spirit':1,'Improved Tranquility':30,'Improved Regrowth':12,'Wild Growth':1,
  'Improved Wrath':1,'Genesis':4,'Moonglow':1,'Improved Moonfire':4,"Nature's Majesty":1,"Nature's Reach":1,'Improved Entangling Roots':8,"Nature's Splendor":4,'Insect Swarm':1,'Vengeance':1,
  'Improved Starfire':20,'Overgrowth':8,"Nature's Grace":1,'Eclipse':20,'Moonfury':1,'Moonkin Form':1
};
/* parts of a talent that only start later */
const TALENT_LATER = {
  'Brutal Impact':[36,'The Pounce part starts at 36, when you learn Pounce.'],
  'Feral Instinct':[20,'The Prowl part starts at 20, with Cat Form.'],
  'Blood Frenzy':[20,'The combo point part starts at 20, with Cat Form.'],
  'Furor':[20,'The energy part starts at 20, with Cat Form.'],
  'Ferocity':[24,'Claw counts from 20 and Rake from 24.'],
  'Savage Fury':[24,'Claw and Shred count from 20, Rake from 24.'],
  'Tranquil Spirit':[30,'The Tranquility part starts at 30.'],
  'Natural Shapeshifter':[20,'Cat Form counts from 20, Shifting Power from 40.']
};

const PRESETS = {
  'lvl-cat':{label:'Leveling damage (cat)', why:'Fast solo leveling in cat. Shifting Power at 40, then sustain and dodge.', seq:[['feral','Ferocity',5],['feral','Thick Hide',3],['feral','Brutal Impact',2],['feral','Sharpened Claws',2],['feral','Savage Fury',2],['feral','Feral Charge',1],['feral','Feral Swiftness',2],['feral','Predatory Strikes',3],['feral','Leader of the Pack',1],['feral','Predatory Discipline',1],['feral','Shredding Attacks',3],['feral','Rend and Tear',5],['feral','Shifting Power',1],['feral','Furor',5],['feral','Blood Frenzy',2],['feral','Natural Instinct',2],['feral','Natural Reaction',3],['resto','Heart of the Wild',5],['resto','Natural Shapeshifter',3]]},
  'lvl-hybrid':{label:'Cat damage that can tank dungeons 9/32/10', why:'The most taken level 60 shape on talentsforever.com, 9/32/10: every cat damage talent, with Lacerate and Primal Bite as the only two tank points. Heart of the Wild, Naturalist, Genesis and the crit and hit talents in the other two trees add more damage than the last Feral points would.', plan:'feral'},
  'pvp-hybrid':{label:'Battleground hybrid: heal, cat and bear 7/23/21', why:'Heals with Swiftmend and Nature\'s Swiftness, cat damage with Blood Frenzy and Natural Instinct, cheap shifting and Furor to move between them. Built between the two most tagged PvP shapes on talentsforever.com, the 16/11/24 healer and the 11/24/16 feral.', plan:'pvp'},
  'lvl-heal':{label:'Leveling healer', why:'Restoration with Naturalist for damage while questing, and Wrath talents for pulling.', seq:[['resto','Heart of the Wild',5],['resto','Naturalist',5],['resto','Gift of Nature',5],['resto','Improved Rejuvenation',3],['resto','Swiftmend',1],['resto','Reflection',1],["resto","Nature's Swiftness",1],['resto','Living Spirit',3],['resto','Bloom',1],['resto','Improved Regrowth',5],['resto','Wild Growth',1],['resto','Reflection',3],["resto","Nature's Focus",5],['resto','Tranquil Spirit',5],['balance','Improved Wrath',5],['balance','Genesis',3]]},
  'dng-tank':{label:'Dungeon tank (bear)', why:'Threat with Primal Bite and Lacerate, armor, dodge and Stamina.', seq:[['feral','Ferocity',5],['feral','Thick Hide',3],['feral','Feral Instinct',2],['feral','Sharpened Claws',2],['feral','Savage Fury',2],['feral','Feral Charge',1],['feral','Brutal Impact',2],['feral','Predatory Strikes',3],['feral','Lacerate',1],['feral','Blood Frenzy',2],['feral','Leader of the Pack',1],['feral','Natural Instinct',2],['feral','Feral Instinct',3],['feral','Rend and Tear',5],['feral','Primal Bite',1],['feral','Natural Reaction',5],['feral','Furor',5],['feral','Feral Swiftness',2],['resto','Heart of the Wild',5],['resto','Natural Shapeshifter',1]]},
  'raid-heal':{label:'Raid healer', why:'Every healing talent that matters in long fights, plus Genesis for stronger heals over time.', seq:[['resto','Heart of the Wild',5],['resto','Naturalist',5],['resto','Gift of Nature',5],['resto','Subtlety',3],['resto','Improved Rejuvenation',3],['resto','Swiftmend',1],['resto','Reflection',3],["resto","Nature's Swiftness",1],['resto','Living Spirit',3],['resto','Improved Tranquility',2],['resto','Bloom',1],['resto','Improved Regrowth',5],['resto','Wild Growth',1],['resto','Tranquil Spirit',5],['balance','Genesis',5],['balance','Moonglow',3]]},
  'pvp-heal':{label:'PvP healer', why:'Casts that keep going when you are hit, cheap shifting to escape, and fast instant heals.', seq:[['resto','Heart of the Wild',5],["resto","Nature's Focus",5],['resto','Naturalist',5],['resto','Natural Shapeshifter',3],['resto','Gift of Nature',5],['resto','Improved Rejuvenation',3],['resto','Swiftmend',1],["resto","Nature's Swiftness",1],['resto','Living Spirit',3],['resto','Bloom',1],['resto','Improved Regrowth',5],['resto','Wild Growth',1],['resto','Reflection',3],['feral','Furor',5],['feral','Feral Swiftness',2],['resto','Tranquil Spirit',3]]},
  'pvp-feral':{label:'PvP feral', why:'Cat burst with longer Pounce and Bash stuns, speed, dodge and cheap shifting.', seq:[['feral','Ferocity',5],['feral','Thick Hide',3],['feral','Brutal Impact',2],['feral','Sharpened Claws',2],['feral','Savage Fury',2],['feral','Feral Charge',1],['feral','Feral Swiftness',2],['feral','Predatory Strikes',3],['feral','Leader of the Pack',1],['feral','Predatory Discipline',1],['feral','Shredding Attacks',1],['feral','Blood Frenzy',2],['feral','Rend and Tear',5],['feral','Shifting Power',1],['feral','Furor',5],['feral','Natural Instinct',2],['feral','Natural Reaction',5],['resto','Heart of the Wild',5],['resto','Natural Shapeshifter',3]]}
};
PRESETS['dng-cat'] = {...PRESETS['lvl-cat'], label:'Dungeon damage (cat)', why:'Same as leveling cat: it already maxes cat damage.'};
PRESETS['raid-cat'] = {...PRESETS['lvl-cat'], label:'Raid damage (cat)', why:'Full cat damage with Leader of the Pack for your group.'};
PRESETS['raid-tank'] = {...PRESETS['dng-tank'], label:'Raid tank (bear)', why:'Same as the dungeon tank: threat, armor, dodge and Stamina.'};
PRESETS['dng-heal'] = {...PRESETS['lvl-heal'], label:'Dungeon healer', why:'Leveling healer works for dungeons: strong heals with Wrath to help on trash.'};

const WIZ_RAW = {
  name: 'Druid', color: '#FF7C0A',
  roles: [['cat','Cat damage','Melee damage in Cat Form'],['tank','Bear tank','Hold enemies in Bear Form'],['heal','Healer','Restoration heals'],['balance','Caster damage','Balance spells from range']],
  duals: [['heal','Healer'],['tank','Tank'],['cat','Cat damage'],['pvp','PvP'],['none','Not sure yet']],
  states: {cat:['Cat','var(--cat)'], bear:['Bear','var(--bear)'], caster:['Caster','var(--caster)']},
  kits: {
  cat:{forms:['cat','bear','caster'],
    cat:{spam:['Claw','Shred'], rot:['Rake','Rip','Ferocious Bite'], short:['Shifting Power','Faerie Fire','Cower'], once:['Feral Charge','Prowl'], interrupt:'Bear Form', defensive:'Barkskin'},
    bear:{spam:['Maul','Swipe'], rot:['Demoralizing Roar','Growl'], short:['Enrage','Faerie Fire'], once:['Feral Charge','Frenzied Regeneration'], interrupt:'Bash', defensive:'Barkskin'},
    caster:{spam:['Healing Touch','Rejuvenation'], rot:['Wrath','Moonfire','Regrowth'], short:['Entangling Roots','Faerie Fire','Abolish Poison'], once:['Remove Curse','Innervate'], interrupt:'Bear Form', defensive:'Barkskin'}},
  tank:{forms:['bear','cat','caster'],
    bear:{spam:['Maul','Swipe'], rot:['Demoralizing Roar','Lacerate','Growl'], short:['Primal Bite','Enrage','Faerie Fire'], once:['Feral Charge','Frenzied Regeneration'], interrupt:'Bash', defensive:'Barkskin'},
    cat:{spam:['Claw','Shred'], rot:['Rake','Rip','Ferocious Bite'], short:['Shifting Power','Faerie Fire','Cower'], once:['Feral Charge','Prowl'], interrupt:'Bear Form', defensive:'Barkskin'},
    caster:{spam:['Healing Touch','Rejuvenation'], rot:['Wrath','Moonfire','Regrowth'], short:['Entangling Roots','Faerie Fire','Abolish Poison'], once:['Remove Curse','Innervate'], interrupt:'Bear Form', defensive:'Barkskin'}},
  heal:{forms:['caster','bear','cat'],
    caster:{spam:['Rejuvenation','Healing Touch'], rot:['Regrowth','Swiftmend','Wild Growth'], short:['Abolish Poison','Remove Curse',"Nature's Swiftness"], once:['Innervate','Entangling Roots'], interrupt:'Bear Form', defensive:'Barkskin'},
    bear:{spam:['Maul','Swipe'], rot:['Demoralizing Roar','Growl'], short:['Enrage','Faerie Fire'], once:['Frenzied Regeneration'], interrupt:'Bash', defensive:'Barkskin'},
    cat:{spam:['Claw','Shred'], rot:['Rake','Rip','Ferocious Bite'], short:['Faerie Fire','Cower'], once:['Prowl','Dash'], interrupt:'Bear Form', defensive:'Barkskin'}},
  balance:{forms:['caster','bear','cat'],
    caster:{spam:['Wrath','Starfire'], rot:['Moonfire','Insect Swarm','Hurricane'], short:['Entangling Roots','Faerie Fire','Abolish Poison'], once:['Remove Curse','Innervate'], interrupt:'Bear Form', defensive:'Barkskin'},
    bear:{spam:['Maul','Swipe'], rot:['Demoralizing Roar','Growl'], short:['Enrage','Faerie Fire'], once:['Frenzied Regeneration'], interrupt:'Bash', defensive:'Barkskin'},
    cat:{spam:['Claw','Shred'], rot:['Rake','Rip','Ferocious Bite'], short:['Faerie Fire','Cower'], once:['Prowl','Dash'], interrupt:'Bear Form', defensive:'Barkskin'}}
},
  /* one key that does two related things, when the player wants macros: [label, macro id] */
  macroLabel(n, macros){
    if (macros === 'useful' && n === 'Claw') return ['Claw · Pounce', 'clawpounce'];
    if (macros === 'useful' && n === 'Shred') return ['Shred · Ravage', 'shredravage'];
    if (macros !== 'none' && n === 'Bash') return ['Enrage + Bash', 'enragebash'];
    if (macros !== 'none' && n === 'Abolish Poison') return ['Abolish Poison', 'poison'];
    if (macros !== 'none' && n === 'Remove Curse') return ['Remove Curse', 'curse'];
    return [n, null];
  },
  stance: role => ['Bear Form','Cat Form'].concat(role === 'balance' ? ['Moonkin Form'] : []),
  long: (race, role, racials) => ['Mark of the Wild','Thorns','Tranquility','Rebirth', ...racials.slice(0, 1), 'Trinket','Hibernate',"Nature's Grasp",'Mount'],
  travel: macros => macros === 'none' ? {n:'Travel Form', base:'Travel Form'} : {n:'Travel · Aquatic', base:'Travel Form', macro:'travel'},
  mouse: (race, macros) => ({
    escape: macros === 'none' ? {n:'Dash', base:'Dash', job:'once'} : {n:'Cat, then Dash', base:'Dash', job:'once', macro:'dash'},
    potion: {n:'Healing Potion', base:'Healing Potion', job:'long'},
    heal: macros === 'none' ? {n:'Regrowth', base:'Regrowth', job:'spam'} : {n:'Emergency Regrowth', base:'Regrowth', job:'spam', macro:'heal'},
    instant: macros === 'none' ? {n:'Rejuvenation', base:'Rejuvenation', job:'spam'} : {n:'Instant Rejuvenation', base:'Rejuvenation', job:'spam', macro:'instant'},
    interrupt: race === 'tauren' ? {n:'War Stomp', base:'War Stomp', job:'interrupt'} : {n:'Bash', base:'Bash', job:'interrupt'},
    defensive: {n:'Barkskin', base:'Barkskin', job:'defensive'}
  }),
  /* a key that only switches state, explained on the button */
  routeNote: (n, key) => n === 'Bear Form' ? `Goes to bear. Press ${key} again in bear to Bash.` : null,
  spec: role => role === 'heal' ? ['resto','Restoration'] : role === 'balance' ? ['feral','Balance'] : role === 'tank' ? ['feral','Feral (tank)'] : ['feral','Feral'],
  preset(role, acts){
    const has = a => acts.includes(a);
    if (role === 'cat') return has('dungeon') ? ['Leveling damage, can tank dungeons','Cat damage first, then Primal Bite and Lacerate so you can tank a dungeon when nobody else does.'] : ['Leveling damage (cat)','Pure cat damage for fast solo leveling.'];
    if (role === 'tank') return ['Dungeon tank (bear)','Threat, armor, dodge and Stamina.'];
    if (role === 'heal') return has('pvp') ? ['PvP healer','Casts that keep going when hit, cheap shifting and fast heals.'] : has('raid') ? ['Raid healer','Every healing talent for long fights.'] : ['Leveling healer','Restoration with extra damage for questing.'];
    return ['Balance','Plan Balance with the talent simulator on your page.'];
  },
  unbound: [['Revive','12','Out of combat resurrection'],['Soothe Animal','22',"Shrinks a beast's aggro range"],['Teleport: Moonglade','10','Travel'],['Challenging Roar','28','Bear group taunt for a pull that runs at the healer'],['Hearthstone','','Keep it unbound so you never port by accident'],['Gift of the Wild','50','Group buff, swap it in for Mark of the Wild in groups']]
};

return window.FY_makeClass('druid', {
  CLASS_PROFILE: {
    cls: 'druid', stateLabel: 'Form',
    states: {cat: {label: 'Cat', c: 'var(--cat)', match: /^Cat/}, bear: {label: 'Bear', c: 'var(--bear)', match: /^Bear|^Dire/}, caster: {label: 'Caster', c: 'var(--caster)', match: /^Caster/}}
  },
  SPECS: {feral:{label:'Feral', ready:true}, resto:{label:'Restoration', ready:false}, pvp:{label:'PvP', ready:false}},
  GROUPS: {'@cat': ['In Cat Form', 'Cat Form'], '@bear': ['In Bear Form', 'Bear Form'], '@heal': ['Healing'], '@caster': ['Caster spells']},
  SPELL_FORMS: {"Claw": "Cat", "Shred": "Cat", "Rake": "Cat", "Rip": "Cat", "Ferocious Bite": "Cat", "Pounce": "Cat, from Prowl", "Ravage": "Cat, from Prowl", "Cower": "Cat", "Prowl": "Cat", "Dash": "Cat", "Poised": "Passive", "Maul": "Bear", "Swipe": "Bear", "Demoralizing Roar": "Bear", "Growl": "Bear", "Enrage": "Bear", "Bash": "Bear", "Frenzied Regeneration": "Bear", "Challenging Roar": "Bear", "Bear Form": "Shapeshift", "Dire Bear Form": "Shapeshift", "Cat Form": "Shapeshift", "Travel Form": "Shapeshift", "Aquatic Form": "Shapeshift", "Faerie Fire": "Any form", "Barkskin": "Any form", "Nature's Grasp": "Any form", "War Stomp": "Tauren racial, any form", "Wrath": "Caster", "Moonfire": "Caster", "Starfire": "Caster", "Entangling Roots": "Caster", "Hibernate": "Caster", "Soothe Animal": "Caster", "Healing Touch": "Caster", "Rejuvenation": "Caster", "Regrowth": "Caster", "Tranquility": "Caster", "Rebirth": "Caster", "Revive": "Caster", "Innervate": "Caster", "Remove Curse": "Caster", "Cure Poison": "Caster", "Abolish Poison": "Caster", "Mark of the Wild": "Caster", "Gift of the Wild": "Caster", "Thorns": "Caster", "Omen of Clarity": "Passive", "Track Humanoids": "Cat"},
  extraSpells: {
    'Healing Potion': {form: 'Any form', cd: '2 min', lvl: 1, d: 'Works in every form.'},
    'Trinket': {form: 'Any form', cd: 'Varies', lvl: 1, d: 'Your on-use trinket.'},
    'Mount': {form: 'Caster', cd: '', lvl: 10, d: 'Your mount.'}
  },
  MACROS, PLAN, SPEC_PLAN: {resto: 'lvl-resto'}, TALENT_USE, TALENT_LATER, PRESETS,
  KEY_TALENT: {feral: ['feral', 'Shifting Power', 40]},
  PLAN_NOTE: "Recalculated every time you add or remove a point, starting from what you have actually trained. Pick another build in Plan to follow whenever you like: the list holds the builds players tag most on talentsforever.com, hybrids included, and it refreshes every day.",
  FIGHT_HTML: "    <p class=\"muted\">Each line is one press, top to bottom. The number after a spell is the level you learn it, so skip a line until you have it.</p>\n    <h3>Rotations</h3>\n    <div class=\"rgrid\">\n      <div class=\"rcard\" style=\"--rc:var(--cat)\">\n        <div class=\"eyebrow\">Cat · questing and dungeons</div>\n        <ol class=\"steps\">\n          <li>Before you pull: <kbd>⇧Q</kbd> Mark of the Wild and <kbd>⇧F</kbd> Thorns on yourself.</li>\n          <li>Open from <kbd>V</kbd> Prowl with <kbd>E</kbd> Ravage from behind (32) or <kbd>Q</kbd> Pounce to stun (36). Before 32, open from Prowl with <kbd>1</kbd> Rake. Without Prowl, pull with <kbd>F</kbd> Faerie Fire.</li>\n          <li>Build combo points with <kbd>E</kbd> Shred when you are behind, <kbd>Q</kbd> Claw otherwise.</li>\n          <li><kbd>1</kbd> Rake once on any mob that will live a while (24). Skip it on mobs about to die.</li>\n          <li>At 4 or 5 combo points: <kbd>2</kbd> Rip for long fights, <kbd>3</kbd> Ferocious Bite when you have 70 energy or more, or the mob is low (24).</li>\n          <li><kbd>R</kbd> Shifting Power whenever energy drops under 50 (40).</li>\n          <li>Two or more mobs: cat has no area attack. Root the extra one with <kbd>R</kbd> Entangling Roots in caster first, or go <kbd>⇧1</kbd> bear and Swipe.</li>\n          <li>After the fight: <kbd>Middle</kbd> heal and drink. Furor keeps your cat energy while you are out.</li>\n        </ol>\n      </div>\n      <div class=\"rcard\" style=\"--rc:var(--bear)\">\n        <div class=\"eyebrow\">Bear · packs and tanking</div>\n        <ol class=\"steps\">\n          <li>Pull with <kbd>F</kbd> Faerie Fire from range, or <kbd>5</kbd> Feral Charge to close in. The charge also interrupts.</li>\n          <li><kbd>R</kbd> Enrage for rage at the start, then <kbd>1</kbd> Demoralizing Roar on the pack.</li>\n          <li><kbd>4</kbd> Primal Bite every time it is ready (44).</li>\n          <li>One big target: <kbd>2</kbd> Lacerate up to 5 stacks and keep them rolling (45), <kbd>Q</kbd> Maul with spare rage.</li>\n          <li>Two or more mobs: <kbd>E</kbd> Swipe, with Primal Bite on whatever is loose.</li>\n          <li><kbd>3</kbd> Growl a mob that leaves you. Click Challenging Roar if the whole pack runs at the healer.</li>\n          <li><kbd>X</kbd> Bash a caster mid cast. It fires Enrage too, so you always have the rage.</li>\n          <li>Getting low: <kbd>Mouse 4</kbd> potion, <kbd>V</kbd> Frenzied Regeneration (36), <kbd>C</kbd> Barkskin (44).</li>\n        </ol>\n      </div>\n      <div class=\"rcard\" style=\"--rc:var(--caster)\">\n        <div class=\"eyebrow\">Caster · saving the group</div>\n        <ol class=\"steps\">\n          <li><kbd>Middle</kbd> drops your form and starts a heal in one press.</li>\n          <li><kbd>E</kbd> Rejuvenation on the tank early. It is cheap and keeps working while you do other things.</li>\n          <li><kbd>3</kbd> Regrowth when someone drops fast, <kbd>Q</kbd> Healing Touch when they are low and you are safe to cast.</li>\n          <li>Hover a party frame and press <kbd>4</kbd> for poison or <kbd>5</kbd> for a curse.</li>\n          <li><kbd>⇧E</kbd> Tranquility when the whole group is low, and do not move (30).</li>\n          <li><kbd>V</kbd> Innervate on yourself when mana runs out (40). <kbd>⇧R</kbd> Rebirth if someone dies mid fight.</li>\n        </ol>\n      </div>\n    </div>\n\n    <h3>When a player attacks you</h3>\n    <p class=\"muted\">Find the card that matches and follow it. If you panic, use the first card: it works against everyone.</p>\n    <div class=\"rgrid\">\n      <details class=\"pcard\" open>\n        <summary>Any fight going badly</summary>\n        <ol class=\"steps\">\n          <li><kbd>Mouse 4</kbd> potion. It works in any form, so it costs you nothing.</li>\n          <li><kbd>⇧3</kbd> Nature's Grasp, so the next melee hit roots them.</li>\n          <li><kbd>⇧X</kbd> War Stomp to stun everyone around you for a moment.</li>\n          <li>Use that moment: <kbd>⇧Middle</kbd> instant Rejuvenation, then <kbd>⇧1</kbd> bear for armor, or <kbd>Mouse 5</kbd> to run in cat.</li>\n          <li>From 44, press <kbd>C</kbd> Barkskin before a cast heal so hits cannot push it back.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>A rogue opens on you</summary>\n        <ol class=\"steps\">\n          <li>You cannot act while stunned or sapped. Wait for it to end and do not mash keys.</li>\n          <li><kbd>F</kbd> Faerie Fire on the rogue first: it cannot go back into stealth while it lasts.</li>\n          <li><kbd>⇧3</kbd> Nature's Grasp, then <kbd>⇧X</kbd> War Stomp when it is next to you.</li>\n          <li>Healthy: fight it in cat with bleeds. Low: <kbd>⇧1</kbd> bear, <kbd>Mouse 4</kbd> potion, <kbd>V</kbd> Frenzied Regeneration.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>A warrior or melee keeps slowing you</summary>\n        <ol class=\"steps\">\n          <li>Shifting removes roots and slows. Press <kbd>⇧2</kbd> twice in cat, or <kbd>⇧1</kbd> twice in bear. It costs mana each time.</li>\n          <li><kbd>⇧3</kbd> Nature's Grasp so their next hit roots them, then walk out of range.</li>\n          <li><kbd>Mouse 5</kbd> Dash away, or <kbd>Z</kbd> Travel Form outdoors (30).</li>\n          <li>Never stand still to cast Regrowth next to a warrior. Use <kbd>⇧Middle</kbd> instant Rejuvenation while you run.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>A mage</summary>\n        <ol class=\"steps\">\n          <li>Stay in cat or bear. An animal form cannot be turned into a sheep.</li>\n          <li>Frost Nova roots you: shift out of it with <kbd>⇧2</kbd> twice.</li>\n          <li>Close in with <kbd>5</kbd> Feral Charge, the cat leap or the bear charge, which also interrupts.</li>\n          <li>Stop big casts with <kbd>⇧X</kbd> War Stomp, or <kbd>X</kbd> Bash in bear.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>A warlock or priest, fears and casters</summary>\n        <ol class=\"steps\">\n          <li>Druids have no way to break a fear, and War Stomp does not work while you are feared. So stop the fear before it lands.</li>\n          <li>Get into melee fast with <kbd>5</kbd> Feral Charge, then interrupt casts with <kbd>⇧X</kbd> War Stomp or <kbd>X</kbd> Bash.</li>\n          <li>When a fear ends, <kbd>⇧Middle</kbd> instant Rejuvenation first, then go back on them.</li>\n          <li>A PvP trinket that breaks fear, if Forever gives you one, goes on <kbd>⇧C</kbd>.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>A hunter or an enemy druid</summary>\n        <ol class=\"steps\">\n          <li>Put the hunter's pet to sleep with <kbd>⇧V</kbd> Hibernate from caster form, then fight the hunter up close where it is weakest.</li>\n          <li>Hibernate also works on an enemy druid in cat or bear form.</li>\n          <li>Shift out of Wing Clip and other slows with <kbd>⇧2</kbd> twice, then <kbd>5</kbd> Feral Charge back in.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>Two or more players</summary>\n        <ol class=\"steps\">\n          <li>Do not fight. <kbd>⇧3</kbd> Nature's Grasp and <kbd>⇧X</kbd> War Stomp to buy a few seconds.</li>\n          <li><kbd>Mouse 5</kbd> Dash away in cat, and shift out of every slow.</li>\n          <li><kbd>Mouse 4</kbd> potion and <kbd>⇧Middle</kbd> instant Rejuvenation while running. Never stop to cast.</li>\n          <li>Run toward guards, friends or a doorway that breaks their line of sight.</li>\n        </ol>\n      </details>\n    </div>\n    <p class=\"muted\" style=\"font-size:13px\">Built from the Forever druid guides where they cover it and Classic rules where they do not. If a line works differently in game, tell us and the card gets fixed.</p>\n",
  NOTES_HTML: "<details>\n      <summary>Play notes</summary>\n      <div class=\"dbody notes\">\n        <p>Forever is built to keep you in one form. Going into bear wipes the energy you saved, so in cat interrupt with War Stomp on <kbd>Shift</kbd> <kbd>X</kbd> first and keep the X route into bear as the backup.</p>\n        <p>Every shapeshift starts a global cooldown, about a second. /cancelform never does, which is why the middle mouse heal starts instantly.</p>\n        <p>Fire Shifting Power when your energy drops under 50 so none of the 40 is wasted. Your mana bar is hidden in forms, so turn on Options, Combat, Personal Resource Display.</p>\n        <p>Enrage gives 10 rage instantly in Forever, which is exactly what Bash costs. Furor also gives 10 rage when you enter bear.</p>\n        <p>Barkskin works in any form from level 44, so C becomes the same defensive everywhere. Faerie Fire is free in cat and bear with a 6 second cooldown.</p>\n        <p>Potions, bandages and most objects work without leaving form. Tranquility, Rebirth, Innervate and the buffs still need caster form: tap middle mouse first.</p>\n      </div>\n    </details>",
  WIZ: WIZ_RAW
});
})();
