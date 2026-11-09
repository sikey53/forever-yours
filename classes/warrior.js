/* Forever Yours class layout: Warrior.
   Spells, levels, stances and talents come from classes/data/warrior.js (talentsforever.com, CC BY 4.0, refreshed daily).
   This file decides where things go on the bars and what the rotations say. */
(window.FY_CLASSES ||= {}).warrior = window.FY_makeClass('warrior', {
  CLASS_PROFILE: {
    cls: 'warrior', stateLabel: 'Stance',
    /* Action Bar 1 swaps to its own page in each stance */
    states: {
      battle: {label: 'Battle', c: 'var(--bear)', match: /^Battle Stance/},
      defensive: {label: 'Defensive', c: 'var(--caster)', match: /^Defensive Stance/},
      berserker: {label: 'Berserker', c: 'var(--cat)', match: /^Berserker Stance/}
    }
  },
  SPEC_PLAN: {arms: 'lvl-arms', fury: 'lvl-fury', prot: 'lvl-protection'},
  SPECS: {arms: {label: 'Arms', ready: true}, fury: {label: 'Fury', ready: false}, prot: {label: 'Protection', ready: false}},
  MACROS: {
    chargeintercept: {name: 'Charge or Intercept', code: '#showtooltip\n/cast [stance:1] Charge; [stance:3] Intercept; Battle Stance', note: 'Charge in Battle Stance, Intercept in Berserker Stance. In Defensive Stance it switches you to Battle, press again to Charge. Charge only works out of combat.'},
    overpower: {name: 'Overpower', code: '#showtooltip Overpower\n/cast [stance:1] Overpower; Battle Stance', note: 'In Battle Stance it Overpowers. From another stance it switches to Battle first, press again to Overpower. Tactical Mastery keeps 10 Rage through the switch.'},
    pummel: {name: 'Pummel or Shield Bash', code: '#showtooltip\n/cast [stance:3] Pummel; [equipped:Shields] Shield Bash; Berserker Stance', note: 'Interrupt in any stance: Pummel in Berserker, Shield Bash in Battle or Defensive with a shield. Without a shield it switches you to Berserker, press again to Pummel.'}
  },
  extraSpells: {
    'Healing Potion': {form: 'Item', cd: '2 min', lvl: 1, d: 'Restores health. Works in any stance.'},
    'Bandage': {form: 'Item', cd: '1 min', lvl: 1, d: 'First Aid heal over 8 sec, out of combat or with nothing hitting you.'},
    'Trinket': {form: 'Item', cd: 'Varies', lvl: 1, d: 'Your on-use trinket.'},
    'Mount': {form: 'Item', cd: '', lvl: 10, d: 'Your mount.'}
  },
  PLAN_NOTE: 'The order most players of your spec follow on talentsforever.com while leveling, then a popular level 60 build. Recalculated from what you have trained.',
  WIZ: {
    name: 'Warrior', color: '#C69B6D',
    roles: [['arms', 'Two-hander', 'Big hits with a two-handed weapon (Arms)'], ['fury', 'Dual wield', 'Two weapons, nonstop attacks (Fury)'], ['tank', 'Tank', 'Shield and threat (Protection)']],
    duals: [['tank', 'Tank'], ['arms', 'Two-hander'], ['fury', 'Dual wield'], ['pvp', 'PvP'], ['none', 'Not sure yet']],
    states: {battle: ['Battle', 'var(--bear)'], defensive: ['Defensive', 'var(--caster)'], berserker: ['Berserker', 'var(--cat)']},
    kits: {
      arms: {forms: ['battle', 'berserker', 'defensive'],
        battle: {spam: ['Heroic Strike', 'Mortal Strike'], rot: ['Rend', 'Overpower', 'Execute'], short: ['Thunder Clap', 'Hamstring', 'Sweeping Strikes'], once: ['Charge', 'Victory Rush'], interrupt: 'Berserker Stance', defensive: 'Retaliation'},
        berserker: {spam: ['Heroic Strike', 'Mortal Strike'], rot: ['Whirlwind', 'Slam', 'Execute'], short: ['Berserker Rage', 'Hamstring', 'Cleave'], once: ['Intercept', 'Victory Rush'], interrupt: 'Pummel', defensive: 'Intimidating Shout'},
        defensive: {spam: ['Heroic Strike', 'Sunder Armor'], rot: ['Rend', 'Revenge', 'Taunt'], short: ['Thunder Clap', 'Shield Block', 'Disarm'], once: ['Shield Bash', 'Victory Rush'], interrupt: 'Shield Bash', defensive: 'Shield Wall'}},
      fury: {forms: ['berserker', 'battle', 'defensive'],
        berserker: {spam: ['Heroic Strike', 'Bloodthirst'], rot: ['Whirlwind', 'Slam', 'Execute'], short: ['Berserker Rage', 'Hamstring', 'Cleave'], once: ['Intercept', 'Death Wish'], interrupt: 'Pummel', defensive: 'Intimidating Shout'},
        battle: {spam: ['Heroic Strike', 'Bloodthirst'], rot: ['Rend', 'Overpower', 'Execute'], short: ['Thunder Clap', 'Hamstring', 'Sweeping Strikes'], once: ['Charge', 'Victory Rush'], interrupt: 'Berserker Stance', defensive: 'Retaliation'},
        defensive: {spam: ['Heroic Strike', 'Sunder Armor'], rot: ['Rend', 'Revenge', 'Taunt'], short: ['Thunder Clap', 'Shield Block', 'Disarm'], once: ['Shield Bash', 'Victory Rush'], interrupt: 'Shield Bash', defensive: 'Shield Wall'}},
      tank: {forms: ['defensive', 'battle', 'berserker'],
        defensive: {spam: ['Sunder Armor', 'Heroic Strike'], rot: ['Revenge', 'Shield Slam', 'Taunt'], short: ['Shield Block', 'Thunder Clap', 'Demoralizing Shout'], once: ['Concussion Blow', 'Last Stand'], interrupt: 'Shield Bash', defensive: 'Shield Wall'},
        battle: {spam: ['Sunder Armor', 'Heroic Strike'], rot: ['Rend', 'Overpower', 'Mocking Blow'], short: ['Thunder Clap', 'Hamstring', 'Sweeping Strikes'], once: ['Charge', 'Victory Rush'], interrupt: 'Shield Bash', defensive: 'Retaliation'},
        berserker: {spam: ['Sunder Armor', 'Heroic Strike'], rot: ['Whirlwind', 'Slam', 'Execute'], short: ['Berserker Rage', 'Hamstring', 'Cleave'], once: ['Intercept', 'Victory Rush'], interrupt: 'Pummel', defensive: 'Intimidating Shout'}}
    },
    macroLabel(n, macros) {
      if (macros !== 'none' && n === 'Charge') return ['Charge · Intercept', 'chargeintercept'];
      if (macros !== 'none' && n === 'Intercept') return ['Charge · Intercept', 'chargeintercept'];
      if (macros === 'useful' && n === 'Overpower') return ['Overpower', 'overpower'];
      if (macros === 'useful' && (n === 'Pummel' || n === 'Shield Bash')) return ['Pummel · Shield Bash', 'pummel'];
      return [n, null];
    },
    stance: () => ['Battle Stance', 'Defensive Stance', 'Berserker Stance'],
    long: (race, role, racials) => ['Battle Shout', 'Demoralizing Shout', 'Bloodrage', 'Challenging Shout', ...racials.slice(0, 2), 'Recklessness', 'Piercing Howl', 'Trinket', 'Mount'],
    travel: null,
    mouse: (race, macros) => ({
      escape: macros === 'none' ? {n: 'Intercept', base: 'Intercept', job: 'once'} : {n: 'Charge · Intercept', base: 'Charge', job: 'once', macro: 'chargeintercept'},
      potion: {n: 'Healing Potion', base: 'Healing Potion', job: 'long'},
      heal: {n: 'Bandage', base: 'Bandage', job: 'long'},
      interrupt: macros === 'none' ? {n: 'Pummel', base: 'Pummel', job: 'interrupt'} : {n: 'Pummel · Shield Bash', base: 'Pummel', job: 'interrupt', macro: 'pummel'},
      defensive: {n: 'Shield Wall', base: 'Shield Wall', job: 'defensive'}
    }),
    routeNote: (n, key) => n === 'Berserker Stance' ? `Goes to Berserker Stance. Press ${key} again there to Pummel (level 38).` : null,
    spec: role => role === 'tank' ? ['prot', 'Protection'] : role === 'fury' ? ['fury', 'Fury'] : ['arms', 'Arms'],
    preset(role, acts) {
      if (role === 'tank') return ['Protection', 'Shield Slam, Concussion Blow and Last Stand for threat and safety. Plan the points in the Simulator.'];
      if (role === 'fury') return ['Fury', 'Bloodthirst and Death Wish for dual wielding. Plan the points in the Simulator.'];
      return ['Arms', 'Mortal Strike, Sweeping Strikes and Spearing Strike for two-handers. Plan the points in the Simulator.'];
    },
    unbound: [['Hearthstone', '', 'Keep it unbound so you never port by accident'], ['Tactical Mastery', '14', 'Passive in Forever: keep 10 Rage when you change stance'], ['Shield Wall', '28', 'If it is not on a key in your main stance, click it from the spellbook']]
  },
  FIGHT_HTML: `
    <p class="muted">Each line is one press, top to bottom. Spells show the level you learn them; skip a line until you have it.</p>
    <h3>Rotations</h3>
    <div class="rgrid">
      <div class="rcard" style="--rc:var(--bear)">
        <div class="eyebrow">Two-hander · questing</div>
        <ol class="steps">
          <li>Before the pull: Battle Shout.</li>
          <li>Charge in from Battle Stance. It gives 9 Rage and a short stun, and only works out of combat.</li>
          <li>Rend on anything that will live more than a few seconds.</li>
          <li>Overpower whenever it lights up after a dodge.</li>
          <li>Mortal Strike on cooldown from 40. Before that, Heroic Strike when you have spare Rage.</li>
          <li>Slam from 20 has a 1.5 sec cast and a 15 sec cooldown in Forever: use it between swings when Rage is high.</li>
          <li>Execute below 20% health. Victory Rush right after a kill heals 10% of your health.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--cat)">
        <div class="eyebrow">Dual wield · Berserker Stance</div>
        <ol class="steps">
          <li>Intercept in from Berserker Stance at 30, or Charge then swap.</li>
          <li>Bloodthirst on cooldown from 40. It also makes you 10% faster for 10 sec in Forever.</li>
          <li>Whirlwind on cooldown from 36, best with two or more enemies.</li>
          <li>Heroic Strike or Cleave to spend extra Rage.</li>
          <li>Execute below 20%. Berserker Rage when you are feared or need Rage.</li>
          <li>Death Wish on hard fights: 20% more damage for 30 sec, but you take 5% more.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--caster)">
        <div class="eyebrow">Tank · Defensive Stance</div>
        <ol class="steps">
          <li>Pull with a thrown weapon or Charge, then swap to Defensive Stance. Tactical Mastery keeps 10 Rage through every swap.</li>
          <li>Shield Slam on cooldown with the talent, Revenge whenever it lights up.</li>
          <li>Sunder Armor to build threat on the main target, Thunder Clap and Demoralizing Shout on packs.</li>
          <li>Shield Block before big hits: in Forever it blocks twice over 7 sec.</li>
          <li>Taunt anything that runs to the healer. Challenging Shout when a whole pack does.</li>
          <li>Emergencies: Last Stand, then Shield Wall, now a 15 min cooldown for 60% less damage over 12 sec.</li>
        </ol>
      </div>
    </div>
    <h3>PvP</h3>
    <div class="rgrid">
      <details class="pcard" open><summary>Any fight</summary><div class="dbody"><p>Hamstring first so they cannot run. Mortal Strike on cooldown cuts their healing in half. Keep Intimidating Shout for when a healer or caster gets free.</p></div></details>
      <details class="pcard"><summary>Casters</summary><div class="dbody"><p>Pummel or Shield Bash every big cast. Intercept closes the gap after a frost nova or a root. Berserker Rage breaks fear.</p></div></details>
      <details class="pcard"><summary>Mounted enemies</summary><div class="dbody"><p>Spearing Strike, a new Forever talent ability, dismounts mounted targets and hits harder on them.</p></div></details>
    </div>
    <p class="muted" style="font-size:13px">Built from Forever's own spell data, read by talentsforever.com from the game files, plus Blizzard's class notes. If something works differently in game, tell us.</p>`
});
