const botName = process.env.BOT_NAME
const botPrefix = process.env.BOT_PREFIX

const fs = require('fs-extra')

// Packages

module.exports = async(params) => {
    if (fs.existsSync(`./lib/help_${params}.txt`)) {
        const text = fs.readFileSync(`./lib/help_${params}.txt`, `utf8`)
        return {
            message: text
        }
    } else {
        return {
            message: `Command ini belum memiliki panduan`
        }
    }
}