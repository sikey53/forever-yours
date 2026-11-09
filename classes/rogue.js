/* Forever Yours class layout: Rogue.
   Spells, levels and talents come from classes/data/rogue.js (talentsforever.com, CC BY 4.0, refreshed daily).
   This file decides where things go on the bars and what the rotations say. */
(window.FY_CLASSES ||= {}).rogue = window.FY_makeClass('rogue', {
  CLASS_PROFILE: {
    cls: 'rogue', stateLabel: 'Bar',
    /* in Stealth, Action Bar 1 swaps to its own page */
    states: {
      normal: {label: 'Normal', c: 'var(--cat)'},
      stealth: {label: 'Stealth', c: 'var(--caster)', match: /^Stealth/}
    }
  },
  SPEC_PLAN: {combat: 'lvl-combat', assassination: 'lvl-assassination', subtlety: 'lvl-subtlety'},
  SPECS: {combat: {label: 'Combat', ready: true}, assassination: {label: 'Assassination', ready: false}, subtlety: {label: 'Subtlety', ready: false}},
  MACROS: {
    poisonmh: {name: 'Poison main hand', code: '#showtooltip Instant Poison\n/use Instant Poison\n/use 16', note: 'Coats your main hand weapon in one press. Swap the poison name for the one you use.'},
    poisonoh: {name: 'Poison off hand', code: '#showtooltip Crippling Poison\n/use Crippling Poison\n/use 17', note: 'Coats your off hand weapon in one press. Swap the poison name for the one you use.'}
  },
  extraSpells: {
    'Healing Potion': {form: 'Item', cd: '2 min', lvl: 1, d: 'Restores health.'},
    'Bandage': {form: 'Item', cd: '1 min', lvl: 1, d: 'First Aid heal over 8 sec, with nothing hitting you.'},
    'Trinket': {form: 'Item', cd: 'Varies', lvl: 1, d: 'Your on-use trinket.'},
    'Mount': {form: 'Item', cd: '', lvl: 10, d: 'Your mount.'}
  },
  PLAN_NOTE: 'The order most players of your spec follow on talentsforever.com while leveling, then a popular level 60 build. Recalculated from what you have trained.',
  WIZ: {
    name: 'Rogue', color: '#FFF468',
    roles: [['combat', 'Swords and maces', 'Sinister Strike and steady damage (Combat)'], ['dagger', 'Daggers', 'Backstab and Mutilate from behind (Assassination)'], ['subtlety', 'Stealth and control', 'Openers, stuns and Hemorrhage (Subtlety)']],
    duals: [['subtlety', 'PvP stealth'], ['combat', 'Swords and maces'], ['dagger', 'Daggers'], ['none', 'Not sure yet']],
    states: {normal: ['Normal', 'var(--cat)'], stealth: ['Stealth', 'var(--caster)']},
    kits: {
      combat: {forms: ['normal', 'stealth'],
        normal: {spam: ['Sinister Strike', 'Eviscerate'], rot: ['Slice and Dice', 'Rupture', 'Expose Armor'], short: ['Gouge', 'Feint', 'Shank'], once: ['Stealth', 'Blade Flurry'], interrupt: 'Kick', defensive: 'Evasion'},
        stealth: {spam: ['Cheap Shot', 'Ambush'], rot: ['Sap', 'Garrote', 'Pick Pocket'], short: ['Distract', 'Premeditation', 'Shank'], once: ['Stealth', 'Sprint'], interrupt: 'Kick', defensive: 'Evasion'}},
      dagger: {forms: ['normal', 'stealth'],
        normal: {spam: ['Backstab', 'Eviscerate'], rot: ['Slice and Dice', 'Rupture', 'Mutilate'], short: ['Gouge', 'Feint', 'Shank'], once: ['Stealth', 'Cold Blood'], interrupt: 'Kick', defensive: 'Evasion'},
        stealth: {spam: ['Ambush', 'Cheap Shot'], rot: ['Sap', 'Garrote', 'Pick Pocket'], short: ['Distract', 'Premeditation', 'Shank'], once: ['Stealth', 'Sprint'], interrupt: 'Kick', defensive: 'Evasion'}},
      subtlety: {forms: ['normal', 'stealth'],
        normal: {spam: ['Hemorrhage', 'Eviscerate'], rot: ['Slice and Dice', 'Kidney Shot', 'Rupture'], short: ['Gouge', 'Blind', 'Ghostly Strike'], once: ['Stealth', 'Preparation'], interrupt: 'Kick', defensive: 'Evasion'},
        stealth: {spam: ['Cheap Shot', 'Ambush'], rot: ['Sap', 'Garrote', 'Pick Pocket'], short: ['Distract', 'Premeditation', 'Blind'], once: ['Stealth', 'Sprint'], interrupt: 'Kick', defensive: 'Evasion'}}
    },
    macroLabel: (n) => [n, null],
    stance: () => [],
    long: (race, role, racials) => ['Vanish', 'Sprint', 'Blind', 'Kidney Shot', 'Cold Blood', 'Adrenaline Rush', 'Preparation', ...racials.slice(0, 2), 'Trinket', 'Mount'],
    travel: null,
    mouse: () => ({
      escape: {n: 'Sprint', base: 'Sprint', job: 'once'},
      potion: {n: 'Healing Potion', base: 'Healing Potion', job: 'long'},
      heal: {n: 'Bandage', base: 'Bandage', job: 'long'},
      instant: {n: 'Vanish', base: 'Vanish', job: 'long'},
      interrupt: {n: 'Kick', base: 'Kick', job: 'interrupt'},
      defensive: {n: 'Evasion', base: 'Evasion', job: 'defensive'}
    }),
    spec: role => role === 'dagger' ? ['assassination', 'Assassination'] : role === 'subtlety' ? ['subtlety', 'Subtlety'] : ['combat', 'Combat'],
    preset(role) {
      if (role === 'dagger') return ['Assassination', 'Daggers, Cold Blood and Mutilate, the new row 7 talent.'];
      if (role === 'subtlety') return ['Subtlety', 'Openers, Preparation and Hemorrhage, the PvP favorite.'];
      return ['Combat', 'The most played leveling build: Sinister Strike, Blade Flurry and Adrenaline Rush.'];
    },
    unbound: [['Hearthstone', '', 'Keep it unbound so you never port by accident'], ['Poisons', '20', 'Apply them out of combat from the spellbook, or use the poison macros'], ['Detect Traps', '24', 'Passive'], ['Disarm Trap', '30', 'Click it when you need it'], ['Blinding Powder', '34', 'Reagent for Blind']]
  },
  FIGHT_HTML: `
    <p class="muted">Each line is one press, top to bottom. Spells show the level you learn them; skip a line until you have it. Energy comes back smoothly in Forever, 10 a second with no ticks to wait for.</p>
    <h3>Rotations</h3>
    <div class="rgrid">
      <div class="rcard" style="--rc:var(--cat)">
        <div class="eyebrow">Swords and maces · questing</div>
        <ol class="steps">
          <li>Stealth up and open with Cheap Shot from 26, or Sinister Strike before that.</li>
          <li>Slice and Dice at 1 or 2 combo points.</li>
          <li>Sinister Strike to 5 combo points, then Eviscerate.</li>
          <li>Shank from 24 is a cheap off-hand hit on a 10 sec cooldown: use it whenever it is ready.</li>
          <li>Kick every cast. Evasion when two mobs hit you, Blade Flurry with two targets.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--caster)">
        <div class="eyebrow">Daggers · from behind</div>
        <ol class="steps">
          <li>Ambush from Stealth, behind the target.</li>
          <li>Slice and Dice, then Backstab to 5 combo points.</li>
          <li>Rupture on long fights, Eviscerate on short ones.</li>
          <li>Mutilate from 40 with the talent hits with both daggers and does not need you behind.</li>
          <li>Gouge, step behind, Backstab when a mob turns to face you.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--bear)">
        <div class="eyebrow">Stealth and control · PvP</div>
        <ol class="steps">
          <li>Sap a second enemy first if you can.</li>
          <li>Cheap Shot, then Hemorrhage to 5 combo points.</li>
          <li>Kidney Shot as Cheap Shot ends, then Eviscerate.</li>
          <li>Gouge or Blind to reset, Vanish to escape or open again.</li>
          <li>Preparation brings Vanish, Sprint and Evasion back.</li>
        </ol>
      </div>
    </div>
    <h3>PvP</h3>
    <div class="rgrid">
      <details class="pcard" open><summary>Any fight going badly</summary><div class="dbody"><p>Vanish to reset, or Gouge and Sprint away. Evasion against melee, a Healing Potion between stuns.</p></div></details>
      <details class="pcard"><summary>Another rogue</summary><div class="dbody"><p>Whoever opens first usually wins, so stay in Stealth until you see them. Gouge through their Evasion and Blind them when they are low.</p></div></details>
      <details class="pcard"><summary>A warrior or melee</summary><div class="dbody"><p>Evasion against their swings, and keep them stunned with Cheap Shot then Kidney Shot. Gouge and step away when they try to Execute.</p></div></details>
      <details class="pcard"><summary>A mage</summary><div class="dbody"><p>Open with Cheap Shot, Kick the first cast, Kidney Shot before they Blink. If Frost Nova roots you, wait it out or Vanish.</p></div></details>
      <details class="pcard"><summary>A warlock or priest, fears and casters</summary><div class="dbody"><p>Kick every Fear and heal. Sprint back to them after Psychic Scream, and keep Kidney Shot for when they try to heal.</p></div></details>
      <details class="pcard"><summary>A hunter or an enemy druid</summary><div class="dbody"><p>Hunters want range: Sprint in and stun. Druids shift out of roots, so keep them stunned and Kick when they drop to caster form.</p></div></details>
      <details class="pcard"><summary>Two or more players</summary><div class="dbody"><p>Sap one before you open, Blind the healer, Vanish if a third joins.</p></div></details>
    </div>
    <p class="muted" style="font-size:13px">Built from Forever's own spell data, read by talentsforever.com from the game files, plus Blizzard's class notes. If something works differently in game, tell us.</p>`
});
