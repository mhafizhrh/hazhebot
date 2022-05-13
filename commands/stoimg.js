const { Client } = require("whatsapp-web.js");
const WAWebJS = require("whatsapp-web.js");

module.exports = {
    code: "stoimg",
    type: "common",
    isActive: true,
    /**
     *
     * @param {WAWebJS.Message} msg
     * @param {Client} client
     */
    async run(msg, client) {
        if (msg.hasQuotedMsg) {
            const quotedMsg = await msg.getQuotedMessage();
            if (quotedMsg.hasMedia) {
                const media = await quotedMsg.downloadMedia();
                msg.reply(media);
            } else {
                msg.reply("quote harus berupa media");
            }
        }
    },
};
