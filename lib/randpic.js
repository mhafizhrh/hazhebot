const botName = process.env.BOT_NAME
const botPrefix = process.env.BOT_PREFIX

// Packages
const got = require('got')
const base64 = require('node-base64-image')
const {
    MessageMedia
} = require('whatsapp-web.js')

module.exports = async(tag) => {
    try {
        let data
        let file_url
        switch (tag) {
            case 'anime':
                data = await got('https://safebooru.donmai.us/posts/random.json')
                data = JSON.parse(data.body)
                file_url = data.file_url
                break
            case 'waifu':
                data = await got('https://api.waifu.pics/sfw/waifu')
                data = JSON.parse(data.body)
                file_url = data.url
                break
            case 'neko':
                data = await got('https://api.waifu.pics/sfw/neko')
                data = JSON.parse(data.body)
                file_url = data.url
                break
            case 'shinobu':
                data = await got('https://api.waifu.pics/sfw/shinobu')
                data = JSON.parse(data.body)
                file_url = data.url
                break
            case 'megumin':
                data = await got('https://api.waifu.pics/sfw/megumin')
                data = JSON.parse(data.body)
                file_url = data.url
            default:
                data = await got('https://safebooru.donmai.us/posts/random.json')
                data = JSON.parse(data.body)
                file_url = data.file_url
        }
        const b64data = await base64.encode(file_url, {
            string: true
        })
        const filename = file_url.substr(file_url.lastIndexOf('/') + 1)
        const ext = filename.substr(filename.lastIndexOf('.') + 1)
        const source = data.source == undefined ? '-' : data.source
        return {
            media: new MessageMedia(`image/${ext}`, b64data, filename),
            options: {
                caption: `Source: ${source}`
            }
        }
    } catch (error) {
        console.log('RANDPIC Error : ', error)
        return {
            error: true,
            message: `Maaf, terjadi kesalahan sistem. Silahkan coba lagi nanti.`
        }
    }
}