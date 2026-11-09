/* Forever Yours class layout: Warlock.
   Spells, levels and talents come from classes/data/warlock.js (talentsforever.com, CC BY 4.0, refreshed daily).
   This file decides where things go on the bars and what the rotations say. */
(window.FY_CLASSES ||= {}).warlock = window.FY_makeClass('warlock', {
  CLASS_PROFILE: {cls: 'warlock', stateLabel: 'Bar', states: {normal: {label: 'Spells', c: 'var(--caster)'}}},
  SPEC_PLAN: {affliction: 'lvl-affliction', demonology: 'lvl-demonology', destruction: 'lvl-destruction'},
  SPECS: {affliction: {label: 'Affliction', ready: true}, demonology: {label: 'Demonology', ready: false}, destruction: {label: 'Destruction', ready: false}},
  MACROS: {
    fearmouse: {name: 'Fear on mouseover', code: '#showtooltip Fear\n/cast [@mouseover,harm,nodead][] Fear', note: 'Fears the enemy you hover without changing your target, otherwise your target.'},
    petattack: {name: 'Pet attack', code: '#showtooltip\n/petattack', note: 'Sends your demon at your target. Press it before your first spell.'}
  },
  extraSpells: {
    'Healthstone': {form: 'Item', cd: '2 min', lvl: 10, d: 'Your Healthstone, made with Create Healthstone.'},
    'Healing Potion': {form: 'Item', cd: '2 min', lvl: 1, d: 'Restores health.'},
    'Trinket': {form: 'Item', cd: 'Varies', lvl: 1, d: 'Your on-use trinket.'},
    'Mount': {form: 'Item', cd: '', lvl: 40, d: 'Your Felsteed or mount.'}
  },
  PLAN_NOTE: 'The order most players of your spec follow on talentsforever.com while leveling, then a popular level 60 build. Recalculated from what you have trained.',
  WIZ: {
    name: 'Warlock', color: '#8788EE',
    roles: [['affliction', 'Affliction', 'Damage over time and drains, the classic leveling spec'], ['demonology', 'Demonology', 'A stronger demon at your side'], ['destruction', 'Destruction', 'Fire spells and big hits']],
    duals: [['affliction', 'Affliction'], ['demonology', 'Demonology'], ['destruction', 'Destruction'], ['pvp', 'PvP'], ['none', 'Not sure yet']],
    states: {normal: ['Spells', 'var(--caster)']},
    kits: {
      affliction: {forms: ['normal'], normal: {spam: ['Shadow Bolt', 'Drain Life'], rot: ['Corruption', 'Bane of Agony', 'Siphon Life'], short: ['Immolate', 'Life Tap', 'Fear'], once: ['Drain Soul', 'Death Coil'], interrupt: 'Spell Lock', defensive: 'Shadow Ward'}},
      demonology: {forms: ['normal'], normal: {spam: ['Shadow Bolt', 'Drain Life'], rot: ['Corruption', 'Bane of Agony', 'Immolate'], short: ['Life Tap', 'Health Funnel', 'Fear'], once: ['Drain Soul', 'Fel Domination'], interrupt: 'Spell Lock', defensive: 'Shadow Ward'}},
      destruction: {forms: ['normal'], normal: {spam: ['Shadow Bolt', 'Incinerate'], rot: ['Immolate', 'Conflagrate', 'Corruption'], short: ['Searing Pain', 'Life Tap', 'Fear'], once: ['Shadowburn', 'Soul Fire'], interrupt: 'Spell Lock', defensive: 'Shadow Ward'}}
    },
    macroLabel(n, macros) {
      if (macros === 'useful' && n === 'Fear') return ['Fear on mouseover', 'fearmouse'];
      return [n, null];
    },
    stance: () => [],
    long: (race, role, racials) => ['Demon Armor', 'Curse of Weakness', 'Curse of the Elements', 'Curse of Tongues', 'Howl of Terror', 'Banish', 'Create Healthstone', ...racials.slice(0, 2), 'Trinket', 'Mount'],
    travel: null,
    mouse: () => ({
      escape: {n: 'Howl of Terror', base: 'Howl of Terror', job: 'once'},
      potion: {n: 'Healing Potion', base: 'Healing Potion', job: 'long'},
      heal: {n: 'Healthstone', base: 'Healthstone', job: 'long'},
      interrupt: {n: 'Spell Lock', base: 'Spell Lock', job: 'interrupt'},
      defensive: {n: 'Shadow Ward', base: 'Shadow Ward', job: 'defensive'}
    }),
    spec: role => role === 'demonology' ? ['demonology', 'Demonology'] : role === 'destruction' ? ['destruction', 'Destruction'] : ['affliction', 'Affliction'],
    preset(role) {
      if (role === 'demonology') return ['Demonology', 'Soul Link and a stronger demon: very safe.'];
      if (role === 'destruction') return ['Destruction', 'Conflagrate, Shadowburn and Incinerate.'];
      return ['Affliction', 'Siphon Life and Wrack, the new row 7 talent: damage while you drain.'];
    },
    unbound: [['Hearthstone', '', 'Keep it unbound so you never port by accident'], ['Summon Imp, Voidwalker, Succubus, Felhunter', '1', 'Out of combat, click them from the spellbook'], ['Pet abilities', '', 'Firebolt, Torment, Lash of Pain and the rest stay on the pet bar; Spell Lock is worth dragging to your interrupt key'], ['Create Soulstone', '18', 'Use it on yourself or a healer before a hard fight'], ['Ritual of Summoning', '20', 'Summons a group member']]
  },
  FIGHT_HTML: `
    <p class="muted">Each line is one press, top to bottom. Spells show the level you learn them; skip a line until you have it.</p>
    <h3>Rotations</h3>
    <div class="rgrid">
      <div class="rcard" style="--rc:var(--caster)">
        <div class="eyebrow">Affliction · questing</div>
        <ol class="steps">
          <li>Send your demon in first. Voidwalker from 10 holds mobs while you work.</li>
          <li>Corruption, then Bane of Agony. In Forever, Curse of Agony became Bane of Agony, and banes and curses are separate: you can keep one of each on a target.</li>
          <li>Siphon Life from 30 with the talent.</li>
          <li>Shadow Bolt or Drain Life while the damage over time ticks.</li>
          <li>Drain Soul on the last few seconds for a Soul Shard. Life Tap to turn health into mana between pulls.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--gold)">
        <div class="eyebrow">Demonology</div>
        <ol class="steps">
          <li>Same damage over time as Affliction, with a tougher demon.</li>
          <li>Soul Link from 30 with the talent shares damage with your demon.</li>
          <li>Health Funnel keeps the demon alive, Fel Domination makes the next summon instant.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--bear)">
        <div class="eyebrow">Destruction</div>
        <ol class="steps">
          <li>Immolate, then Conflagrate from 25 with the talent.</li>
          <li>Shadow Bolt as your main spell, Incinerate from 40 with the talent against burning targets.</li>
          <li>Shadowburn to finish, Searing Pain while moving or to hold aggro off.</li>
        </ol>
      </div>
    </div>
    <h3>PvP</h3>
    <div class="rgrid">
      <details class="pcard" open><summary>Any fight</summary><div class="dbody"><p>Corruption and Bane of Agony first, Curse of Exhaustion or Tongues on top since banes and curses stack now. Fear and Howl of Terror keep melee off you, Death Coil is your panic button.</p></div></details>
      <details class="pcard"><summary>Casters</summary><div class="dbody"><p>Felhunter's Spell Lock interrupts and silences. Drag it from the pet bar onto your interrupt key.</p></div></details>
    </div>
    <p class="muted" style="font-size:13px">Built from Forever's own spell data, read by talentsforever.com from the game files, plus Blizzard's class notes. If something works differently in game, tell us.</p>`
});
