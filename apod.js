const axios = require('axios')
const base64 = require('node-base64-image')
const {
    MessageMedia
} = require('whatsapp-web.js')
const sleep = require('./helper/sleep')
module.exports = async (client) => {
    let apodUrlSaved = ""
    while (true) {
        // client.sendMessage("6289658542202-1620654594@g.us", "Hazhebot ready.") // id group bot tester
        axios.get('https://api.nasa.gov/planetary/apod?api_key=qdOdkXVe7t6ZDLRrumPsYVlQex4vp0eyA67c9iI6')
            .then(async (res) => {
                data = res.data
                const apodUrl = data.url
                console.log(apodUrlSaved != apodUrl)
                console.log(apodUrlSaved, apodUrl)
                if (apodUrlSaved != apodUrl) {
                    apodUrlSaved = data.url
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
                    const media = new MessageMedia(`${mediaType}/${ext}`, b64data, filename)
                    const groups = [
                        "6281311235966-1529884533@g.us",
                        "6289658542202-1620654594@g.us"
                    ]
                    groups.forEach(chatId => {
                        client.sendMessage(chatId, media, {
                            caption: `*[Astronomy Picture of the Day]* ${data.date} \n\n*${data.title}* \n\n"${data.explanation}" \nCopyright: ${copyright} \n\nMedia HD Url: ${hdurl} \n\nSource: NASA`
                        })
                    });
                }

            })

        await sleep(60 * 1000)
    }
}