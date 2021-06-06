const base64 = require('node-base64-image')
const {
    MessageMedia
} = require('whatsapp-web.js')

module.exports = async(message) => {
    try {
        if (message.hasMedia || message.hasQuotedMsg) {
            let media
                // if (message.hasQuotedMsg) {
                // const quotedMsg = await message.getQuotedMessage()
                // media = await quotedMsg.downloadMedia()
                // } else {
            media = await message.downloadMedia()
                // }
            let search = await got.post('https://trace.moe/api/search', {
                json: {
                    image: media.data
                },
                responseType: 'json'
            })
            search = search.body
            const episode = search.docs[0].episode
            const title_english = search.docs[0].title_english
            const title_romaji = search.docs[0].title_romaji
            const similarity = Math.fround(search.docs[0].similarity * 100).toFixed(2) + '%'

            const blobs = b64toBlob(media.data, media.mimetype)
            console.log('BLOB', blobs)

            return {
                media: `English Title: ${title_english} \nRomanji Title: ${title_romaji} \nEpisode: ${episode} \nSimilarity: ${similarity}`,
                options: {}
            }
        }
    } catch (error) {
        console.log('Error WHATANIME ', error)
        return {
            error: true,
            message: error.message
        }
    }
}