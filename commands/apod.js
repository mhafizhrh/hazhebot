const { Client, MessageMedia } = require("whatsapp-web.js");
const WAWebJS = require("whatsapp-web.js");
const axios = require("axios").default;

module.exports = {
    code: "apod",
    type: "common",
    isActive: true,
    /**
     *
     * @param {WAWebJS.Message} msg
     * @param {Client} client
     */
    async run(msg, client) {
        const chat = await msg.getChat();
        const axios = require("axios").default;
        const url =
            "https://api.nasa.gov/planetary/apod?api_key=qdOdkXVe7t6ZDLRrumPsYVlQex4vp0eyA67c9iI6";
        const data = await axios.get(url);
        // console.log(data.data);
        axios
            .get(data.data.url, {
                responseType: "arraybuffer",
            })
            .then((res) => {
                const contentType = res.headers["content-type"];
                console.log("content type", contentType);
                const filename = data.data.url.substr(
                    data.data.url.lastIndexOf("/") + 1
                );

                const base64Data = Buffer.from(res.data, "binary").toString(
                    "base64"
                );

                const media = new MessageMedia(
                    contentType,
                    base64Data,
                    filename
                );

                console.log(chat);

                client.sendMessage(chat.id._serialized, media, {
                    caption: `*[Astronomy Picture of the Day]* ${data.data.date} \n\n*${data.data.title}* \n\n"${data.data.explanation}" \nCopyright: ${data.data.copyright} \n\nMedia HD Url: ${data.data.hdurl} \n\nSource: NASA`,
                });
            });
    },
};
