require('dotenv').config();
const { Client, IntentsBitField, ActivityType } = require('discord.js');
const eventHandler = require('./handlers/eventHandler');

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on('ready', (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  client.user.setActivity({
    name: 'Ranii Bot',
    type: ActivityType.Custom
  });

  client.user.setStatus('dnd');
});

eventHandler(client);

client.login(process.env.TOKEN);
