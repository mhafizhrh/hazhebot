require('dotenv').config()
const {
    Client,
    MessageMedia
} = require('whatsapp-web.js')
const fs = require('fs-extra')
const qrcode = require('qrcode-terminal')
const axios = require('axios')
const base64 = require('node-base64-image')
const {
    format
} = require('path/posix')

const apodDataFilePath = process.env.APOD_DATA_FILE_PATH
const sessionFilePath = process.env.SESSION_FILE_PATH
const botPrefix = process.env.BOT_PREFIX
let clientSession

if (fs.existsSync(sessionFilePath)) {
    clientSession = require(sessionFilePath)
}
const client = new Client({
    session: clientSession
})

client.on('qr', qr => {
    qrcode.generate(qr, {
        small: true
    });
});

client.on('authenticated', (session) => {
    clientSession = session
    fs.writeFileSync(sessionFilePath, JSON.stringify(session))
})

client.on('ready', () => {
    console.log('Client is ready!');
    ready()
});

async function ready() {
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
                        // "6281311235966-1529884533@g.us",
                        "6289658542202-1620654594@g.us"
                    ]
                    groups.forEach(chatId => {
                        client.sendMessage(chatId, media, {
                            caption: `*[Astronomy Picture of the Day]* ${data.date} \n\n*${data.title}* \n\n"${data.explanation}" \nCopyright: ${copyright} \n\nMedia HD Url: ${hdurl} \n\nSource: NASA`
                        })
                    });
                }

            })

        await sleep(3000)
    }
}
client.on('message', async (msg) => {
    console.log(msg.from)
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
});

client.initialize();

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}