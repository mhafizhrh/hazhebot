const { Client } = require("whatsapp-web.js");
const WAWebJS = require("whatsapp-web.js");

module.exports = {
    code: "s",
    type: "common",
    isActive: true,
    /**
     *
     * @param {WAWebJS.Message} msg
     * @param {Client} client
     */
    async run(msg, client) {
        let media;

        if (!msg.hasQuotedMsg) {
            if (msg.hasMedia) {
                media = await msg.downloadMedia();
            } else {
                msg.reply("sertakan media");
            }
        }

        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                media = await quotedMsg.downloadMedia();
            } else {
                msg.reply("quote harus berupa media");
            }
        }

        if (media) {
            msg.reply(media, "", {
                sendMediaAsSticker: true,
            });
        }
    },
};
