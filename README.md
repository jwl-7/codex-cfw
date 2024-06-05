# codex-cfw
CloudFlare Worker Discord bot

<img src="banner.webp" width="768" height="463">

## Commands
- **.8ball** - Ask the Magic 8-Ball.
- **.audiophile** - Generate hipster audio jargon.
- **.coin** - Flip a coin.
- **.corporate** - Generate corporate bulls**t.
- **.csjoke** - Random programming joke.
- **.dice** - Roll 2 dice.
- **.dog** - Random doggo image.
- **.education** - Generate educational nonsense.
- **.excuse** - Generate the perfect excuse.
- **.fliptext** *\<text>* - Flip text upside down/backwards.
- **.joke** - Random dad joke.
- **.lmddgtfy** *\<search>* - Create LMDDGTFY link.
- **.slots** - Play fruit emojis slot machine.
- **.spongetext** *\<text>* - Convert text to sPoNgEbOb mOcKiNg tExT.
- **.technology** - Generate hollywood tech jargon.
- **.wisdom** - Generate deepak chopra quote.

## Dev Stuff

### Setup environment
Copy `example.env` -> `.env` and define variables

### Register commands
```
npm run register
```

### Deploy to CloudFlare
```
npm run publish
```

### Run server
```
npm start
```

### Run ngrok
```
npm run ngrok
```

### Setup ngrok endpoint
Set `Interactions Endpoint URL` on Discord application settings to `Forwarding` URL in ngrok
