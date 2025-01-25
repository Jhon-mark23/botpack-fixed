const axios = require('axios');
const path = require('path');

module.exports.config = {
    name: "shoti2",
    version: "1.0.0",
    hasPermission: 0,
    description: "random video from Shoti API By Lib API",
    usePrefix: true,
    credits: "mark martinez",
    cooldowns: 10,
    commandCategory: "Media",
};

module.exports.run = async function ({ api, event }) {
    try {
        const sending = await api.sendMessage("⏱️ | Sending Shoti Video Please Wait....", event.threadID, event.messageID);
        
        const response = await axios.get('https://random-use-api-production.up.railway.app/shoti');
        const data = response.data;
        const { url, name } = data

             
            const videoStream = await axios({
                url: url,
                method: 'GET',
                responseType: 'stream'
            });
            console.log(url);

            api.unsendMessage(sending.messageID);

            const message = `✅ 𝗦𝘂𝗰𝗰𝗲𝘀𝘀𝗳𝘂𝗹𝗹𝘆 𝗦𝗲𝗻𝘁 𝗦𝗵𝗼𝘁𝗶\n━━━━━━━━━━━━━━━━━━\nName: ${name}\n`;

            api.sendMessage({
                body: message,
                attachment: videoStream
            }, event.threadID, event.messageID);
            console.log(data);

        } else {
            api.sendMessage(data.message, event.threadID, event.messageID);
        }

    } catch (error) {
        console.error('Error fetching video:', error);
        api.sendMessage(error.message, event.threadID, event.messageID);
    }
};
