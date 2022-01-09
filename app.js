const {
    Client,
    MessageMedia
} = require('whatsapp-web.js')
const fs = require('fs-extra')
const qrcode = require('qrcode-terminal')
const express = require('express')
const app = express()
require('dotenv').config()

const port = process.env.PORT || 8080


// wa bot

const sessionFilePath = process.env.SESSION_FILE_PATH
const botPrefix = process.env.BOT_PREFIX
const botName = process.env.BOT_NAME
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
    console.log(`${botName} started`)
    // load apod
    require('./apod')(client)

    // express
    require('./routes')(app, client)

    app.listen(port, () => {
        console.log(`api started on port ${port}`)
    })
})

client.on('message', async (msg) => {
    console.log(msg.from)
    require('./bot')(client, msg)
})

client.initialize()