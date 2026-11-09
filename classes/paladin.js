/* Forever Yours class layout: Paladin.
   Spells, levels and talents come from classes/data/paladin.js (talentsforever.com, CC BY 4.0, refreshed daily).
   This file decides where things go on the bars and what the rotations say. */
(window.FY_CLASSES ||= {}).paladin = window.FY_makeClass('paladin', {
  CLASS_PROFILE: {cls: 'paladin', stateLabel: 'Bar', states: {normal: {label: 'Spells', c: 'var(--gold)'}}},
  SPEC_PLAN: {ret: 'lvl-retribution', prot: 'lvl-protection', holy: 'lvl-holy'},
  SPECS: {ret: {label: 'Retribution', ready: true}, prot: {label: 'Protection', ready: false}, holy: {label: 'Holy', ready: false}},
  MACROS: {
    flash: {name: 'Flash of Light on mouseover', code: '#showtooltip Flash of Light\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Flash of Light', note: 'Heals whoever you hover, otherwise your friendly target, otherwise you.'},
    cleanse: {name: 'Cleanse on mouseover', code: '#showtooltip\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Cleanse', note: 'Cleanses whoever you hover, otherwise your friendly target, otherwise you. Use Purify until 42.'},
    loh: {name: 'Lay on Hands on mouseover', code: '#showtooltip Lay on Hands\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Lay on Hands', note: 'Saves whoever you hover, otherwise your friendly target, otherwise you.'}
  },
  extraSpells: {
    'Healing Potion': {form: 'Item', cd: '2 min', lvl: 1, d: 'Restores health.'},
    'Trinket': {form: 'Item', cd: 'Varies', lvl: 1, d: 'Your on-use trinket.'},
    'Mount': {form: 'Item', cd: '', lvl: 10, d: 'Your mount or charger.'}
  },
  PLAN_NOTE: 'The order most players of your spec follow on talentsforever.com while leveling, then a popular level 60 build. Recalculated from what you have trained.',
  WIZ: {
    name: 'Paladin', color: '#F48CBA',
    roles: [['ret', 'Retribution', 'Two-hander, seals and Holy Strike'], ['prot', 'Tank', 'Shield, Seal of Fury and Holy Shield'], ['holy', 'Healer', 'Holy Light, Holy Shock and Oath of Light']],
    duals: [['holy', 'Healer'], ['prot', 'Tank'], ['ret', 'Retribution'], ['pvp', 'PvP'], ['none', 'Not sure yet']],
    states: {normal: ['Spells', 'var(--gold)']},
    kits: {
      ret: {forms: ['normal'], normal: {spam: ['Holy Strike', 'Judgement'], rot: ['Seal of Righteousness', 'Seal of Command', 'Consecration'], short: ['Exorcism', 'Hammer of Wrath', 'Flash of Light'], once: ['Repentance', 'Divine Favor'], interrupt: 'Hammer of Justice', defensive: 'Divine Protection'}},
      prot: {forms: ['normal'], normal: {spam: ['Holy Strike', 'Judgement'], rot: ['Seal of Fury', 'Holy Shield', 'Consecration'], short: ['Exorcism', 'Hammer of Wrath', 'Flash of Light'], once: ["Templar's Bulwark", 'Swift Judgement'], interrupt: 'Hammer of Justice', defensive: 'Divine Protection'}},
      holy: {forms: ['normal'], normal: {spam: ['Flash of Light', 'Holy Light'], rot: ['Holy Shock', 'Oath of Light', "Light's Vigil"], short: ['Cleanse', 'Judgement', 'Blessing of Freedom'], once: ['Divine Favor', 'Blessing of Protection'], interrupt: 'Hammer of Justice', defensive: 'Divine Shield'}}
    },
    macroLabel(n, macros) {
      if (macros !== 'none' && n === 'Cleanse') return ['Cleanse', 'cleanse'];
      return [n, null];
    },
    stance: () => [],
    long: (race, role, racials) => ['Blessing of Might', 'Blessing of Kings', 'Blessing of Wisdom', 'Devotion Aura', 'Retribution Aura', 'Concentration Aura', 'Righteous Fury', 'Divine Shield', ...racials.slice(0, 1), 'Trinket'],
    travel: null,
    mouse: (race, macros) => ({
      escape: {n: 'Blessing of Freedom', base: 'Blessing of Freedom', job: 'once'},
      potion: {n: 'Healing Potion', base: 'Healing Potion', job: 'long'},
      heal: macros === 'none' ? {n: 'Flash of Light', base: 'Flash of Light', job: 'spam'} : {n: 'Flash of Light on mouseover', base: 'Flash of Light', job: 'spam', macro: 'flash'},
      instant: macros === 'none' ? {n: 'Lay on Hands', base: 'Lay on Hands', job: 'long'} : {n: 'Lay on Hands on mouseover', base: 'Lay on Hands', job: 'long', macro: 'loh'},
      interrupt: {n: 'Hammer of Justice', base: 'Hammer of Justice', job: 'interrupt'},
      defensive: {n: 'Divine Shield', base: 'Divine Shield', job: 'defensive'}
    }),
    spec: role => role === 'prot' ? ['prot', 'Protection'] : role === 'holy' ? ['holy', 'Holy'] : ['ret', 'Retribution'],
    preset(role) {
      if (role === 'prot') return ['Protection', "Holy Shield and Templar's Bulwark, Forever's new tank tools."];
      if (role === 'holy') return ['Holy', 'Holy Shock, Oath of Light and Divine Favor for healing.'];
      return ['Retribution', 'Seal of Command and Repentance, the usual leveling build.'];
    },
    unbound: [['Hearthstone', '', 'Keep it unbound so you never port by accident'], ['Redemption', '12', 'Out of combat'], ['Resistance auras', '28', 'Click the one a fight needs'], ['Turn Undead and Sense Undead', '1', 'Click them from the spellbook'], ['Greater Blessings', '52', 'Raid buffs, click them']]
  },
  FIGHT_HTML: `
    <p class="muted">Each line is one press, top to bottom. Spells show the level you learn them; skip a line until you have it.</p>
    <h3>Rotations</h3>
    <div class="rgrid">
      <div class="rcard" style="--rc:var(--gold)">
        <div class="eyebrow">Retribution · questing</div>
        <ol class="steps">
          <li>Blessing of Might and your aura before the pull.</li>
          <li>Seal of Righteousness, then Judgement. In Forever, Judgement no longer eats your seal, so you judge on every cooldown and keep the seal.</li>
          <li>Holy Strike from 6 on its 10 sec cooldown.</li>
          <li>Consecration from 20 on groups, Exorcism on undead and demons.</li>
          <li>Hammer of Wrath to finish low targets from 44. Flash of Light between pulls.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--caster)">
        <div class="eyebrow">Tank</div>
        <ol class="steps">
          <li>Righteous Fury on, Seal of Fury with a shield: every hit adds Holy damage and a small absorb.</li>
          <li>Judging Seal of Fury taunts. Judgement and Swift Judgement do not share a cooldown.</li>
          <li>Holy Shield from 30 with the talent, Consecration on packs.</li>
          <li>Templar's Bulwark with the talent is a shield worth your whole health for 8 sec.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--spam)">
        <div class="eyebrow">Healer</div>
        <ol class="steps">
          <li>Oath of Light on the tank: your heals on them get much stronger.</li>
          <li>Flash of Light for steady damage, Holy Light for big hits.</li>
          <li>Holy Shock from 30 with the talent is an instant heal or damage spell.</li>
          <li>Light's Vigil from 40 makes the next Holy Shock free of cooldown and heals the whole party.</li>
          <li>Cleanse poisons, diseases and magic from 42, Purify before that.</li>
        </ol>
      </div>
    </div>
    <h3>PvP</h3>
    <div class="rgrid">
      <details class="pcard" open><summary>Any fight</summary><div class="dbody"><p>Hammer of Justice stops a cast or a burst. Blessing of Freedom breaks slows and roots. Divine Shield, then heal yourself, when it goes wrong.</p></div></details>
      <details class="pcard"><summary>Healers</summary><div class="dbody"><p>Repentance with the talent takes a healer out of the fight. Judgement of Justice keeps runners from escaping.</p></div></details>
    </div>
    <p class="muted" style="font-size:13px">Built from Forever's own spell data, read by talentsforever.com from the game files, plus Blizzard's class notes. If something works differently in game, tell us.</p>`
});
