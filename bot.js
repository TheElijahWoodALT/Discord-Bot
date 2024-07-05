require("dotenv").config();
const {Client, IntentsBitField, ActivityType, messageLink, EmbedBuilder, REST, Routes, ApplicationCommandOptionType } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on('ready', (c) => {
    console.log(`${c.user.tag} is online.`);
    client.user.setActivity({
    name: 'ejs bot',
    type: ActivityType.Playing,
    });
});

const commands = [
  {
    name: "ping",
    description: "Repliys with your ping.",
  },
  {
    name: "embed",
    description: "An embed",
  },
]

const rest = new REST({ version: "10" }).setToken(process.env.token);

(async () => {
  try {
    console.log("Registering global slash commands...");

    await rest.put(
      Routes.applicationCommands(process.env.client_id),
      { body: commands }
    );

    console.log("Global slash commands were registered successfully");
  } catch (error) {
    console.error(`Error registering global slash commands: ${error.message}`);
  }
})();
client.on("interactionCreate", (interaction) => {
    if (!interaction.isChatInputCommand()) return;

if (interaction.commandName = 'ping') {
    const userPing = interaction.createdTimestamp - Date.now();
    const botPing = client.ws.ping;
    
    interaction.reply(`🏓 Pong! Your ping is ${userPing}ms, and the bot's ping is ${botPing}ms.`);
}

if (interaction.commandName = 'embed') {
  const embed = new EmbedBuilder()
  .setTitle('Sup noob')
  .setDescription('You should subscribe to gaeon and ej_gamer19!')
  .setColor("Blurple")

  interaction.reply({ embeds: [embed] })
}

});

client.login(process.env.token);