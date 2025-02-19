module.exports.config = {
  name: "shoti",
  version: "1.0.0",
  credits: "Mark Martinez",
  description: "Generate random tiktok girl videos",
  hasPermssion: 0,
  commandCategory: "other",
  usage: "[shoti]",
  cooldowns: 2,
  dependencies: [],
  usePrefix: false,
};

module.exports.run = async function({ api, event }) {
  const axios = require("axios");
  const request = require('request');
  const fs = require("fs"); 
api.sendMessage(`⏱️ | Sending Shoti Please Wait...`, event.threadID, event.messageID);
  let data = await axios.get('https://random-use-api-production.up.railway.app/shoti');
  var file = fs.createWriteStream(__dirname + "/cache/shoti.mp4");
  var rqs = request(encodeURI(data.data.url));
  console.log('Shoti Downloaded >>> ' + data.data.data)
  rqs.pipe(file);
  console.log(data)
  file.on('finish', () => {
    return api.sendMessage({
      attachment: fs.createReadStream(__dirname + '/cache/shoti.mp4')
    }, event.threadID, event.messageID)
  })
};
