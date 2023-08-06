const fs = require("fs");
require("dotenv").config({ path: "../.env" });
const Discord = require("discord.js");
const sendSampleOgg = require("./voice-message.js"); // Import the sendSampleOgg function
const axios = require("axios");

const discordToken = process.env.DISCORD_TOKEN;
const specificChannelID = process.env.CHANNEL_ID;
const messageURL = process.env.USER_MESSAGE_URL;

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
    // Sending the user's message to the Flask server
    axios({
      method: "post",
      url: messageURL,
      responseType: "arraybuffer",
      data: { message: message.content },
    })
      .then((response) => {
        const audio = new Uint8Array(response.data);
        fs.writeFileSync("sample.ogg", audio);
        sendSampleOgg(specificChannelID, discordToken);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        message.channel.send("An error occurred while sending the message.");
      });
  }
});

Client.login(discordToken);
