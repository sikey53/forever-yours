/* Forever Yours class layout: Priest.
   Spells, levels, race spells and talents come from classes/data/priest.js (talentsforever.com, CC BY 4.0, refreshed daily).
   This file decides where things go on the bars and what the rotations say. */
(window.FY_CLASSES ||= {}).priest = window.FY_makeClass('priest', {
  CLASS_PROFILE: {
    cls: 'priest', stateLabel: 'Bar',
    states: {normal: {label: 'Spells', c: 'var(--caster)'}}
  },
  SPEC_PLAN: {shadow: 'lvl-shadow', holy: 'lvl-holy', disc: 'lvl-discipline'},
  SPECS: {shadow: {label: 'Shadow', ready: true}, holy: {label: 'Holy', ready: false}, disc: {label: 'Discipline', ready: false}},
  MACROS: {
    flash: {name: 'Flash Heal on mouseover', code: '#showtooltip Flash Heal\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Flash Heal', note: 'Heals whoever you hover, a character or a party frame. Otherwise your friendly target, otherwise you.'},
    shield: {name: 'Shield on mouseover', code: '#showtooltip Power Word: Shield\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Power Word: Shield', note: 'Shields whoever you hover, otherwise your friendly target, otherwise you.'},
    dispel: {name: 'Dispel Magic on mouseover', code: '#showtooltip Dispel Magic\n/cast [@mouseover,exists,nodead][@target,exists,nodead][@player] Dispel Magic', note: 'Cleans a friend you hover, or strips a buff from an enemy you hover.'},
    disease: {name: 'Abolish Disease on mouseover', code: '#showtooltip\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Abolish Disease', note: 'Cleanses whoever you hover, otherwise your friendly target, otherwise you. Use Cure Disease until 32.'}
  },
  extraSpells: {
    'Shoot': {form: 'Wand', cd: '', lvl: 1, d: 'Attacks with your wand. Costs no mana, the main way to finish mobs while leveling.'},
    'Healing Potion': {form: 'Item', cd: '2 min', lvl: 1, d: 'Restores health.'},
    'Mana Potion': {form: 'Item', cd: '2 min', lvl: 1, d: 'Restores mana.'},
    'Trinket': {form: 'Item', cd: 'Varies', lvl: 1, d: 'Your on-use trinket.'},
    'Mount': {form: 'Item', cd: '', lvl: 10, d: 'Your mount.'}
  },
  PLAN_NOTE: 'The order most players of your spec follow on talentsforever.com while leveling, then a popular level 60 build. Recalculated from what you have trained.',
  WIZ: {
    name: 'Priest', color: '#F2F2F2',
    roles: [['shadow', 'Shadow damage', 'Damage over time and Mind Flay (Shadow)'], ['heal', 'Healer', 'Big heals and group heals (Holy)'], ['disc', 'Shields and Penance', 'Smart healing and damage (Discipline)']],
    duals: [['heal', 'Healer'], ['shadow', 'Shadow'], ['disc', 'Discipline'], ['pvp', 'PvP'], ['none', 'Not sure yet']],
    states: {normal: ['Spells', 'var(--caster)']},
    kits: {
      shadow: {forms: ['normal'], normal: {spam: ['Mind Flay', 'Shoot'], rot: ['Shadow Word: Pain', 'Mind Blast', 'Devouring Plague'], short: ['Shadow Word: Death', 'Vampiric Embrace', 'Dispel Magic'], once: ['Renew', 'Flash Heal'], interrupt: 'Silence', defensive: 'Power Word: Shield'}},
      heal: {forms: ['normal'], normal: {spam: ['Flash Heal', 'Renew'], rot: ['Heal', 'Greater Heal', 'Prayer of Mending'], short: ['Dispel Magic', 'Abolish Disease', 'Holy Nova'], once: ['Prayer of Healing', 'Inner Focus'], interrupt: 'Psychic Scream', defensive: 'Power Word: Shield'}},
      disc: {forms: ['normal'], normal: {spam: ['Smite', 'Shoot'], rot: ['Shadow Word: Pain', 'Mind Blast', 'Penance'], short: ['Holy Fire', 'Dispel Magic', 'Abolish Disease'], once: ['Flash Heal', 'Inner Focus'], interrupt: 'Psychic Scream', defensive: 'Power Word: Shield'}}
    },
    macroLabel(n, macros) {
      if (macros === 'none') return [n, null];
      if (n === 'Dispel Magic') return ['Dispel Magic', 'dispel'];
      if (n === 'Abolish Disease') return ['Abolish Disease', 'disease'];
      return [n, null];
    },
    stance: role => role === 'shadow' ? ['Shadowform'] : [],
    long: (race, role, racials) => ['Power Word: Fortitude', 'Inner Fire', 'Divine Spirit', 'Fear Ward', 'Fade', 'Psychic Scream', ...racials.slice(0, 2), 'Power Infusion', 'Shackle Undead', 'Mana Potion', 'Trinket', 'Mount'],
    travel: null,
    mouse: (race, macros) => ({
      escape: {n: 'Psychic Scream', base: 'Psychic Scream', job: 'once'},
      potion: {n: 'Healing Potion', base: 'Healing Potion', job: 'long'},
      heal: macros === 'none' ? {n: 'Flash Heal', base: 'Flash Heal', job: 'spam'} : {n: 'Flash Heal on mouseover', base: 'Flash Heal', job: 'spam', macro: 'flash'},
      instant: macros === 'none' ? {n: 'Power Word: Shield', base: 'Power Word: Shield', job: 'spam'} : {n: 'Shield on mouseover', base: 'Power Word: Shield', job: 'spam', macro: 'shield'},
      interrupt: {n: 'Silence', base: 'Silence', job: 'interrupt'},
      defensive: {n: 'Fade', base: 'Fade', job: 'defensive'}
    }),
    spec: role => role === 'heal' ? ['holy', 'Holy'] : role === 'disc' ? ['disc', 'Discipline'] : ['shadow', 'Shadow'],
    preset(role) {
      if (role === 'heal') return ['Holy', 'Group heals and Prayer of Mending for dungeons and raids.'];
      if (role === 'disc') return ['Discipline', 'Penance, stronger shields and Inner Focus, good for leveling and healing.'];
      return ['Shadow', 'Mind Flay, Shadowform and Vampiric Embrace, the fastest way to level.'];
    },
    unbound: [['Hearthstone', '', 'Keep it unbound so you never port by accident'], ['Resurrection', '10', 'Out of combat'], ['Levitate', '34', 'Click it from the spellbook'], ['Mind Vision', '22', 'Scouting'], ['Mind Soothe', '20', 'Click it before a pull']]
  },
  FIGHT_HTML: `
    <p class="muted">Each line is one press, top to bottom. Spells show the level you learn them; skip a line until you have it.</p>
    <h3>Rotations</h3>
    <div class="rgrid">
      <div class="rcard" style="--rc:var(--caster)">
        <div class="eyebrow">Shadow · questing</div>
        <ol class="steps">
          <li>Power Word: Shield yourself before the pull so you are not knocked back while casting.</li>
          <li>Shadow Word: Pain, then Mind Blast.</li>
          <li>Mind Flay from 20 with the talent, otherwise Smite.</li>
          <li>Finish with your wand to save mana.</li>
          <li>Shadow Word: Death from 32 is a big hit on an 18 sec cooldown, but if the target survives you take 30% of your health: use it to finish.</li>
          <li>Shadowform from 40 with the talent: more Shadow damage and less damage taken, but no Holy spells.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--spam)">
        <div class="eyebrow">Healer · dungeons</div>
        <ol class="steps">
          <li>Renew on the tank before the pull.</li>
          <li>Power Word: Shield whoever takes the first hits.</li>
          <li>Prayer of Mending from 40 with the talent: it jumps to the next player hit, up to 5 times.</li>
          <li>Flash Heal for quick saves, Heal or Greater Heal for steady damage.</li>
          <li>Prayer of Healing when three or more are hurt. Binding Heal is gone in Forever.</li>
          <li>Fade if the mobs turn on you.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--gold)">
        <div class="eyebrow">Discipline</div>
        <ol class="steps">
          <li>Penance from 30 with the talent: an instant Holy channel that damages an enemy or heals a friend, 12 sec cooldown.</li>
          <li>Shadow Word: Pain and Smite while leveling, wand to finish.</li>
          <li>Inner Focus makes your next spell free, use it on your biggest heal.</li>
        </ol>
      </div>
    </div>
    <h3>PvP</h3>
    <div class="rgrid">
      <details class="pcard" open><summary>Any fight</summary><div class="dbody"><p>Shield yourself first, keep Shadow Word: Pain up, and save Psychic Scream for when melee reaches you. Dispel Magic strips enemy buffs too.</p></div></details>
      <details class="pcard"><summary>Your race spell</summary><div class="dbody"><p>Each race gets its own priest spell, like Desperate Prayer for Dwarves or Starshards for Night Elves. It sits on your modifier bar.</p></div></details>
    </div>
    <p class="muted" style="font-size:13px">Built from Forever's own spell data, read by talentsforever.com from the game files, plus Blizzard's class notes. If something works differently in game, tell us.</p>`
});
