/* Forever Yours class layout: Hunter.
   Spells, levels and talents come from classes/data/hunter.js (talentsforever.com, CC BY 4.0, refreshed daily).
   This file decides where things go on the bars and what the rotations say. */
(window.FY_CLASSES ||= {}).hunter = window.FY_makeClass('hunter', {
  CLASS_PROFILE: {cls: 'hunter', stateLabel: 'Bar', states: {normal: {label: 'Shots', c: 'var(--spam)'}}},
  SPEC_PLAN: {bm: 'lvl-bm', mm: 'lvl-marksmanship', survival: 'lvl-survival'},
  SPECS: {bm: {label: 'Beast Mastery', ready: true}, mm: {label: 'Marksmanship', ready: false}, survival: {label: 'Survival', ready: false}},
  MACROS: {
    petattack: {name: 'Pet attack', code: '#showtooltip\n/petattack', note: 'Sends your pet at your target. Press it before your first shot.'},
    trapfd: {name: 'Feign Death, then Freezing Trap', code: '#showtooltip Freezing Trap\n/stopattack\n/petfollow\n/cast Freezing Trap', note: 'Use after Feign Death to drop a trap while out of combat. Traps only go down out of combat.'}
  },
  extraSpells: {
    'Healing Potion': {form: 'Item', cd: '2 min', lvl: 1, d: 'Restores health.'},
    'Trinket': {form: 'Item', cd: 'Varies', lvl: 1, d: 'Your on-use trinket.'},
    'Mount': {form: 'Item', cd: '', lvl: 10, d: 'Your mount.'}
  },
  PLAN_NOTE: 'The order most players of your spec follow on talentsforever.com while leveling, then a popular level 60 build. Recalculated from what you have trained.',
  WIZ: {
    name: 'Hunter', color: '#AAD372',
    roles: [['bm', 'Beast Mastery', 'Your pet does the heavy lifting, the easiest leveling'], ['mm', 'Marksmanship', 'Aimed Shot and long range damage'], ['survival', 'Survival', 'Traps, melee tricks and control']],
    duals: [['mm', 'Marksmanship'], ['bm', 'Beast Mastery'], ['survival', 'Survival'], ['pvp', 'PvP'], ['none', 'Not sure yet']],
    states: {normal: ['Shots', 'var(--spam)']},
    kits: {
      bm: {forms: ['normal'], normal: {spam: ['Arcane Shot', 'Multi-Shot'], rot: ['Serpent Sting', "Hunter's Mark", 'Aimed Shot'], short: ['Concussive Shot', 'Wing Clip', 'Raptor Strike'], once: ['Bestial Wrath', 'Rapid Fire'], interrupt: 'Intimidation', defensive: 'Feign Death'}},
      mm: {forms: ['normal'], normal: {spam: ['Aimed Shot', 'Arcane Shot'], rot: ['Serpent Sting', "Hunter's Mark", 'Multi-Shot'], short: ['Concussive Shot', 'Wing Clip', 'Raptor Strike'], once: ['Rapid Fire', 'Sniper Shot'], interrupt: 'Scatter Shot', defensive: 'Feign Death'}},
      survival: {forms: ['normal'], normal: {spam: ['Raptor Strike', 'Arcane Shot'], rot: ['Serpent Sting', "Hunter's Mark", 'Mongoose Bite'], short: ['Wing Clip', 'Counterattack', 'Disengage'], once: ['Deterrence', 'Rapid Fire'], interrupt: 'Scatter Shot', defensive: 'Feign Death'}}
    },
    macroLabel: (n) => [n, null],
    stance: () => [],
    long: (race, role, racials) => ['Aspect of the Hawk', 'Aspect of the Monkey', 'Aspect of the Cheetah', 'Freezing Trap', 'Frost Trap', 'Immolation Trap', 'Mend Pet', 'Volley', ...racials.slice(0, 1), 'Trinket'],
    travel: null,
    mouse: (race, macros) => ({
      escape: {n: 'Disengage', base: 'Disengage', job: 'once'},
      potion: {n: 'Healing Potion', base: 'Healing Potion', job: 'long'},
      heal: {n: 'Mend Pet', base: 'Mend Pet', job: 'spam'},
      instant: macros === 'none' ? null : {n: 'Pet attack', base: 'Pet attack', job: 'spam', macro: 'petattack'},
      interrupt: {n: 'Scatter Shot', base: 'Scatter Shot', job: 'interrupt'},
      defensive: {n: 'Deterrence', base: 'Deterrence', job: 'defensive'}
    }),
    spec: role => role === 'mm' ? ['mm', 'Marksmanship'] : role === 'survival' ? ['survival', 'Survival'] : ['bm', 'Beast Mastery'],
    preset(role) {
      if (role === 'mm') return ['Marksmanship', 'Trueshot Aura, Scatter Shot and the new Sniper Shot.'];
      if (role === 'survival') return ['Survival', 'Counterattack, Deterrence and stronger traps.'];
      return ['Beast Mastery', 'Intimidation and Bestial Wrath: the most played leveling build.'];
    },
    unbound: [['Hearthstone', '', 'Keep it unbound so you never port by accident'], ['Call, Dismiss, Feed and Revive Pet', '10', 'Out of combat, click them from the spellbook'], ['Tracking', '1', 'Click it from the spellbook, it stays on'], ['Pet abilities', '', 'Bite, Claw, Growl and the rest stay on the pet bar'], ['Aspect of the Pack and Wild', '40', 'Group aspects, click them when needed']]
  },
  FIGHT_HTML: `
    <p class="muted">Each line is one press, top to bottom. Spells show the level you learn them; skip a line until you have it.</p>
    <h3>Rotations</h3>
    <div class="rgrid">
      <div class="rcard" style="--rc:var(--spam)">
        <div class="eyebrow">Beast Mastery · questing</div>
        <ol class="steps">
          <li>Aspect of the Hawk on, Hunter's Mark on the target, send your pet.</li>
          <li>Let the pet take the first hits, then Serpent Sting.</li>
          <li>Arcane Shot on cooldown. Aimed Shot from 20 is trainable in Forever, a 2 sec cast that shares its 6 sec cooldown with Multi-Shot.</li>
          <li>If something reaches you, Wing Clip and step back, or Raptor Strike.</li>
          <li>Mend Pet between pulls. Bestial Wrath at 40 with the talent for big fights.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--caster)">
        <div class="eyebrow">Marksmanship</div>
        <ol class="steps">
          <li>Open with Aimed Shot from max range.</li>
          <li>Serpent Sting, then Arcane Shot and Multi-Shot on cooldown.</li>
          <li>Sniper Shot from 40 with the talent: a long-range hit on a 15 sec cooldown.</li>
          <li>Rapid Fire for burst. Scatter Shot to disorient and get distance.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--bear)">
        <div class="eyebrow">Survival</div>
        <ol class="steps">
          <li>Freezing Trap a second enemy before the pull.</li>
          <li>Shots from range, then Raptor Strike and Mongoose Bite up close.</li>
          <li>Counterattack after a parry, Deterrence when you take too much.</li>
          <li>Disengage to drop threat, Feign Death to reset.</li>
        </ol>
      </div>
    </div>
    <h3>PvP</h3>
    <div class="rgrid">
      <details class="pcard" open><summary>Melee on you</summary><div class="dbody"><p>Concussive Shot or Wing Clip, then step out of range. Feign Death and drop a Freezing Trap, Scatter Shot to get room.</p></div></details>
      <details class="pcard"><summary>Casters</summary><div class="dbody"><p>Viper Sting drains their mana, Scatter Shot and Intimidation stop a big cast.</p></div></details>
    </div>
    <p class="muted" style="font-size:13px">Built from Forever's own spell data, read by talentsforever.com from the game files, plus Blizzard's class notes. If something works differently in game, tell us.</p>`
});
