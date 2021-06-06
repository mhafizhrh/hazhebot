const unicode = require('./emoji_unicode.json')

module.exports = emoji = (shortname) => {
    return String.fromCodePoint(parseInt(unicode[shortname], 16))
}