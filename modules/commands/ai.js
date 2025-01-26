const axios = require('axios');

module.exports.config = {
    name: "ai",
    hasPermssion: 0,
    version: "1.0.0",
    credits: "mark martinez",
    description: "EDUCATIONAL",
    usePrefix: false,
    commandCategory: "AI",
    usages: "[question]",
    cooldowns: 5,
};

module.exports.handleReply = async function ({ api, event, handleReply }) {
    const { messageID, threadID } = event;
    const id = event.senderID;

    const apiUrl = `https://rest-api-bot-3wqb.onrender.com/api/chatgpt?query=${encodeURIComponent(event.body)}`;

    try {
        const lad = await api.sendMessage("🔎 Searching for an answer. Please wait...", threadID, messageID);
        const response = await axios.get(apiUrl);
        const gogo = response.data.response;

        const responseMessage = `𝗖𝗛𝗔𝗧𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━━\n${gogo}\n━━━━━━━━━━━━━━━━\n`;


        api.editMessage(responseMessage, lad.messageID, threadID, messageID);
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", threadID, messageID);
    }
};

module.exports.run = async function ({ api, event, args }) {
    const { messageID, threadID } = event;
    const id = event.senderID;

    if (!args[0]) return api.sendMessage("Please provide your question.\n\nExample: ai what is the solar system?", threadID, messageID);

    const apiUrl = `https://rest-api-bot-3wqb.onrender.com/api/chatgpt?query=${encodeURIComponent(args.join(" "))}`;

    const lad = await api.sendMessage("🔎 Searching for an answer. Please wait...", threadID, messageID);

    try {
        if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0]) {
            const attachment = event.messageReply.attachments[0];

            if (attachment.type === "photo") {
                const imageURL = attachment.url;

                const geminiUrl = `https://kaiz-apis.gleeze.com/api/gemini-vision?q=${encodeURIComponent(args.join(" "))}&uid=123&imageUrl=${encodeURIComponent(imageURL)}`;
                const response = await axios.get(geminiUrl);
                const bobo = response.data.response;

                if (bobo) {
                    return api.editMessage(`𝗚𝗲𝗺𝗶𝗻𝗶 𝗩𝗶𝘀𝗶𝗼𝗻 𝗜𝗺𝗮𝗴𝗲 𝗥𝗲𝗰𝗼𝗴𝗻𝗶𝘁𝗶𝗼𝗻 \n━━━━━━━━━━━━━━━━\n${bobo}\n━━━━━━━━━━━━━━━━\n`, lad.messageID, event.threadID, event.messageID);
                } else {
                    return api.sendMessage("🤖 Failed to recognize the image.", threadID, messageID);
                }
            }
        }

        const response = await axios.get(apiUrl);
        const gogo = response.data.response;

        const responseMessage = `𝗖𝗛𝗔𝗧𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━\n${gogo}\n━━━━━━━━━━━━━━━━`;
        api.editMessage(responseMessage, lad.messageID, event.threadID, event.messageID);
        global.client.handleReply.push({
            name: this.config.name,
            messageID: lad.messageID,
            author: event.senderID
        });
    } catch (error) {
        console.error(error);
        api.sendMessage("An error occurred while processing your request.", threadID, messageID);
    }
};
