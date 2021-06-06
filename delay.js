const fs = require('fs-extra')
module.exports = (user, cmd, minutes, limit) => {
    let response = {
        delay: false
    }
    const date = new Date()
    const cmdSessionFile = './delay.json'
    if (fs.existsSync(cmdSessionFile)) {
        const sessionData = fs.readJsonSync(cmdSessionFile)
        if (sessionData[user] == undefined) {
            sessionData[user] = {
                [cmd]: {
                    expires: new Date(date.getTime() + (minutes * 60000)).getTime(),
                    attempt: 1
                }
            }
            fs.writeFileSync(cmdSessionFile, JSON.stringify(sessionData))
            console.log('Cek user session : ', sessionData[user])
            console.log('Msg.From : ', user)
        } else if (sessionData[user][cmd] == undefined) {
            sessionData[user][cmd] = {
                expires: new Date(date.getTime() + (minutes * 60000)).getTime(),
                attempt: 1
            }
            fs.writeFileSync(cmdSessionFile, JSON.stringify(sessionData))
            console.log('Cek cmd session.')
        } else {
            if (date.getTime() > sessionData[user][cmd].expires) {
                sessionData[user][cmd].expires = new Date(date.getTime() + (minutes * 60000)).getTime()
                sessionData[user][cmd].attempt = 1
                fs.writeFileSync(cmdSessionFile, JSON.stringify(sessionData))
                console.log('cek apakah expires habis...')
                console.log('expired. expires dan attempt direset')
            } else {
                if (sessionData[user][cmd].attempt >= limit) {
                    const distance = new Date(sessionData[user][cmd].expires).getTime() - date.getTime()
                    const sisaMenit = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
                    const sisaDetik = Math.floor((distance % (1000 * 60)) / 1000)
                    let countdown = `${sisaMenit} menit ${sisaDetik} detik`
                    if (sisaMenit <= 0) {
                        countdown = `${sisaDetik} detik`
                    }
                    response = {
                        delay: true,
                        message: `Command dijeda. Dapat digunakan lagi dalam waktu ${countdown}`
                    }
                    console.log('cek apakah attempt lebih dari tiga')
                } else {
                    sessionData[user][cmd].attempt++
                        fs.writeFileSync(cmdSessionFile, JSON.stringify(sessionData))
                    console.log('menambah attempt ke-' + sessionData[user][cmd].attempt)
                }
            }
        }
    } else {
        userSession = {
            [user]: {
                [cmd]: {
                    expires: new Date(date.getTime() + (minutes * 60000)).getTime(),
                    attempt: 1
                }
            }
        }
        fs.writeFileSync(cmdSessionFile, JSON.stringify(userSession))
    }

    return response
}