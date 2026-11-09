/* Forever Yours class layout: Mage.
   Spells, levels and talents come from classes/data/mage.js (talentsforever.com, CC BY 4.0, refreshed daily).
   This file decides where things go on the bars and what the rotations say. */
(window.FY_CLASSES ||= {}).mage = window.FY_makeClass('mage', {
  CLASS_PROFILE: {cls: 'mage', stateLabel: 'Bar', states: {normal: {label: 'Spells', c: 'var(--caster)'}}},
  SPEC_PLAN: {frost: 'lvl-frost', fire: 'lvl-fire', arcane: 'lvl-arcane'},
  SPECS: {frost: {label: 'Frost', ready: true}, fire: {label: 'Fire', ready: false}, arcane: {label: 'Arcane', ready: false}},
  MACROS: {
    poly: {name: 'Polymorph on mouseover', code: '#showtooltip Polymorph\n/cast [@mouseover,harm,nodead][] Polymorph', note: 'Sheeps the enemy you hover without changing your target, otherwise your target.'},
    decurse: {name: 'Remove Lesser Curse on mouseover', code: '#showtooltip\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Remove Lesser Curse', note: 'Cleanses whoever you hover, otherwise your friendly target, otherwise you.'}
  },
  extraSpells: {
    'Healing Potion': {form: 'Item', cd: '2 min', lvl: 1, d: 'Restores health.'},
    'Mana Gem': {form: 'Item', cd: '2 min', lvl: 28, d: 'Your conjured mana agate, jade, citrine or ruby.'},
    'Trinket': {form: 'Item', cd: 'Varies', lvl: 1, d: 'Your on-use trinket.'},
    'Mount': {form: 'Item', cd: '', lvl: 10, d: 'Your mount.'}
  },
  PLAN_NOTE: 'The order most players of your spec follow on talentsforever.com while leveling, then a popular level 60 build. Recalculated from what you have trained.',
  WIZ: {
    name: 'Mage', color: '#3FC7EB',
    roles: [['frost', 'Frost', 'Slows, freezes and Ice Lance, the safest leveling'], ['fire', 'Fire', 'Big crits and Pyroblast'], ['arcane', 'Arcane', 'Arcane Blast and burst']],
    duals: [['frost', 'Frost'], ['fire', 'Fire'], ['arcane', 'Arcane'], ['pvp', 'PvP'], ['none', 'Not sure yet']],
    states: {normal: ['Spells', 'var(--caster)']},
    kits: {
      frost: {forms: ['normal'], normal: {spam: ['Frostbolt', 'Ice Lance'], rot: ['Fire Blast', 'Cone of Cold', 'Arcane Explosion'], short: ['Frost Nova', 'Blink', 'Polymorph'], once: ['Ice Barrier', 'Cold Snap'], interrupt: 'Counterspell', defensive: 'Ice Block'}},
      fire: {forms: ['normal'], normal: {spam: ['Fireball', 'Scorch'], rot: ['Fire Blast', 'Pyroblast', 'Arcane Explosion'], short: ['Frost Nova', 'Blink', 'Polymorph'], once: ['Blast Wave', 'Combustion'], interrupt: 'Counterspell', defensive: 'Mana Shield'}},
      arcane: {forms: ['normal'], normal: {spam: ['Arcane Missiles', 'Arcane Blast'], rot: ['Fireball', 'Frostbolt', 'Arcane Wrath'], short: ['Frost Nova', 'Blink', 'Polymorph'], once: ['Arcane Power', 'Presence of Mind'], interrupt: 'Counterspell', defensive: 'Mana Shield'}}
    },
    macroLabel(n, macros) {
      if (macros === 'useful' && n === 'Polymorph') return ['Polymorph on mouseover', 'poly'];
      if (macros !== 'none' && n === 'Remove Lesser Curse') return ['Remove Lesser Curse', 'decurse'];
      return [n, null];
    },
    stance: () => [],
    long: (race, role, racials) => ['Arcane Intellect', 'Ice Armor', 'Mage Armor', 'Evocation', 'Remove Lesser Curse', 'Frost Ward', 'Fire Ward', 'Blizzard', ...racials.slice(0, 2), 'Mana Gem', 'Trinket', 'Mount'],
    travel: null,
    mouse: () => ({
      escape: {n: 'Blink', base: 'Blink', job: 'once'},
      potion: {n: 'Healing Potion', base: 'Healing Potion', job: 'long'},
      heal: {n: 'Mana Gem', base: 'Mana Gem', job: 'long'},
      interrupt: {n: 'Counterspell', base: 'Counterspell', job: 'interrupt'},
      defensive: {n: 'Ice Block', base: 'Ice Block', job: 'defensive'}
    }),
    spec: role => role === 'fire' ? ['fire', 'Fire'] : role === 'arcane' ? ['arcane', 'Arcane'] : ['frost', 'Frost'],
    preset(role) {
      if (role === 'fire') return ['Fire', 'Pyroblast, Blast Wave and Combustion for big bursts.'];
      if (role === 'arcane') return ['Arcane', 'Arcane Blast, Arcane Wrath and Arcane Power.'];
      return ['Frost', 'Ice Lance, Ice Barrier and Cold Snap: safe, steady leveling.'];
    },
    unbound: [['Hearthstone', '', 'Keep it unbound, you have teleports'], ['Conjure Water and Food', '4', 'Make them between pulls'], ['Teleports and Portals', '20', 'Click them from the spellbook'], ['Slow Fall', '12', 'Click it when you need it'], ['Dampen and Amplify Magic', '12', 'Buffs for special fights']]
  },
  FIGHT_HTML: `
    <p class="muted">Each line is one press, top to bottom. Spells show the level you learn them; skip a line until you have it.</p>
    <h3>Rotations</h3>
    <div class="rgrid">
      <div class="rcard" style="--rc:var(--caster)">
        <div class="eyebrow">Frost · questing</div>
        <ol class="steps">
          <li>Frostbolt from max range, a second one as it walks in slowed.</li>
          <li>Frost Nova when it reaches you, step back.</li>
          <li>Ice Lance, a new Frost talent ability at 20, deals 300% more damage to frozen targets: use it right after Frost Nova.</li>
          <li>Fire Blast to finish. Cone of Cold on groups from 26.</li>
          <li>Ice Barrier from 40 with the talent before every pull.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--bear)">
        <div class="eyebrow">Fire</div>
        <ol class="steps">
          <li>Pyroblast to open from 20 with the talent, it is a long cast.</li>
          <li>Fireball as your main spell, Scorch while moving into range or to stack its debuff.</li>
          <li>Fire Blast on cooldown to finish.</li>
          <li>Blast Wave on groups at 30, Combustion from 40 for a burst.</li>
          <li>Frostfire Bolt is new at 40 and counts as both Fire and Frost.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--gold)">
        <div class="eyebrow">Arcane</div>
        <ol class="steps">
          <li>Arcane Blast from 20 with the talent: each cast makes the next one stronger and more expensive.</li>
          <li>Arcane Missiles between stacks, Arcane Wrath from 25 on its cooldown.</li>
          <li>Arcane Power and Presence of Mind together for burst.</li>
          <li>Evocation when you are low on mana.</li>
        </ol>
      </div>
    </div>
    <h3>PvP</h3>
    <div class="rgrid">
      <details class="pcard" open><summary>Melee on you</summary><div class="dbody"><p>Frost Nova, Blink away, then Frostbolt or Cone of Cold. Ice Block when it goes wrong, Cold Snap resets your Frost cooldowns.</p></div></details>
      <details class="pcard"><summary>Healers and casters</summary><div class="dbody"><p>Polymorph the healer, Counterspell the big cast, it locks that school of magic for a few seconds.</p></div></details>
    </div>
    <p class="muted" style="font-size:13px">Built from Forever's own spell data, read by talentsforever.com from the game files, plus Blizzard's class notes. If something works differently in game, tell us.</p>`
});
