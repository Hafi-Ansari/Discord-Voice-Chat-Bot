const axios = require("axios");
const fs = require("fs");
const util = require("util");
const readFile = util.promisify(fs.readFile); // Convert callback-based method to promise-based

const sendVoiceOgg = async (channel_id, discordToken) => {
  const voiceOgg = await readFile("./voice-message.ogg"); // Read the file

  const resp = await axios({
    method: "post",
    url: `https://discord.com/api/v10/channels/${channel_id}/attachments`,
    data: {
      files: [
        {
          file_size: voiceOgg.byteLength, // Use voiceOgg's byteLength
          filename: "voice-message.ogg", 
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
    data: voiceOgg, // Use voiceOgg as data
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
          filename: "voice-message.ogg", 
          uploaded_filename: resp.data.attachments[0].upload_filename,
          duration_secs: 5, // calculate the actual duration of the voice-message.ogg file
          waveform: "FzYACgAAAAAAACQAAAAAAAA=", 
        },
      ],
    },
  });
};

module.exports = sendVoiceOgg; // Export the function
