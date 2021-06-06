const got = require('got')
const base64 = require('node-base64-image')
const {
    MessageMedia
} = require('whatsapp-web.js')

module.exports = async(tags) => {
    try {
        if (tags.split(' ').length > 2) {
            return {
                error: true,
                message: `Tidak dapat mencari lebih dari 2 tag sekaligus.`
            }
        } else {
            tags = encodeURI('limit:20+rating:s+') + encodeURI(tags) || ''
            let data = await got(`https://safebooru.donmai.us/posts.json?tags=${tags}`)
            console.log(JSON.parse(data.body))
            data = JSON.parse(data.body)
            if (data.length <= 0) {
                return {
                    error: true,
                    message: `Gambar yang anda cari tidak dapat ditemukan!`
                }
            } else {
                data = data[Math.floor(Math.random() * data.length)]
                const file_url = data.large_file_url
                const fileName = file_url.substr(file_url.lastIndexOf('/') + 1)
                const ext = fileName.substr(fileName.lastIndexOf('.') + 1)
                const b64data = await base64.encode(file_url, {
                    string: true
                })
                const media = new MessageMedia(`image/${ext}`, b64data, fileName)
                return {
                    media: media,
                    options: {
                        sendMediaAsDocument: true
                    }
                }
            }
        }
    } catch (error) {
        console.log(error)
        return {
            error: true,
            message: `Maaf, terjadi kesalahan sistem. Silahkan coba lagi nanti.`
        }
    }
}