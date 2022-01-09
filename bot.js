const botPrefix = process.env.BOT_PREFIX
module.exports = async (client, msg) => {
    if (msg.body.startsWith(botPrefix)) {
        switch (msg.body.toLowerCase().substring(1)) {
            case 'ping':
                msg.reply('pong')
                break
            case 'sticker':
                client.sendMessage(msg.from, `Media sedang diunduh...`)
                const media = await msg.downloadMedia()
                client.sendMessage(msg.from, media, {
                    sendMediaAsSticker: true
                })
                break
        }
    }
}