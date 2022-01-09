// const express = require('express')
// const app = express()

const api = '/api'
const whatsapp = api + '/whatsapp'

module.exports = async (app, client) => {
    console.log(whatsapp)
    const savedTarget = []
    app.get(whatsapp, (req, res) => {
        const target = req.query.target || null
        const message = req.query.message || null
        if (target && message) {
            const date = new Date()
            const exp = new Date(savedTarget[target])
            if (savedTarget[target] !== undefined && date.getTime() < exp.getTime()) {
                res.status(400).send({
                    code: 400,
                    status: 'Bad Request',
                    data: {
                        target: target,
                        message: message
                    },
                    errors: {
                        general: exp.getSeconds() - date.getSeconds() + ` seconds delay...`
                    }
                }).end()
            } else {

                savedTarget[target] = date.setSeconds(date.getSeconds() + 5)

                const personalChatSuffix = '@c.us'
                const msgTo = target + personalChatSuffix
                client.sendMessage(msgTo, message)

                res.status(200).send({
                    code: 200,
                    status: 'OK',
                    data: {
                        target: target,
                        message: message
                    },
                    errors: null
                }).end()
            }
        } else {
            res.status(400).send({
                code: 400,
                status: 'Bad Request',
                data: {
                    target: target,
                    message: message
                },
                errors: null
            }).end()
        }
    })
}