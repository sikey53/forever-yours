/* Forever Yours class data: Druid.
   Talents and spells for World of Warcraft: Forever, from talentsforever.com (CC BY 4.0), Warcraft Tavern guides and Blizzard notes.
   The daily check keeps this file current. */
(window.FY_CLASSES ||= {}).druid = (() => {
const CLASS_PROFILE = {
  cls: 'druid', stateLabel: 'Form',
  states: {cat:{label:'Cat', c:'var(--cat)'}, bear:{label:'Bear', c:'var(--bear)'}, caster:{label:'Caster', c:'var(--caster)'}}
};
const FORMS = CLASS_PROFILE.states;
const SPECS = {feral:{label:'Feral', ready:true}, resto:{label:'Restoration', ready:false}, pvp:{label:'PvP', ready:false}};

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
const TREES = {
  balance:{label:'Balance', list:[
    ['Improved Wrath',1,2,5,null,'Wrath cast time down to 0.5 sec faster and up to 50% cheaper.'],
    ['Genesis',1,3,5,null,'Periodic damage and healing up to 10%.'],
    ['Moonglow',2,1,3,null,'Damaging spells up to 25% cheaper.'],
    ['Improved Moonfire',2,2,2,null,'Moonfire damage and crit up to 10%.'],
    ["Nature's Majesty",2,3,2,null,'Spell and melee crit up to 4%.'],
    ["Nature's Reach",2,4,2,null,'Balance spell range up to 20%, hit up to 4%.'],
    ['Improved Entangling Roots',3,1,3,null,'More root damage, takes more damage before breaking.'],
    ["Nature's Splendor",3,3,1,"Nature's Majesty",'Longer Moonfire, Rejuvenation, Regrowth and Insect Swarm.'],
    ['Insect Swarm',4,1,1,null,'Damage over time and lowers enemy hit by 2%.'],
    ['Vengeance',4,2,5,'Improved Moonfire','Arcane and Nature crit damage up to 100% more.'],
    ['Improved Starfire',4,3,5,null,'Starfire up to 0.5 sec faster, chance to stun.'],
    ['Overgrowth',5,1,2,null,'Entangling Roots hits up to 2 more targets.'],
    ["Nature's Grace",5,2,1,null,'Spell crits give 10% haste for 3 sec.'],
    ['Eclipse',5,3,3,null,'Wrath speeds up your next two Starfires.'],
    ['Moonfury',6,2,5,null,'Arcane and Nature damage up to 10%.'],
    ['Moonkin Form',7,2,1,null,'Moonkin Form: armor, group crit, double Omen of Clarity.']
  ]},
  feral:{label:'Feral Combat', list:[
    ['Ferocity',1,2,5,null,'Maul, Primal Bite, Swipe, Claw and Rake cost up to 5 less.'],
    ['Furor',1,3,5,null,'Up to 100% chance for 10 rage entering bear. Keeps cat energy while you are out of cat.'],
    ['Feral Swiftness',2,1,2,null,'Cat speed up to 30%, dodge up to 4%.'],
    ['Feral Instinct',2,2,3,null,'Swipe damage up to 30%, harder to spot in Prowl.'],
    ['Brutal Impact',2,3,2,null,'Bash and Pounce stun up to 1 sec longer, Bash cooldown up to 30 sec shorter.'],
    ['Thick Hide',2,4,3,null,'More armor in bear, cat and moonkin.'],
    ['Shredding Attacks',3,1,3,null,'Shred up to 18 energy cheaper, Lacerate cheaper.'],
    ['Savage Fury',3,2,2,null,'Claw, Rake, Shred, Maul and Swipe up to 10% more damage.'],
    ['Feral Charge',3,3,1,null,'Bear charge that roots and interrupts. Cat leap too.'],
    ['Sharpened Claws',3,4,2,null,'Crit up to 6% in cat and bear.'],
    ['Predatory Strikes',4,1,3,null,'Attack power in forms up to 150% of your level.'],
    ['Lacerate',4,2,1,'Savage Fury','Stacking bear bleed with high threat.'],
    ['Predatory Discipline',4,3,1,null,'Ferocious Bite no longer eats extra energy but still hits harder with it.'],
    ['Blood Frenzy',4,4,2,'Sharpened Claws','Bear crits give rage, cat crits can give an extra combo point.'],
    ['Leader of the Pack',5,2,1,null,'3% crit for your party in forms.'],
    ['Natural Instinct',5,4,2,null,'Melee crit damage up to 20% more, heals scale with Intellect.'],
    ['Rend and Tear',6,1,5,'Predatory Strikes','Up to 15% more melee damage on bleeding targets.'],
    ['Natural Reaction',6,4,5,null,'Dodge up to 5%, rage when you dodge.'],
    ['Primal Bite',7,2,1,'Leader of the Pack','Bear hit with very high threat, 6 sec cooldown.'],
    ['Shifting Power',7,3,1,'Predatory Discipline','Cat: turn mana into 40 energy, 8 sec cooldown.']
  ]},
  resto:{label:'Restoration', list:[
    ["Nature's Focus",1,2,5,null,'Nature and Arcane casts lose less time when hit.'],
    ['Heart of the Wild',1,3,5,null,'Intellect up to 10%, bear Stamina up to 20%, cat Strength up to 10%.'],
    ['Naturalist',2,1,5,null,'Healing Touch and Wild Growth faster, all damage up to 10%.'],
    ['Reflection',2,2,3,null,'Up to 50% mana regeneration while casting.'],
    ['Natural Shapeshifter',2,3,3,null,'Shapeshifts and Shifting Power up to 30% cheaper.'],
    ['Subtlety',3,2,3,null,'Less threat from Nature and Arcane spells.'],
    ['Gift of Nature',3,3,5,null,'All healing up to 10%.'],
    ['Bloom',3,4,1,null,'Rejuvenation and Regrowth heal extra when they expire.'],
    ['Tranquil Spirit',4,2,5,null,'Healing Touch and Tranquility up to 10% cheaper.'],
    ['Improved Rejuvenation',4,3,3,null,'Rejuvenation up to 15% stronger.'],
    ['Swiftmend',4,4,1,null,'Instant heal that consumes a Rejuvenation or Regrowth.'],
    ["Nature's Swiftness",5,1,1,'Naturalist','Next Nature spell is instant, 3 min cooldown.'],
    ['Living Spirit',5,2,3,null,'Spirit up to 15%.'],
    ['Improved Tranquility',5,4,2,null,'Tranquility less threat and shorter cooldown.'],
    ['Improved Regrowth',6,3,5,'Improved Rejuvenation','Regrowth crit chance up to 50%.'],
    ['Wild Growth',7,2,1,'Living Spirit','Group heal over time.']
  ]}
};
const TREE_ORDER = ['balance','feral','resto'];
const PLAN = {
  feral:[
    ['feral','Ferocity',5,'Cheaper Maul and Swipe now, Claw and Rake later'],
    ['feral','Thick Hide',3,'Armor in bear now and cat later',true],
    ['feral','Feral Instinct',2,'Stronger Swipe for bear pulls. Opens row 3 for level 20',true],
    ['feral','Sharpened Claws',2,'Crit in cat and bear'],
    ['feral','Savage Fury',2,'More damage on all main attacks'],
    ['feral','Feral Charge',1,'Bear charge and cat leap'],
    ['feral','Feral Swiftness',2,'30% faster in cat'],
    ['feral','Predatory Strikes',3,'Big attack power boost'],
    ['feral','Leader of the Pack',1,'3% party crit'],
    ['feral','Predatory Discipline',1,'Needed for Shifting Power'],
    ['feral','Furor',3,'Keep cat energy when you drop out to heal'],
    ['feral','Rend and Tear',5,'15% more damage on bleeding targets'],
    ['feral','Shifting Power',1,'Mana into energy every 8 sec'],
    ['feral','Furor',5,'Full energy kept between forms, 10 rage entering bear'],
    ['feral','Blood Frenzy',2,'Extra combo points and rage on crits'],
    ['feral','Primal Bite',1,'Tank: big threat hit on a short cooldown'],
    ['feral','Lacerate',1,'Tank: stacking bleed that holds threat'],
    ['feral','Natural Instinct',2,'More crit damage in both forms'],
    ['feral','Feral Instinct',3,'Swipe holds packs better'],
    ['feral','Natural Reaction',5,'Dodge for both forms, rage when you dodge'],
    ['resto','Heart of the Wild',5,'Strength in cat, Stamina in bear'],
    ['feral','Shredding Attacks',1,'Cheaper Shred and Lacerate']
  ],
  resto:[], pvp:[]
};
const R5 = [1,2,3,4,5], P20 = [20,40,60,80,100], P2 = [2,4,6,8,10];
const TT = {
  // Feral Combat
  'Ferocity':{v:[R5], t:a=>`Reduces the cost of your Maul, Primal Bite, Swipe, Claw, and Rake abilities by ${a} Rage or Energy.`},
  'Furor':{v:[P20,P2], t:(a,b)=>`Gives you a ${a}% chance to gain 10 Rage when shapeshifting into Bear Form or Dire Bear Form. Entering Cat Form restores ${a}% of the Energy you had when you last left it, plus ${b} Energy per second spent outside Bear forms, up to ${a} Energy.`},
  'Feral Swiftness':{v:[[15,30],[2,4]], t:(a,b)=>`Increases your movement speed while in Cat Form by ${a}%, and increases your chance to Dodge by ${b}%.`},
  'Feral Instinct':{v:[[10,20,30],[1,2,3]], t:(a,b)=>`Increases damage done by your Swipe ability by ${a}% and reduces the chance enemies have to detect you while Prowling, as if you were ${b} level${b>1?'s':''} higher.`},
  'Brutal Impact':{v:[[0.5,1],[15,30]], t:(a,b)=>`Increases the stun duration of your Bash and Pounce abilities by ${a} sec and reduces the cooldown of Bash by ${b} sec.`},
  'Thick Hide':{v:[[1,2,3],['0.67','1.33','2.00']], t:(a,b)=>`While in Bear Form, Cat Form, Dire Bear Form, or Moonkin Form, you gain ${a} additional base Armor per level, plus ${b} Armor per point of Defense skill above 5 times your level.`},
  'Shredding Attacks':{v:[[6,12,18],[1,2,3]], t:(a,b)=>`Reduces the Energy cost of your Shred ability by ${a} and reduces the Rage cost of your Lacerate ability by ${b}.`},
  'Savage Fury':{v:[[5,10]], t:a=>`Increases the damage caused by your Claw, Rake, Shred, Maul, and Swipe abilities by ${a}%.`},
  'Feral Charge':{v:[], meta:'5 Rage · 8 to 25 yd · Instant · 15 sec cooldown · Bear Form', t:()=>`Charge an enemy, immobilizing them and interrupting any spell they are casting for 4 sec. In Cat Form it is a leap with a 30 sec cooldown that does not interrupt.`},
  'Sharpened Claws':{v:[[3,6]], t:a=>`Increases your critical strike chance while in Bear Form, Dire Bear Form, or Cat Form by ${a}%.`},
  'Predatory Strikes':{v:[[50,100,150]], t:a=>`Increases your melee Attack Power in Cat Form, Bear Form, and Dire Bear Form by ${a}% of your level.`},
  'Lacerate':{v:[], meta:'15 Rage · Melee range · Instant · Bear Form', t:()=>`Lacerates the enemy target, making them bleed for 20 damage over 15 sec plus 10% weapon damage per existing application. Causes a high amount of threat. Stacks up to 5 times.`},
  'Predatory Discipline':{v:[], t:()=>`Your Ferocious Bite ability no longer converts extra Energy into damage, but still deals extra damage based on your excess Energy.`},
  'Blood Frenzy':{v:[[50,100]], t:a=>`Gives you a ${a}% chance to gain an additional 5 Rage any time you get a critical strike while in Bear Form or Dire Bear Form, and a ${a}% chance to gain an additional combo point when you critically strike with a combo point ability in Cat Form.`},
  'Leader of the Pack':{v:[], t:()=>`While in Cat Form, Bear Form, or Dire Bear Form, the Leader of the Pack increases the critical strike chance of all party and raid members within 45 yards by 3%.`},
  'Natural Instinct':{v:[[10,20],[12,25]], t:(a,b)=>`Increases the critical strike damage bonus of your melee abilities by ${a}% and increases your spell healing by ${b}% of your Intellect.`},
  'Rend and Tear':{v:[[3,6,9,12,15]], t:a=>`Increases damage done by your melee abilities on Bleeding targets by ${a}%.`},
  'Natural Reaction':{v:[R5,P20], t:(a,b)=>`Increases your dodge chance by ${a}%, and gives you a ${b}% chance to gain 5 Rage each time you dodge.`},
  'Primal Bite':{v:[], meta:'20 Rage · Melee range · Instant · 6 sec cooldown · Bear Form', t:()=>`Bite the target, dealing 100% normal damage plus 42 and generating a high amount of threat.`},
  'Shifting Power':{v:[], meta:'55% of base Mana · Instant · 8 sec cooldown · Cat Form', t:()=>`Instantly convert 55% of base Mana into 40 Energy. Shifting Power's cost is reduced by effects that reduce the cost of shapeshifting.`},
  // Restoration
  "Nature's Focus":{v:[[14,28,42,56,70]], t:a=>`Gives your Arcane and Nature spells a ${a}% chance to not lose casting time when you take damage.`},
  'Heart of the Wild':{v:[P2,[4,8,12,16,20]], t:(a,b)=>`Increases your Intellect by ${a}%. In addition, while in Bear Form or Dire Bear Form your Stamina is increased by ${b}%, and while in Cat Form your Strength is increased by ${a}%.`},
  'Naturalist':{v:[[0.1,0.2,0.3,0.4,0.5],P2], t:(a,b)=>`Reduces the cast time of your Healing Touch and Wild Growth spells by ${a} sec and increases all damage you deal by ${b}%.`},
  'Reflection':{v:[[17,33,50]], t:a=>`Allows ${a}% of your Mana regeneration to continue while casting.`},
  'Natural Shapeshifter':{v:[[10,20,30]], t:a=>`Reduces the mana cost of all shapeshifting by ${a}%.`},
  'Subtlety':{v:[[10,20,30]], t:a=>`Reduces the threat generated by your Nature and Arcane spells by ${a}%.`},
  'Gift of Nature':{v:[P2], t:a=>`Increases the effect of all your healing spells by ${a}%.`},
  'Bloom':{v:[], t:()=>`When your Rejuvenation or Regrowth spell expires due to its duration, the target is instantly healed for 100% of your Spirit. If it is dispelled, the target is healed for 50% of your Spirit.`},
  'Tranquil Spirit':{v:[P2], t:a=>`Reduces the mana cost of your Healing Touch and Tranquility spells by ${a}%.`},
  'Improved Rejuvenation':{v:[[5,10,15]], t:a=>`Increases the effect of your Rejuvenation spell by ${a}%.`},
  'Swiftmend':{v:[], meta:'20% of base Mana · 40 yd · Instant · 15 sec cooldown', t:()=>`Instantly heals a friendly target that has your active Rejuvenation or Regrowth for an amount equal to the full duration of that effect.`},
  "Nature's Swiftness":{v:[], meta:'Instant · 3 min cooldown', t:()=>`When activated, your next Nature spell becomes an instant cast spell.`},
  'Living Spirit':{v:[[5,10,15]], t:a=>`Increases your Spirit by ${a}%.`},
  'Improved Tranquility':{v:[[50,100],[30,60]], t:(a,b)=>`Reduces threat caused by Tranquility by ${a}% and its cooldown by ${b}%.`},
  'Improved Regrowth':{v:[[10,20,30,40,50]], t:a=>`Increases the critical effect chance of your Regrowth spell by ${a}%.`},
  'Wild Growth':{v:[], meta:'550 Mana · 40 yd · 3 sec cast · 6 sec cooldown', t:()=>`Heals the target and their party for 336 over 7 sec. Party members must be within 43.5 yards of the target.`},
  // Balance
  'Improved Wrath':{v:[[0.1,0.2,0.3,0.4,0.5],[10,20,30,40,50]], t:(a,b)=>`Reduces the cast time of your Wrath spell by ${a} sec and its mana cost by ${b}%.`},
  'Genesis':{v:[P2], t:a=>`Increases the damage and healing done by your periodic spells by ${a}%.`},
  'Moonglow':{v:[[8,17,25]], t:a=>`Reduces the mana cost of your damaging spells by ${a}%.`},
  'Improved Moonfire':{v:[[5,10]], t:a=>`Increases the damage and critical strike chance of your Moonfire spell by ${a}%.`},
  "Nature's Majesty":{v:[[2,4]], t:a=>`Increases the critical strike chance of your spells and melee attacks by ${a}%.`},
  "Nature's Reach":{v:[[10,20],[2,4]], t:(a,b)=>`Increases the range of your Balance spells by ${a}% and your chance to hit by ${b}%.`},
  'Improved Entangling Roots':{v:[[25,50,75]], t:a=>`Increases the damage of Entangling Roots by ${a}% and lets the target take ${a}% more damage before the root breaks.`},
  "Nature's Splendor":{v:[], t:()=>`Increases the duration of Moonfire and Rejuvenation by 3 sec, Regrowth by 6 sec and Insect Swarm by 2 sec.`},
  'Insect Swarm':{v:[], meta:'45 Mana · 30 yd · Instant', t:()=>`The enemy target is swarmed by insects, decreasing their chance to hit by 2% and causing 48 Nature damage over 12 sec.`},
  'Vengeance':{v:[[20,40,60,80,100]], t:a=>`Increases the critical strike damage bonus of your Arcane and Nature spells by ${a}%.`},
  'Improved Starfire':{v:[[0.1,0.2,0.3,0.4,0.5],[3,6,9,12,15]], t:(a,b)=>`Reduces the cast time of Starfire by ${a} sec and gives it a ${b}% chance to stun the target for 3 sec.`},
  'Overgrowth':{v:[[1,2]], t:a=>`Your Entangling Roots affects up to ${a} additional target${a>1?'s':''}.`},
  "Nature's Grace":{v:[], t:()=>`A critical strike with a non-periodic spell increases your casting speed and reduces your global cooldown by 10% for 3 sec.`},
  'Eclipse':{v:[[0.17,0.33,0.5]], t:a=>`Your Wrath casts reduce the cast time of your next 2 Starfires by ${a} sec. Stores up to 4 charges and lasts 15 sec.`},
  'Moonfury':{v:[P2], t:a=>`Increases the damage done by your Arcane and Nature spells by ${a}%.`},
  'Moonkin Form':{v:[], meta:'35% of base Mana · Instant', t:()=>`Shapeshift into Moonkin Form. Armor from items is increased by 360%, Omen of Clarity triggers twice as often, and party and raid members within 45 yards gain 3% critical strike chance. You cannot cast healing spells, and you are immune to Polymorph.`}
};
/* spells: what matters at a glance, from the Forever guides and patch notes */
const SPELLS = {
  'Claw':{form:'Cat',cd:'',lvl:20,d:'Builder from any angle. Adds 1 combo point. 140% weapon damage in Forever.'},
  'Shred':{form:'Cat',cd:'',lvl:20,d:'Builder from behind the target. Adds 1 combo point. 200% weapon damage in Forever.'},
  'Rake':{form:'Cat',cd:'',lvl:24,d:'Bleed that adds 1 combo point. Works from Prowl.'},
  'Rip':{form:'Cat',cd:'',lvl:20,d:'Finisher. Bleed that lasts longer with more combo points.'},
  'Ferocious Bite':{form:'Cat',cd:'',lvl:24,d:'Finisher. Hits harder with more combo points and spare energy.'},
  'Pounce':{form:'Cat, from Prowl',cd:'',lvl:36,d:'Stuns the target and makes it bleed. Adds 1 combo point.'},
  'Ravage':{form:'Cat, from Prowl',cd:'',lvl:32,d:'Big opener from behind. 435% weapon damage in Forever. Adds 1 combo point.'},
  'Cower':{form:'Cat',cd:'10 sec',lvl:28,d:'Lowers your threat on the target.'},
  'Prowl':{form:'Cat',cd:'10 sec',lvl:20,d:'Stealth. You move slower while prowling.'},
  'Dash':{form:'Cat',cd:'5 min',lvl:26,d:'Large burst of movement speed for a short time.'},
  'Poised':{form:'Passive',cd:'',lvl:32,d:'Your next energy ability costs 10 less.'},
  'Maul':{form:'Bear',cd:'',lvl:10,d:'Your next melee swing hits harder and causes extra threat.'},
  'Swipe':{form:'Bear',cd:'',lvl:16,d:'Hits up to 3 enemies in front of you.'},
  'Demoralizing Roar':{form:'Bear',cd:'',lvl:10,d:'Lowers the attack power of nearby enemies.'},
  'Growl':{form:'Bear',cd:'8 sec',lvl:10,d:'Taunts the target to attack you.'},
  'Enrage':{form:'Bear',cd:'1 min',lvl:12,d:'Gives 10 rage at once and more over 10 sec, but lowers your armor while active.'},
  'Bash':{form:'Bear',cd:'1 min',lvl:14,d:'Stuns the target and interrupts its spell. Brutal Impact shortens the cooldown.'},
  'Frenzied Regeneration':{form:'Bear',cd:'3 min',lvl:36,d:'Turns rage into health over a few seconds.'},
  'Challenging Roar':{form:'Bear',cd:'10 min',lvl:28,d:'Forces all nearby enemies to attack you for a few seconds.'},
  'Bear Form':{form:'Shapeshift',cd:'',lvl:10,d:'More armor and health, uses rage. Entering it gives rage with Furor. Becomes Dire Bear Form at 40.'},
  'Dire Bear Form':{form:'Shapeshift',cd:'',lvl:40,d:'Stronger version of Bear Form.'},
  'Cat Form':{form:'Shapeshift',cd:'',lvl:20,d:'Uses energy and combo points. Learned through a quest at level 20.'},
  'Travel Form':{form:'Shapeshift',cd:'',lvl:30,d:'Fast travel form, outdoors only.'},
  'Aquatic Form':{form:'Shapeshift',cd:'',lvl:16,d:'Swim fast and breathe underwater.'},
  'Faerie Fire':{form:'Any form',cd:'6 sec',lvl:18,d:'Lowers target armor and stops it from stealthing. Free in Cat and Bear Form in Forever.'},
  'Barkskin':{form:'Any form',cd:'1 min',lvl:44,d:'Reduces damage taken and stops hits from delaying your casts.'},
  "Nature's Grasp":{form:'Any form',cd:'1 min',lvl:10,d:'The next enemy that hits you in melee is rooted. Works indoors and in forms in Forever.'},
  'War Stomp':{form:'Tauren racial, any form',cd:'2 min',lvl:1,d:'Stuns nearby enemies for a moment.'},
  'Wrath':{form:'Caster',cd:'',lvl:1,d:'Nature damage. Cheap in Forever, best as a pull.'},
  'Moonfire':{form:'Caster',cd:'',lvl:4,d:'Instant Arcane damage plus damage over time. Can crit.'},
  'Starfire':{form:'Caster',cd:'',lvl:20,d:'Slow, heavy Arcane nuke. About 40% stronger in Forever.'},
  'Entangling Roots':{form:'Caster',cd:'',lvl:8,d:'Roots the target in place. Damage can break it. Works indoors in Forever.'},
  'Hibernate':{form:'Caster',cd:'',lvl:18,d:'Puts a beast or dragonkin to sleep. Damage wakes it.'},
  'Soothe Animal':{form:'Caster',cd:'',lvl:22,d:'Shrinks the aggro range of a beast.'},
  'Healing Touch':{form:'Caster',cd:'',lvl:1,d:'Big, slow heal.'},
  'Rejuvenation':{form:'Caster',cd:'',lvl:4,d:'Heal over time. Cheap and instant.'},
  'Regrowth':{form:'Caster',cd:'',lvl:12,d:'Fast heal plus a heal over time. Cheaper in Forever.'},
  'Tranquility':{form:'Caster',cd:'5 min',lvl:30,d:'Channeled heal on your whole party. Stand still while it runs.'},
  'Rebirth':{form:'Caster',cd:'30 min',lvl:20,d:'Brings a dead ally back during combat. Needs a reagent.'},
  'Revive':{form:'Caster',cd:'',lvl:12,d:'Brings a dead ally back out of combat.'},
  'Innervate':{form:'Caster',cd:'6 min',lvl:40,d:'Large mana regeneration on the target.'},
  'Remove Curse':{form:'Caster',cd:'',lvl:24,d:'Removes one curse.'},
  'Cure Poison':{form:'Caster',cd:'',lvl:14,d:'Removes one poison.'},
  'Abolish Poison':{form:'Caster',cd:'',lvl:26,d:'Removes one poison now and keeps removing poisons for 8 sec.'},
  'Mark of the Wild':{form:'Caster',cd:'',lvl:1,d:'Buff: armor, stats and resistances for 30 min.'},
  'Gift of the Wild':{form:'Caster',cd:'',lvl:50,d:'Mark of the Wild on your whole party.'},
  'Thorns':{form:'Caster',cd:'',lvl:6,d:'Damages melee attackers. Scales with spell power in Forever.'},
  'Omen of Clarity':{form:'Passive',cd:'',lvl:20,d:'Your attacks and spells can make your next ability free.'},
  'Track Humanoids':{form:'Cat',cd:'',lvl:32,d:'Shows nearby humanoids on the minimap.'}
};
// talent actives are spells too
['Feral Charge','Lacerate','Primal Bite','Shifting Power','Swiftmend',"Nature's Swiftness",'Wild Growth','Insect Swarm','Moonkin Form','Leader of the Pack'].forEach(n => { if (!SPELLS[n]) SPELLS[n] = {talent:true}; });
const FORM_COLOR = f => /^Cat/.test(f) ? 'var(--cat)' : /^Bear|Dire/.test(f) ? 'var(--bear)' : /^Caster/.test(f) ? 'var(--caster)' : 'var(--gold)';
const G = {cat:'@cat', bear:'@bear', all:'@all', heal:'@heal', caster:'@caster', neu:'@new'};
const GROUP_LABEL = {'@new':'New abilities', '@cat':'In Cat Form', '@bear':'In Bear Form', '@heal':'Healing', '@caster':'Caster spells', '@all':'Always'};
const FX = {
  'Ferocity': r=>[[['Claw','Rake','Maul','Swipe','Primal Bite'], `${r} cheaper`]],
  'Furor': r=>[[[G.bear], `${20*r}% chance for 10 rage when you shift in`], [[G.cat], `keeps up to ${20*r} energy while you are out of cat`]],
  'Feral Swiftness': r=>[[[G.cat], `${15*r}% faster`], [[G.all], `+${2*r}% dodge`]],
  'Feral Instinct': r=>[[['Swipe'], `+${10*r}% damage`], [['Prowl'], `harder to spot`]],
  'Brutal Impact': r=>[[['Bash','Pounce'], `stun ${0.5*r} sec longer`], [['Bash'], `cooldown ${15*r} sec shorter`]],
  'Thick Hide': r=>[[[G.cat,G.bear], `+${r} armor per level`]],
  'Shredding Attacks': r=>[[['Shred'], `${6*r} energy cheaper`], [['Lacerate'], `${r} rage cheaper`]],
  'Savage Fury': r=>[[['Claw','Rake','Shred','Maul','Swipe'], `+${5*r}% damage`]],
  'Feral Charge': ()=>[[[G.neu], 'Feral Charge']],
  'Sharpened Claws': r=>[[[G.cat,G.bear], `+${3*r}% crit`]],
  'Predatory Strikes': r=>[[[G.cat,G.bear], `+${50*r}% of your level as attack power`]],
  'Lacerate': ()=>[[[G.neu], 'Lacerate']],
  'Predatory Discipline': ()=>[[['Ferocious Bite'], 'spare energy adds damage without being spent']],
  'Blood Frenzy': r=>[[[G.bear], `${50*r}% chance for 5 rage on crits`], [[G.cat], `${50*r}% chance for an extra combo point on crits`]],
  'Leader of the Pack': ()=>[[[G.cat,G.bear], '+3% crit for you and your party']],
  'Natural Instinct': r=>[[[G.cat,G.bear], `+${10*r}% crit damage`], [[G.heal], `heals gain ${[12,25][r-1]}% of your Intellect`]],
  'Rend and Tear': r=>[[[G.cat,G.bear], `+${3*r}% damage on bleeding targets`]],
  'Natural Reaction': r=>[[[G.all], `+${r}% dodge`], [[G.bear], `${20*r}% chance for 5 rage when you dodge`]],
  'Primal Bite': ()=>[[[G.neu], 'Primal Bite']],
  'Shifting Power': ()=>[[[G.neu], 'Shifting Power']],
  "Nature's Focus": r=>[[[G.heal], `${14*r}% chance hits do not slow your casts`]],
  'Heart of the Wild': r=>[[[G.all], `+${2*r}% Intellect`], [[G.cat], `+${2*r}% Strength`], [[G.bear], `+${4*r}% Stamina`]],
  'Naturalist': r=>[[['Healing Touch'], `${(0.1*r).toFixed(1)} sec faster`], [[G.all], `+${2*r}% damage`]],
  'Reflection': r=>[[[G.heal], `${[17,33,50][r-1]}% mana regeneration while casting`]],
  'Natural Shapeshifter': r=>[[['Bear Form','Cat Form','Shifting Power'], `${10*r}% cheaper`]],
  'Subtlety': r=>[[[G.heal], `${10*r}% less threat`]],
  'Gift of Nature': r=>[[[G.heal], `+${2*r}% healing`]],
  'Bloom': ()=>[[['Rejuvenation','Regrowth'], 'heal once more when they expire']],
  'Tranquil Spirit': r=>[[['Healing Touch','Tranquility'], `${2*r}% cheaper`]],
  'Improved Rejuvenation': r=>[[['Rejuvenation'], `+${5*r}% healing`]],
  'Swiftmend': ()=>[[[G.neu], 'Swiftmend']],
  "Nature's Swiftness": ()=>[[[G.neu], "Nature's Swiftness"]],
  'Living Spirit': r=>[[[G.all], `+${5*r}% Spirit`]],
  'Improved Tranquility': r=>[[['Tranquility'], `${30*r}% shorter cooldown, less threat`]],
  'Improved Regrowth': r=>[[['Regrowth'], `+${10*r}% crit chance`]],
  'Wild Growth': ()=>[[[G.neu], 'Wild Growth']],
  'Improved Wrath': r=>[[['Wrath'], `${(0.1*r).toFixed(1)} sec faster, ${10*r}% cheaper`]],
  'Genesis': r=>[[['Moonfire','Rejuvenation','Insect Swarm'], `+${2*r}% over time`]],
  'Moonglow': r=>[[[G.caster], `damage spells ${[8,17,25][r-1]}% cheaper`]],
  'Improved Moonfire': r=>[[['Moonfire'], `+${5*r}% damage and crit`]],
  "Nature's Majesty": r=>[[[G.all], `+${2*r}% crit`]],
  "Nature's Reach": r=>[[[G.caster], `+${2*r}% hit, +${10*r}% range`]],
  'Improved Entangling Roots': r=>[[['Entangling Roots'], `+${25*r}% damage, breaks less easily`]],
  "Nature's Splendor": ()=>[[['Moonfire','Rejuvenation','Regrowth','Insect Swarm'], 'last longer']],
  'Insect Swarm': ()=>[[[G.neu], 'Insect Swarm']],
  'Vengeance': r=>[[[G.caster], `+${20*r}% spell crit damage`]],
  'Improved Starfire': r=>[[['Starfire'], `${(0.1*r).toFixed(1)} sec faster, ${3*r}% stun chance`]],
  'Overgrowth': r=>[[['Entangling Roots'], `+${r} target${r>1?'s':''}`]],
  "Nature's Grace": ()=>[[[G.caster], 'spell crits speed up your next casts']],
  'Eclipse': r=>[[['Starfire'], `${[0.17,0.33,0.5][r-1]} sec faster after each Wrath`]],
  'Moonfury': r=>[[[G.caster], `+${2*r}% Arcane and Nature damage`]],
  'Moonkin Form': ()=>[[[G.neu], 'Moonkin Form']]
};

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
const targetLevel = t => t === '@cat' ? 20 : t === '@bear' ? 10 : t.startsWith('@') ? 1 : ((SPELLS[t] && SPELLS[t].lvl) || 1);
const PRESETS = {
  'lvl-cat':{label:'Leveling damage (cat)', why:'Fast solo leveling in cat. Shifting Power at 40, then sustain and dodge.', seq:[['feral','Ferocity',5],['feral','Thick Hide',3],['feral','Brutal Impact',2],['feral','Sharpened Claws',2],['feral','Savage Fury',2],['feral','Feral Charge',1],['feral','Feral Swiftness',2],['feral','Predatory Strikes',3],['feral','Leader of the Pack',1],['feral','Predatory Discipline',1],['feral','Shredding Attacks',3],['feral','Rend and Tear',5],['feral','Shifting Power',1],['feral','Furor',5],['feral','Blood Frenzy',2],['feral','Natural Instinct',2],['feral','Natural Reaction',3],['resto','Heart of the Wild',5],['resto','Natural Shapeshifter',3]]},
  'lvl-hybrid':{label:'Leveling damage, can tank dungeons', why:'Your current plan: cat damage to Shifting Power, then Primal Bite and Lacerate for tanking.', seq:null},
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
const SB_FORMS = [['all','All','var(--muted)'],['Cat','Cat','var(--cat)'],['Bear','Bear','var(--bear)'],['Caster','Caster','var(--caster)'],['Any','Any form','var(--gold)']];
const sbForm = f => /^Cat/.test(f) ? 'Cat' : /^Bear|Dire/.test(f) ? 'Bear' : /^Caster/.test(f) ? 'Caster' : 'Any';
const FIGHT_HTML = "    <h2 id=\"h-fight\">How to fight</h2>\n    <p class=\"muted\">Each line is one press, top to bottom. The number after a spell is the level you learn it, so skip a line until you have it.</p>\n    <h3>Rotations</h3>\n    <div class=\"rgrid\">\n      <div class=\"rcard\" style=\"--rc:var(--cat)\">\n        <div class=\"eyebrow\">Cat \u00b7 questing and dungeons</div>\n        <ol class=\"steps\">\n          <li>Before you pull: <kbd>\u21e7Q</kbd> Mark of the Wild and <kbd>\u21e7F</kbd> Thorns on yourself.</li>\n          <li>Open from <kbd>V</kbd> Prowl with <kbd>E</kbd> Ravage from behind (32) or <kbd>Q</kbd> Pounce to stun (36). Before 32, open from Prowl with <kbd>1</kbd> Rake. Without Prowl, pull with <kbd>F</kbd> Faerie Fire.</li>\n          <li>Build combo points with <kbd>E</kbd> Shred when you are behind, <kbd>Q</kbd> Claw otherwise.</li>\n          <li><kbd>1</kbd> Rake once on any mob that will live a while (24). Skip it on mobs about to die.</li>\n          <li>At 4 or 5 combo points: <kbd>2</kbd> Rip for long fights, <kbd>3</kbd> Ferocious Bite when you have 70 energy or more, or the mob is low (24).</li>\n          <li><kbd>R</kbd> Shifting Power whenever energy drops under 50 (40).</li>\n          <li>Two or more mobs: cat has no area attack. Root the extra one with <kbd>R</kbd> Entangling Roots in caster first, or go <kbd>\u21e71</kbd> bear and Swipe.</li>\n          <li>After the fight: <kbd>Middle</kbd> heal and drink. Furor keeps your cat energy while you are out.</li>\n        </ol>\n      </div>\n      <div class=\"rcard\" style=\"--rc:var(--bear)\">\n        <div class=\"eyebrow\">Bear \u00b7 packs and tanking</div>\n        <ol class=\"steps\">\n          <li>Pull with <kbd>F</kbd> Faerie Fire from range, or <kbd>5</kbd> Feral Charge to close in. The charge also interrupts.</li>\n          <li><kbd>R</kbd> Enrage for rage at the start, then <kbd>1</kbd> Demoralizing Roar on the pack.</li>\n          <li><kbd>4</kbd> Primal Bite every time it is ready (44).</li>\n          <li>One big target: <kbd>2</kbd> Lacerate up to 5 stacks and keep them rolling (45), <kbd>Q</kbd> Maul with spare rage.</li>\n          <li>Two or more mobs: <kbd>E</kbd> Swipe, with Primal Bite on whatever is loose.</li>\n          <li><kbd>3</kbd> Growl a mob that leaves you. Click Challenging Roar if the whole pack runs at the healer.</li>\n          <li><kbd>X</kbd> Bash a caster mid cast. It fires Enrage too, so you always have the rage.</li>\n          <li>Getting low: <kbd>Mouse 4</kbd> potion, <kbd>V</kbd> Frenzied Regeneration (36), <kbd>C</kbd> Barkskin (44).</li>\n        </ol>\n      </div>\n      <div class=\"rcard\" style=\"--rc:var(--caster)\">\n        <div class=\"eyebrow\">Caster \u00b7 saving the group</div>\n        <ol class=\"steps\">\n          <li><kbd>Middle</kbd> drops your form and starts a heal in one press.</li>\n          <li><kbd>E</kbd> Rejuvenation on the tank early. It is cheap and keeps working while you do other things.</li>\n          <li><kbd>3</kbd> Regrowth when someone drops fast, <kbd>Q</kbd> Healing Touch when they are low and you are safe to cast.</li>\n          <li>Hover a party frame and press <kbd>4</kbd> for poison or <kbd>5</kbd> for a curse.</li>\n          <li><kbd>\u21e7E</kbd> Tranquility when the whole group is low, and do not move (30).</li>\n          <li><kbd>V</kbd> Innervate on yourself when mana runs out (40). <kbd>\u21e7R</kbd> Rebirth if someone dies mid fight.</li>\n        </ol>\n      </div>\n    </div>\n\n    <h3>When a player attacks you</h3>\n    <p class=\"muted\">Find the card that matches and follow it. If you panic, use the first card: it works against everyone.</p>\n    <div class=\"rgrid\">\n      <details class=\"pcard\" open>\n        <summary>Any fight going badly</summary>\n        <ol class=\"steps\">\n          <li><kbd>Mouse 4</kbd> potion. It works in any form, so it costs you nothing.</li>\n          <li><kbd>\u21e73</kbd> Nature's Grasp, so the next melee hit roots them.</li>\n          <li><kbd>\u21e7X</kbd> War Stomp to stun everyone around you for a moment.</li>\n          <li>Use that moment: <kbd>\u21e7Middle</kbd> instant Rejuvenation, then <kbd>\u21e71</kbd> bear for armor, or <kbd>Mouse 5</kbd> to run in cat.</li>\n          <li>From 44, press <kbd>C</kbd> Barkskin before a cast heal so hits cannot push it back.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>A rogue opens on you</summary>\n        <ol class=\"steps\">\n          <li>You cannot act while stunned or sapped. Wait for it to end and do not mash keys.</li>\n          <li><kbd>F</kbd> Faerie Fire on the rogue first: it cannot go back into stealth while it lasts.</li>\n          <li><kbd>\u21e73</kbd> Nature's Grasp, then <kbd>\u21e7X</kbd> War Stomp when it is next to you.</li>\n          <li>Healthy: fight it in cat with bleeds. Low: <kbd>\u21e71</kbd> bear, <kbd>Mouse 4</kbd> potion, <kbd>V</kbd> Frenzied Regeneration.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>A warrior or melee keeps slowing you</summary>\n        <ol class=\"steps\">\n          <li>Shifting removes roots and slows. Press <kbd>\u21e72</kbd> twice in cat, or <kbd>\u21e71</kbd> twice in bear. It costs mana each time.</li>\n          <li><kbd>\u21e73</kbd> Nature's Grasp so their next hit roots them, then walk out of range.</li>\n          <li><kbd>Mouse 5</kbd> Dash away, or <kbd>Z</kbd> Travel Form outdoors (30).</li>\n          <li>Never stand still to cast Regrowth next to a warrior. Use <kbd>\u21e7Middle</kbd> instant Rejuvenation while you run.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>A mage</summary>\n        <ol class=\"steps\">\n          <li>Stay in cat or bear. An animal form cannot be turned into a sheep.</li>\n          <li>Frost Nova roots you: shift out of it with <kbd>\u21e72</kbd> twice.</li>\n          <li>Close in with <kbd>5</kbd> Feral Charge, the cat leap or the bear charge, which also interrupts.</li>\n          <li>Stop big casts with <kbd>\u21e7X</kbd> War Stomp, or <kbd>X</kbd> Bash in bear.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>A warlock or priest, fears and casters</summary>\n        <ol class=\"steps\">\n          <li>Druids have no way to break a fear, and War Stomp does not work while you are feared. So stop the fear before it lands.</li>\n          <li>Get into melee fast with <kbd>5</kbd> Feral Charge, then interrupt casts with <kbd>\u21e7X</kbd> War Stomp or <kbd>X</kbd> Bash.</li>\n          <li>When a fear ends, <kbd>\u21e7Middle</kbd> instant Rejuvenation first, then go back on them.</li>\n          <li>A PvP trinket that breaks fear, if Forever gives you one, goes on <kbd>\u21e7C</kbd>.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>A hunter or an enemy druid</summary>\n        <ol class=\"steps\">\n          <li>Put the hunter's pet to sleep with <kbd>\u21e7V</kbd> Hibernate from caster form, then fight the hunter up close where it is weakest.</li>\n          <li>Hibernate also works on an enemy druid in cat or bear form.</li>\n          <li>Shift out of Wing Clip and other slows with <kbd>\u21e72</kbd> twice, then <kbd>5</kbd> Feral Charge back in.</li>\n        </ol>\n      </details>\n      <details class=\"pcard\">\n        <summary>Two or more players</summary>\n        <ol class=\"steps\">\n          <li>Do not fight. <kbd>\u21e73</kbd> Nature's Grasp and <kbd>\u21e7X</kbd> War Stomp to buy a few seconds.</li>\n          <li><kbd>Mouse 5</kbd> Dash away in cat, and shift out of every slow.</li>\n          <li><kbd>Mouse 4</kbd> potion and <kbd>\u21e7Middle</kbd> instant Rejuvenation while running. Never stop to cast.</li>\n          <li>Run toward guards, friends or a doorway that breaks their line of sight.</li>\n        </ol>\n      </details>\n    </div>\n    <p class=\"muted\" style=\"font-size:13px\">Built from the Forever druid guides where they cover it and Classic rules where they do not. If a line works differently in game, tell us and the card gets fixed.</p>\n";
const NOTES_HTML = "<details>\n      <summary>Play notes</summary>\n      <div class=\"dbody notes\">\n        <p>Forever is built to keep you in one form. Going into bear wipes the energy you saved, so in cat interrupt with War Stomp on <kbd>Shift</kbd> <kbd>X</kbd> first and keep the X route into bear as the backup.</p>\n        <p>Every shapeshift starts a global cooldown, about a second. /cancelform never does, which is why the middle mouse heal starts instantly.</p>\n        <p>Fire Shifting Power when your energy drops under 50 so none of the 40 is wasted. Your mana bar is hidden in forms, so turn on Options, Combat, Personal Resource Display.</p>\n        <p>Enrage gives 10 rage instantly in Forever, which is exactly what Bash costs. Furor also gives 10 rage when you enter bear.</p>\n        <p>Barkskin works in any form from level 44, so C becomes the same defensive everywhere. Faerie Fire is free in cat and bear with a 6 second cooldown.</p>\n        <p>Potions, bandages and most objects work without leaving form. Tranquility, Rebirth, Innervate and the buffs still need caster form: tap middle mouse first.</p>\n      </div>\n    </details>";
const PLAN_NOTE = "Recalculated every time you add or remove a point, starting from what you have actually trained. This is a hybrid: cat damage first up to Shifting Power, then Primal Bite and Lacerate so bear can tank dungeons, then defense for both forms. Restoration stays free for your PvP dual spec at 40.";
const GOALS_HTML = "            <optgroup label=\"Leveling\"><option value=\"lvl-cat\">Leveling damage (cat)</option><option value=\"lvl-hybrid\">Leveling damage, can tank dungeons</option><option value=\"lvl-heal\">Leveling healer</option></optgroup>\n            <optgroup label=\"Dungeons\"><option value=\"dng-cat\">Dungeon damage (cat)</option><option value=\"dng-tank\">Dungeon tank (bear)</option><option value=\"dng-heal\">Dungeon healer</option></optgroup>\n            <optgroup label=\"Raids at 60\"><option value=\"raid-cat\">Raid damage (cat)</option><option value=\"raid-tank\">Raid tank (bear)</option><option value=\"raid-heal\">Raid healer</option></optgroup>\n            <optgroup label=\"PvP\"><option value=\"pvp-feral\">PvP feral</option><option value=\"pvp-heal\">PvP healer</option></optgroup>\n";
return {CLASS_PROFILE, SPECS, MACROS, TREES, TREE_ORDER, PLAN, TT, SPELLS, FORM_COLOR, G, GROUP_LABEL, FX, TALENT_USE, TALENT_LATER, targetLevel, PRESETS, SB_FORMS, sbForm, FIGHT_HTML, NOTES_HTML, PLAN_NOTE, GOALS_HTML};
})();
