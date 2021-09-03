require('dotenv').config('./.env')
const botName = process.env.BOT_NAME
const botPrefix = process.env.BOT_PREFIX
const qrcode = require('qrcode-terminal')
const fs = require('fs-extra')
const ffmpeg = require('ffmpeg-cli')
const {
    Client
} = require('whatsapp-web.js')
const commands = require('./commands')
const delay = require('./delay')
let clientSession
const clientSessionPath = './client-session.json'
if (fs.existsSync(clientSessionPath)) {
    clientSession = require(clientSessionPath)
}
const client = new Client({
    puppeteer: {
        executablePath: '/opt/google/chrome/google-chrome'
    },
    session: clientSession,
    ffmpegPath: ffmpeg.path
})
client.on('qr', qr => {
    // Generate and scan this code with your phone
    console.log('QR RECEIVED')
    qrcode.generate(qr, {
        small: true
    })
})
client.on('authenticated', session => {
    console.log('Authenticated...')
    fs.writeFileSync(clientSessionPath, JSON.stringify(session))
})
client.on('ready', () => {
    console.log(`${botName} is ready`)

})
client.on('message', message => {
    if (message.body == '!ping') {
        message.reply('pong')
    }
    if (message.body.toLowerCase().startsWith(botPrefix)) {
        commands(client, message)
    }
})
client.initialize()