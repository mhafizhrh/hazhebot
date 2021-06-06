const botName = process.env.BOT_NAME
const botPrefix = process.env.BOT_PREFIX

module.exports =
    `*${botName} Beta ver.*
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

*[PENTING] Gunakan bot sebijak mungkin.*`