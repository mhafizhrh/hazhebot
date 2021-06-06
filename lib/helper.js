require('dotenv').config('./.env')
const got = require('got')
const base64 = require('node-base64-image')

const botName = process.env.BOT_NAME
const botPrefix = process.env.BOT_PREFIX

function info() {
    return `*[ ${botName} ]*
Prefix yang digunakan ${botName} adalah » *${botPrefix}* «
Contoh: *${botPrefix}profile* | *${botPrefix}randpic waifu*

Gunakan *${botPrefix}help [command]* untuk informasi lebih tentang cara menggunakan setiap command.
Contoh: *${botPrefix}help apod*

*》 Command List*
› *info*
› *help*

*» Fitur WhatsApp*
› *mentionme*
› *replyme*
› *delete*

*» Fitur Lain*
› *randpic*
› *sticker*
› *apod*
› *ytmp3*

*[PENTING] Gunakan bot sebijak mungkin.*`
}
exports.info = info()
const anime = async() => {
    try {
        const url = 'https://safebooru.donmai.us/posts/random.json' //'https://api.computerfreaker.cf/v1/anime';
        let gotJson = await got(url)
        gotJson = JSON.parse(gotJson.body)
        const b64data = await base64.encode(gotJson.large_file_url, {
            string: true
        })
        const filename = gotJson.url.substr(gotJson.url.lastIndexOf('/') + 1)
        const ext = filename.substr(filename.lastIndexOf('.') + 1)
        gotJson.b64data = b64data
        gotJson.filename = filename
        gotJson.ext = ext
        return gotJson
    } catch (error) {
        console.log('ANIME Error : ', error)
        return {
            error: true,
            message: error.message
        }
    }
}
exports.anime = anime
const waifu = async() => {
    try {
        const url = 'https://api.waifu.pics/sfw/waifu';
        let gotJson = await got(url)
        gotJson = JSON.parse(gotJson.body)
        const b64data = await base64.encode(gotJson.url, {
            string: true
        })
        const filename = gotJson.url.substr(1 + gotJson.url.lastIndexOf('/'))
        const ext = filename.substr(1 + filename.lastIndexOf('.'))
        gotJson.b64data = b64data
        gotJson.filename = filename
        gotJson.ext = ext
        return gotJson
    } catch (error) {
        console.log('WAIFU Error : ', error)
        return {
            error: true,
            message: error.message
        }
    }
}
exports.waifu = waifu
const neko = async() => {
    try {
        const url = 'https://api.waifu.pics/sfw/neko';
        let gotJson = await got(url)
        gotJson = JSON.parse(gotJson.body)
        const b64data = await base64.encode(gotJson.url, {
            string: true
        })
        const filename = gotJson.url.substr(1 + gotJson.url.lastIndexOf('/'))
        const ext = filename.substr(1 + filename.lastIndexOf('.'))
        gotJson.b64data = b64data
        gotJson.filename = filename
        gotJson.ext = ext
        return gotJson
    } catch (error) {
        console.log('WAIFU Error : ', error)
        return {
            error: true,
            message: error.message
        }
    }
}
exports.neko = neko
const shinobu = async() => {
    try {
        const url = 'https://api.waifu.pics/sfw/shinobu';
        let gotJson = await got(url)
        gotJson = JSON.parse(gotJson.body)
        const b64data = await base64.encode(gotJson.url, {
            string: true
        })
        const filename = gotJson.url.substr(1 + gotJson.url.lastIndexOf('/'))
        const ext = filename.substr(1 + filename.lastIndexOf('.'))
        gotJson.b64data = b64data
        gotJson.filename = filename
        gotJson.ext = ext
        return gotJson
    } catch (error) {
        console.log('WAIFU Error : ', error)
        return {
            error: true,
            message: error.message
        }
    }
}
exports.shinobu = shinobu
const megumin = async() => {
    try {
        const url = 'https://api.waifu.pics/sfw/megumin';
        let gotJson = await got(url)
        gotJson = JSON.parse(gotJson.body)
        const b64data = await base64.encode(gotJson.url, {
            string: true
        })
        const filename = gotJson.url.substr(1 + gotJson.url.lastIndexOf('/'))
        const ext = filename.substr(1 + filename.lastIndexOf('.'))
        gotJson.b64data = b64data
        gotJson.filename = filename
        gotJson.ext = ext
        return gotJson
    } catch (error) {
        console.log('WAIFU Error : ', error)
        return {
            error: true,
            message: error.message
        }
    }
}
exports.megumin = megumin
const apod = async() => {
    try {
        const url = 'https://api.nasa.gov/planetary/apod?api_key=qdOdkXVe7t6ZDLRrumPsYVlQex4vp0eyA67c9iI6'
        let gotJson = await got(url)
        gotJson = JSON.parse(gotJson.body)
        const b64data = await base64.encode(gotJson.url, {
            string: true
        })
        const filename = gotJson.url.substr(gotJson.url.lastIndexOf('/') + 1)
        const ext = filename.substr(filename.lastIndexOf('.') + 1)
        gotJson.b64data = b64data
        gotJson.filename = filename
        gotJson.ext = ext
        return gotJson
    } catch (error) {
        console.log('APOD Error : ', error)
        return {
            error: true,
            message: error.message
        }
    }
}
exports.apod = apod