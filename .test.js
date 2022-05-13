const fs = require("fs-extra");
const { MessageMedia } = require("whatsapp-web.js");
async function execute() {
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

            const media = new MessageMedia(contentType, base64Data, filename);
        });
}

execute();
