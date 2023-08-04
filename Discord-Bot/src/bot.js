require("dotenv").config({ path: "../.env" });
const Discord = require("discord.js");
const discordToken = process.env.DISCORD_TOKEN;
const specificChannelID = process.env.CHANNEL_ID

const Client = new Discord.Client({
  intents: [
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.MessageContent,
    Discord.GatewayIntentBits.Guilds,
  ],
  partials: [
    Discord.Partials.Message,
    Discord.Partials.Channel,
    Discord.Partials.GuildMember,
    Discord.Partials.User,
    Discord.Partials.GuildScheduledEvent,
  ],
});

Client.on("ready", () => {
  console.log(`Logged in as ${Client.user.tag}!`);
});

Client.on("messageCreate", (message) => {
  if (message.author.bot) return; // Ignore messages from other bots
  if (message.channel.id === specificChannelID && message.content) {
    // Respond to any message with 'Hello World' in the specific channel
    message.channel.send("Hello World");
  }
});

Client.login(discordToken);
