require("dotenv").config({ path: "../.env" });
const Discord = require("discord.js");
const axios = require("axios");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile); // Convert callback-based method to promise-based

const discordToken = process.env.DISCORD_TOKEN;
const specificChannelID = process.env.CHANNEL_ID;

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

const sendSampleOgg = async (channel_id) => {
  const sampleOgg = await readFile("./sample.ogg"); // Read the file

  const resp = await axios({
    method: "post",
    url: `https://discord.com/api/v10/channels/${channel_id}/attachments`,
    data: {
      files: [
        {
          file_size: sampleOgg.byteLength, // Use sampleOgg's byteLength
          filename: "sample.ogg", // Change filename to 'sample.ogg'
          id: "2",
        },
      ],
    },
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bot ${discordToken}`,
    },
  });

  await axios({
    method: "put",
    url: resp.data.attachments[0]?.upload_url,
    data: sampleOgg, // Use sampleOgg as data
  });

  await axios({
    method: "post",
    url: `https://discord.com/api/v10/channels/${channel_id}/messages`,
    headers: {
      "x-super-properties":
        "eyJvcyI6IldpbmRvd3MiLCJjbGllbnRfYnVpbGRfbnVtYmVyIjo5OTk5OTk5fQ==",
      Authorization: `Bot ${discordToken}`,
      "content-type": "application/json",
    },
    data: {
      flags: 8192,
      attachments: [
        {
          id: "0",
          filename: "sample.ogg", // Change filename to 'sample.ogg'
          uploaded_filename: resp.data.attachments[0].upload_filename,
          duration_secs: 4, // You might want to calculate the actual duration of the sample.ogg file
          waveform: "FzYACgAAAAAAACQAAAAAAAA=", // You might want to generate a waveform for the sample.ogg file
        },
      ],
    },
  });
};

Client.on("messageCreate", (message) => {
  if (message.author.bot) return; // Ignore messages from other bots
  if (message.channel.id === specificChannelID && message.content) {
    sendSampleOgg(specificChannelID);
  }
});

Client.login(discordToken);
