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
        let data = await got('https://api.nasa.gov/planetary/apod?api_key=qdOdkXVe7t6ZDLRrumPsYVlQex4vp0eyA67c9iI6')
        data = JSON.parse(data.body)
        const file_url = data.url
        const b64data = await base64.encode(file_url, {
            string: true
        })
        const filename = file_url.substr(file_url.lastIndexOf('/') + 1)
        const ext = filename.substr(filename.lastIndexOf('.') + 1)
        const copyright = data.copyright || ''
        const date = data.date
        const explanation = data.explanation
        const hdurl = data.hdurl
        const mediaType = data.media_type
        data
        return {
            media: new MessageMedia(`${mediaType}/${ext}`, b64data, filename),
            options: {
                caption: `*[Astronomy Picture of the Day]* ${data.date} \n\n*${data.title}* \n\n"${data.explanation}" \nCopyright: ${copyright} \n\nMedia HD Url: ${hdurl} \n\nSource: NASA`
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