const botName = process.env.BOT_NAME
const botPrefix = process.env.BOT_PREFIX

// Packages
const got = require('got')
const base64 = require('node-base64-image')
const {
    MessageMedia
} = require('whatsapp-web.js')

module.exports = async(message) => {
    try {
        if (message.hasQuotedMsg) {
            const quotedMsg = await message.getQuotedMessage()
            if (quotedMsg.hasMedia) {
                const media = await quotedMsg.downloadMedia()
                return {
                    media: media,
                    options: {
                        sendMediaAsSticker: true
                    }
                }
            } else {
                return {
                    error: true,
                    message: `Tolong sertakan media!`
                }
            }
        } else {
            if (message.hasMedia) {
                const media = await message.downloadMedia()
                return {
                    media: media,
                    options: {
                        sendMediaAsSticker: true
                    }
                }
            } else {
                return {
                    error: true,
                    message: `Tolong sertakan media!`
                }
            }
        }
    } catch (error) {
        console.log('RANDPIC Error : ', error)
        return {
            error: true,
            message: `Maaf, terjadi kesalahan sistem. \nSertakan media atau reply/balas pesan yang berisi media (media berupa dokumen tidak akan terbaca). \nSilahkan coba lagi nanti.`
        }
    }
}