import { nanoid } from "nanoid";
import Url from "./url.model";
import { urlMessages } from "./url.helper";
import { StatisticService } from "../statistic/statistic.service";

export class UrlService extends StatisticService {
    async encodeUrl(longUrl: string) {
        try {

            const shortCode = nanoid(6);
            
            const statsRes = await this.createStats()

            if (!statsRes.success && !statsRes.data) {
                return { statusCode: statsRes.statusCode , success: false, msg: statsRes.msg };
            }

            const shortUrl = `${process.env.SHORTER_BASE_URL}/${shortCode}`;

            await Url.create({ longUrl: longUrl, shortCode: shortCode, shortUrl: shortUrl, stats: statsRes.data?.id});
            
            return {
            success: true,
            statusCode: 201,
            msg: urlMessages.REQUEST_SUCCESS,
            data: { shortUrl, shortCode, longUrl },
            }
        } catch (error) {
            let message: string;
            if (error instanceof Error) {
              message = error.message;
            } else {
              message = String(error);
            }
            return { statusCode: 500, success: false, msg: message }
        }
    }

    async decodeUrl(shortCode: string) {
        try {

            const url = await Url.findOne({ shortCode }).select("id longUrl");

            if (!url) {
                return { statusCode: 404, success: false, msg: urlMessages.FETCH_ERROR };
            }

                           
            return {
                success: true,
                statusCode: 200,
                msg: urlMessages.FETCH_SUCCESS,
                data: { longUrl: url.longUrl },
            }

        } catch (error) {
            let message: string;
            if (error instanceof Error) {
              message = error.message;
            } else {
              message = String(error);
            }
            return { statusCode: 500, success: false, msg: message }
        }
    }

    async urlStatistic(shortCode: string) {
        try {

            const url = await Url.findOne({ shortCode }).populate("stats").exec();

            if (!url) {
                return { statusCode: 404, success: false, msg: urlMessages.FETCH_ERROR };
            }
                           
            return {
                success: true,
                statusCode: 200,
                msg: urlMessages.FETCH_SUCCESS,
                data: {
                    shortUrl: `${process.env.SHORTER_BASE_URL}/${url.shortCode}`,
                    shortCode: url.shortCode,
                    longUrl: url.longUrl,
                    createdAt: url.createdAt,
                    statistic: url.stats,
                },
            }
            
        } catch (error) {
            let message: string;
            if (error instanceof Error) {
              message = error.message;
            } else {
              message = String(error);
            }
            return { statusCode: 500, success: false, msg: message }
        }
    }

    async urlList() {
        try {

            // would have refactored this and add paggination 
            const urls = await Url.find().sort({ createdAt: -1 }).select("id shortCode longUrl shortUrl status createdAt").populate("stats", "totalClicks");

            if (!urls) {
                return { statusCode: 404, success: false, msg: urlMessages.FETCH_ERROR };
            }
                           
            return {
                success: true,
                statusCode: 200,
                msg: urlMessages.FETCH_SUCCESS,
                data: {urls},
            }
            
        } catch (error) {
            let message: string;
            if (error instanceof Error) {
              message = error.message;
            } else {
              message = String(error);
            }
            return { statusCode: 500, success: false, msg: message }
        }
    }

    async redirect(shortCode: string, ip: any, userAgent: any){
        try {

            const url = await Url.findOne({ shortCode }).select("id stats longUrl");

            if (!url) {
                return { statusCode: 404, success: false, msg: urlMessages.FETCH_ERROR };
            }

            let stats = await this.getStatsById(url.stats);

            if(!stats.success && !stats.data){
                stats = await this.createStats()
                url.stats = stats.data?.id 
                await url.save();
            }

            await this.updateStats(stats.data?.id, ip, userAgent);
                                     
            return {
                success: true,
                statusCode: 200,
                msg: urlMessages.FETCH_SUCCESS,
                data: {url: url.longUrl},
            }
            
        } catch (error) {
            let message: string;
            if (error instanceof Error) {
              message = error.message;
            } else {
              message = String(error);
            }
            return { statusCode: 500, success: false, msg: message }
        }
     
    }
}