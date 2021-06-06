// Packages
const fs = require('fs-extra')
    // Client Library
const delay = require('./delay')
const info = require('./lib/info')
const help = require('./lib/help')
const randpic = require('./lib/randpic')
const sticker = require('./lib/sticker')
const apod = require('./lib/apod')
const whatanime = require('./lib/whatanime')
const safebooru = require('./lib/safebooru')
module.exports = commands = async(client, message) => {
    try {
        console.log('Commands.js : ', message.body)
        client.sendMessage(message.from, `Ok...`)
        const {
            clientInfo
        } = client
        const {
            ack,
            author,
            body,
            broadcast,
            from,
            fromMe,
            hasMedia,
            hasQuotedMsg,
            id,
            isForwarded,
            isStarred,
            isStatus,
            links,
            location,
            mediaKey,
            mentionedIds,
            timestamp,
            to,
            type,
            vCards
        } = message
        const chat = message.getChat()
        const botName = process.env.BOT_NAME
        const botPrefix = process.env.BOT_PREFIX
        const command = body.toLowerCase().split(' ')[0].substr(botPrefix.length) || ''
        const params = body.toLowerCase().substr(command.length + botPrefix.length + 1) || ''
        let response
        switch (command) {
            case 'info':
                // client.sendMessage(from, `*[ ${command.toUpperCase()} ]* \n${info}`)
                const textInfo = fs.readFileSync('./lib/info.txt', 'utf8')
                client.sendMessage(from, `${textInfo}`)
                break
            case 'updateinfo':
                if (hasQuotedMsg && params === '1234') {
                    const quotedMsg = await message.getQuotedMessage()
                    fs.writeFileSync('./lib/info.txt', quotedMsg.body)
                    client.sendMessage(from, 'Info telah diperbarui.')
                }
                break
            case 'help':
                response = await help(params)
                console.log(response)
                client.sendMessage(from, response.message)
                break
            case 'updatehelp':
                if (hasQuotedMsg && params.split(' ')[1] === '1234') {
                    const quotedMsg = await message.getQuotedMessage()
                    fs.writeFileSync(`./lib/help_${params.split(' ')[0]}.txt`, quotedMsg.body)
                    client.sendMessage(from, `Deskripsi [ ${params.split(' ')[0]} ] telah diperbarui.`)
                }
                break
            case 'mentionme':
                const contact = await message.getContact()
                client.sendMessage(from, `*[ ${command.toUpperCase()} ]* \nHalo @${contact.id.user}`, {
                    mentions: [contact]
                })
                break
            case 'replyme':
                message.reply(`*[ ${command.toUpperCase()} ]* \nPesan balasan oleh ${botName}`)
                break
            case 'delete':
                if (message.hasQuotedMsg) {
                    const quotedMsg = await message.getQuotedMessage()
                    if (quotedMsg.fromMe) {
                        quotedMsg.delete(true)
                    } else {
                        client.sendMessage(from, `Hanya bisa menghapus pesan yang dikirim oleh bot ini.`)
                    }
                }
                break
            case 'randpic':
                response = await randpic(params)
                if (response.error) {
                    client.sendMessage(from, response.message)
                } else {
                    client.sendMessage(from, response.media, {
                        sendMediaAsDocument: true
                    })
                    client.on('media_uploaded', (message) => {
                        message.reply(response.options.caption)
                    })
                }
                break
            case 'sticker':
                response = await sticker(message)
                if (response.error) {
                    client.sendMessage(from, response.message)
                } else {
                    client.sendMessage(from, response.media, response.options)
                }
                break
            case 'apod':
                response = await apod()
                if (response.error) {
                    client.sendMessage(from, response.message)
                } else {
                    client.sendMessage(from, response.media, response.options)
                }
            case 'whatanime':
                if (chat.isGroup) {
                    client.sendMessage(from, `Command tidak dapat digunakan dalam grup.`)
                } else {
                    response = await whatanime(message)
                    if (response.error) {
                        client.sendMessage(from, response.message)
                    } else {
                        client.sendMessage(from, response.media, response.options)
                    }
                }
                break
            case 'safebooru':
                response = await safebooru(params)
                if (response.error) {
                    client.sendMessage(from, response.message)
                } else {
                    const delayUser = delay(message.from, command, 1, 1)
                    if (delayUser.delay) {
                        client.sendMessage(from, delayUser.message)
                    } else {
                        client.sendMessage(from, response.media, response.options)
                    }
                }
                break
        }
    } catch (err) {
        console.log('Commands error: ', err)
    }
}