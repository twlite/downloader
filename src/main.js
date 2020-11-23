const ytdl = require("youtube-dl");

class Downloader {

    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }

    /**
     * Downloads stream through youtube-dl
     * @param {string} url URL to download stream from
     * @param {string[]} args YTDL args
     * @param {object} options YTDL options
     * @returns {Youtubedl}
     */
    static download(url, args, options) {
        if (!url || typeof url !== "string") throw new Error("Invalid url");
        if (!args || !Array.isArray(args) || !args.length) args = [];
        if (args.length && args.some(x => typeof x !== "string")) throw new Error("Invalid ytdl args");
        if (typeof options !== "object") options = {};
        const stream = ytdl(url, args, options);
        return stream;
    }

    /**
     * Returns stream info
     * @param {string} url stream url
     * @param {string[]} args ytdl args
     * @param {YTDLOptions} options ytdl options
     */
    static getInfo(url, args, options) {
        return new Promise((resolve, reject) => {
            if (!url || typeof url !== "string") reject(new Error("Invalid url"));
            if (!args || !Array.isArray(args) || !args.length) args = [];
            if (args.length && args.some(x => typeof x !== "string")) reject(new Error("Invalid ytdl args"));
            if (typeof options !== "object") options = {};

            ytdl.getInfo(url, args, options, (error, info) => {
                if (error) reject(error);
                resolve(info);
            });
        });
    }
}


module.exports = Downloader;