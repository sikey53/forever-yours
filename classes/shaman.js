/* Forever Yours class layout: Shaman.
   Spells, levels and talents come from classes/data/shaman.js (talentsforever.com, CC BY 4.0, refreshed daily).
   This file decides where things go on the bars and what the rotations say. */
(window.FY_CLASSES ||= {}).shaman = window.FY_makeClass('shaman', {
  CLASS_PROFILE: {cls: 'shaman', stateLabel: 'Bar', states: {normal: {label: 'Spells', c: 'var(--caster)'}}},
  GROUPS: {'@ghostwolf': ['In Ghost Wolf', 'Ghost Wolf']},
  SPEC_PLAN: {enh: 'lvl-enhancement', ele: 'lvl-elemental', resto: 'lvl-resto'},
  SPECS: {enh: {label: 'Enhancement', ready: true}, ele: {label: 'Elemental', ready: false}, resto: {label: 'Restoration', ready: false}},
  MACROS: {
    heal: {name: 'Healing Wave on mouseover', code: '#showtooltip Lesser Healing Wave\n/cast [@mouseover,help,nodead][@target,help,nodead][@player] Lesser Healing Wave', note: 'Heals whoever you hover, otherwise your friendly target, otherwise you. Use Healing Wave until 20.'},
    purge: {name: 'Purge on mouseover', code: '#showtooltip Purge\n/cast [@mouseover,harm,nodead][] Purge', note: 'Strips a buff from the enemy you hover, otherwise your target.'}
  },
  extraSpells: {
    'Healing Potion': {form: 'Item', cd: '2 min', lvl: 1, d: 'Restores health.'},
    'Trinket': {form: 'Item', cd: 'Varies', lvl: 1, d: 'Your on-use trinket.'},
    'Mount': {form: 'Item', cd: '', lvl: 10, d: 'Your mount.'}
  },
  PLAN_NOTE: 'The order most players of your spec follow on talentsforever.com while leveling, then a popular level 60 build. Recalculated from what you have trained.',
  WIZ: {
    name: 'Shaman', color: '#2E8BFF',
    roles: [['enh', 'Enhancement', 'Melee with weapon imbues and Stormstrike'], ['ele', 'Elemental', 'Lightning and shocks from range'], ['resto', 'Healer', 'Chain Heal, Riptide and totems']],
    duals: [['resto', 'Healer'], ['enh', 'Enhancement'], ['ele', 'Elemental'], ['pvp', 'PvP'], ['none', 'Not sure yet']],
    states: {normal: ['Spells', 'var(--caster)']},
    kits: {
      enh: {forms: ['normal'], normal: {spam: ['Stormstrike', 'Lightning Bolt'], rot: ['Flame Shock', 'Frost Shock', 'Searing Totem'], short: ['Fire Nova', 'Lightning Shield', 'Purge'], once: ['Rage of the Farseer', 'Call of the Elements'], interrupt: 'Earth Shock', defensive: 'Stoneclaw Totem'}},
      ele: {forms: ['normal'], normal: {spam: ['Lightning Bolt', 'Chain Lightning'], rot: ['Flame Shock', 'Frost Shock', 'Searing Totem'], short: ['Fire Nova', 'Water Shield', 'Purge'], once: ['Lightning Mastery', 'Call of the Elements'], interrupt: 'Earth Shock', defensive: 'Stoneclaw Totem'}},
      resto: {forms: ['normal'], normal: {spam: ['Lesser Healing Wave', 'Healing Wave'], rot: ['Riptide', 'Chain Heal', 'Healing Stream Totem'], short: ['Cure Poison', 'Cure Disease', 'Water Shield'], once: ["Nature's Swiftness", 'Mana Tide Totem'], interrupt: 'Earth Shock', defensive: 'Stoneclaw Totem'}}
    },
    macroLabel(n, macros) {
      if (macros === 'useful' && n === 'Purge') return ['Purge on mouseover', 'purge'];
      return [n, null];
    },
    stance: () => ['Ghost Wolf'],
    long: (race, role, racials) => ['Rockbiter Weapon', 'Flametongue Weapon', 'Windfury Weapon', 'Strength of Earth Totem', 'Mana Spring Totem', 'Tremor Totem', 'Earthbind Totem', 'Grounding Totem', 'Totemic Call', ...racials.slice(0, 1), 'Trinket'],
    travel: null,
    mouse: (race, macros) => ({
      escape: {n: 'Earthbind Totem', base: 'Earthbind Totem', job: 'once'},
      potion: {n: 'Healing Potion', base: 'Healing Potion', job: 'long'},
      heal: macros === 'none' ? {n: 'Lesser Healing Wave', base: 'Lesser Healing Wave', job: 'spam'} : {n: 'Healing Wave on mouseover', base: 'Lesser Healing Wave', job: 'spam', macro: 'heal'},
      interrupt: {n: 'Earth Shock', base: 'Earth Shock', job: 'interrupt'},
      defensive: {n: 'Stoneclaw Totem', base: 'Stoneclaw Totem', job: 'defensive'}
    }),
    spec: role => role === 'ele' ? ['ele', 'Elemental'] : role === 'resto' ? ['resto', 'Restoration'] : ['enh', 'Enhancement'],
    preset(role) {
      if (role === 'ele') return ['Elemental', 'Lightning Mastery and stronger shocks.'];
      if (role === 'resto') return ['Restoration', "Riptide, Mana Tide and Nature's Swiftness."];
      return ['Enhancement', 'Stormstrike and Rage of the Farseer, the most played leveling build.'];
    },
    unbound: [['Hearthstone', '', 'Keep it unbound, you have Astral Recall'], ['Astral Recall', '30', 'A second hearthstone on a 15 min cooldown'], ['Ancestral Spirit', '12', 'Out of combat'], ['Resistance and cleansing totems', '22', 'Put them in your Totem Bar sets'], ['Water Walking and Breathing', '22', 'Click them when needed']]
  },
  FIGHT_HTML: `
    <p class="muted">Each line is one press, top to bottom. Spells show the level you learn them; skip a line until you have it.</p>
    <h3>Rotations</h3>
    <div class="rgrid">
      <div class="rcard" style="--rc:var(--caster)">
        <div class="eyebrow">Enhancement · questing</div>
        <ol class="steps">
          <li>Weapon imbue on, Lightning Shield up.</li>
          <li>Pull with Lightning Bolt, drop Searing Totem as it runs in.</li>
          <li>Stormstrike from 25 with the talent, then Earth Shock or Flame Shock right after it.</li>
          <li>Fire Nova is a spell now in Forever, not a totem: it blasts everything around you on a 10 sec cooldown.</li>
          <li>Rage of the Farseer from 40 with the talent for 30% attack speed.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--bear)">
        <div class="eyebrow">Elemental</div>
        <ol class="steps">
          <li>Flame Shock, then Lightning Bolt. Ranks 4 and up cast in 2.5 sec in Forever.</li>
          <li>Chain Lightning from 32 on two or more targets.</li>
          <li>Frost Shock on runners, Earth Shock to interrupt.</li>
          <li>Lightning Mastery from 40 with the talent: faster Lightning Bolt and no Chain Lightning cooldown.</li>
        </ol>
      </div>
      <div class="rcard" style="--rc:var(--spam)">
        <div class="eyebrow">Healer</div>
        <ol class="steps">
          <li>Totems down with Call of the Elements, which drops up to four totems from your Totem Bar set in one press.</li>
          <li>Riptide on the tank from 40 with the talent: it also boosts your next Chain Heal on them.</li>
          <li>Chain Heal for groups, Lesser Healing Wave for quick saves.</li>
          <li>Water Shield keeps your mana up. Totems last 5 min now, and Totemic Call moves them to you.</li>
        </ol>
      </div>
    </div>
    <h3>PvP</h3>
    <div class="rgrid">
      <details class="pcard" open><summary>Any fight going badly</summary><div class="dbody"><p>Stoneclaw Totem soaks hits, Lesser Healing Wave on yourself, Earthbind Totem and Ghost Wolf to escape.</p></div></details>
      <details class="pcard"><summary>A rogue opens on you</summary><div class="dbody"><p>Earthbind Totem slows them, Poison Cleansing Totem removes their poisons, then Frost Shock and burst.</p></div></details>
      <details class="pcard"><summary>A warrior or melee</summary><div class="dbody"><p>Frost Shock and Earthbind to slow them. Keep Stoneclaw up and heal when they back off.</p></div></details>
      <details class="pcard"><summary>A mage</summary><div class="dbody"><p>Earth Shock the Polymorph or Frostbolt, Grounding Totem eats one spell. Purge their Ice Barrier.</p></div></details>
      <details class="pcard"><summary>A warlock or priest, fears and casters</summary><div class="dbody"><p>Tremor Totem breaks fear, Earth Shock the big cast, Purge their shields and buffs.</p></div></details>
      <details class="pcard"><summary>A hunter or an enemy druid</summary><div class="dbody"><p>Grounding Totem eats a sting or a spell. Earth Shock the druid heals and Purge their buffs.</p></div></details>
      <details class="pcard"><summary>Two or more players</summary><div class="dbody"><p>Fire Nova and Magma Totem, Earthbind them, then Chain Lightning or Chain Heal depending on your spec.</p></div></details>
    </div>
    <p class="muted" style="font-size:13px">Built from Forever's own spell data, read by talentsforever.com from the game files, plus Blizzard's class notes. If something works differently in game, tell us.</p>`
});
