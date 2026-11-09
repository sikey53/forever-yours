# Forever Yours

Your WoW Forever sidekick.

A free helper for World of Warcraft: Forever. Answer seven short questions and get a keybind layout built around your hands and your play style, plus your talent tree at your level, Legacy perks, rotations, PvP tips, patch news and where to level next.

Open it: https://sikey53.github.io/forever-yours/

## How it works

`index.html` is the setup. It asks for your character (name, class, race, level), how you play, which keys you can reach, your mouse buttons and a few preferences, then writes a profile.

`app.html` is your page. It reads that profile and shows your bars form by form, with every macro ready to copy, the talent simulator and the rest.

Your setup lives only in your own browser (localStorage). Nothing is sent anywhere. "Copy my setup link" on the Keybinds tab gives you a private link that moves your setup to another device. Treat that link like a save file: anyone who opens it gets your setup.

"Copy my setup for an AI" copies your whole setup as text, so you can paste it into any AI chat and ask about your binds or your next talent point.

## Status

Druid is fully built. Other classes can go through the setup, and their spells come next.

## Data

Game data is kept current by a daily automated check of official Blizzard news and Forever community guides. Talent data comes from [talentsforever.com](https://talentsforever.com) under CC BY 4.0. Leveling routes come from Warcraft Tavern, Outputlag and TopBuilds guides.

Spot something wrong in game? Open an issue.

World of Warcraft is a trademark of Blizzard Entertainment. This is a fan project and is not affiliated with Blizzard.
