declare module "@discord-player/downloader" {
    import ytdl, { Youtubedl } from "youtube-dl";

    const version: string;
    
    export interface Info {
        title: string;
        duration: number;
        thumbnail: string;
        views: number;
        author: string;
        description: string;
        url: string;
        engine: Youtubedl;
    }

    class Downloader {
        static download(url: string): Youtubedl;
        static getInfo(url: string): Promise<Info>;
        static validate(url: string): boolean;
        static important(): boolean;
    }

    export {
        Downloader,
        ytdl,
        version
    };

}