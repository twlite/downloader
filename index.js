module.exports = {
    Downloader: require("./src/main"),
    ytdl: require("youtube-dl"),
    version: require("./package.json").version
};