const ytdl = require("youtube-dl");

class Downloader {

    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * Downloads stream through youtube-dl
     * @param {string} url URL to download stream from
     * @returns {Youtubedl}
     */
    static download(url) {
        if (!url || typeof url !== "string") throw new Error("Invalid url");

        const stream = ytdl(url, [], {});
        return stream;
    }

    /**
     * Returns stream info
     * @param {string} url stream url
     */
    static getInfo(url) {
        return new Promise((resolve, reject) => {
            if (!url || typeof url !== "string") reject(new Error("Invalid url"));

            ytdl.getInfo(url, (error, info) => {
                if (error) resolve(null);
                const obj = {
                    title: info.fulltitle || info.title || "Attachment",
                    duration: info._duration_raw ? info._duration_raw * 1000 : 0,
                    thumbnail: info.thumbnails ? info.thumbnails[0].url : "https://upload.wikimedia.org/wikipedia/commons/2/2a/ITunes_12.2_logo.png",
                    views: info.view_count || 0,
                    author: info.channel || "YouTubeDL_Media",
                    description: info.description || "",
                    url: url
                };

                Object.defineProperty(obj, "engine", { get: () => Downloader.download(url), enumerable: true });

                resolve(obj);
            });
        });
    }

    static validate(url) {
        const REGEX = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        return REGEX.test(url || "");
    }

    static get important() {
        return true;
    }
}


module.exports = Downloader;