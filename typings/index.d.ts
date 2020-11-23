declare module "@discord-player/downloader" {
    import ytdl, { Info, Options, Youtubedl } from "youtube-dl";

    const version: string;

    class Downloader {
        static download(url: string, args?: string[], options: { [key: string]: string }): Youtubedl;
        static getInfo(url: string, args?: string[], options: Options): Promise<Info>;
    }

    export {
        Downloader,
        ytdl,
        version
    };

}