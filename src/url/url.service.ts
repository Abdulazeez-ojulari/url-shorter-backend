import { nanoid } from "nanoid";
import Url from "./url.model";
import { urlMessages } from "./url.helper";

export class UrlService {
    async encodeUrl(longUrl: string) {
        try {

            const shortCode = nanoid(6);
            await Url.create({ longUrl: longUrl, shortCode: shortCode });

            const shortUrl = `http://localhost:3000/${shortCode}`;

                
            return {
            success: true,
            statusCode: 201,
            msg: urlMessages.REQUEST_SUCCESS,
            data: { shortUrl, shortCode, longUrl },
            }
        } catch (error) {
            console.log("error", error)
            return { statusCode: 500, success: false, msg: "Server error" }
        }
    }

    async decodeUrl(shortCode: string) {
        try {

            const url = await Url.findOne({ shortCode });

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
            console.log("error", error)
            return { statusCode: 500, success: false, msg: "Server error" }
        }
    }

    async urlStatistic(shortCode: string) {
        try {

            const url = await Url.findOne({ shortCode });

            if (!url) {
                return { statusCode: 404, success: false, msg: urlMessages.FETCH_ERROR };
            }
                           
            return {
                success: true,
                statusCode: 200,
                msg: urlMessages.FETCH_SUCCESS,
                data: {
                    shortUrl: `http://localhost:3000/${url.shortCode}`,
                    longUrl: url.longUrl,
                    createdAt: url.createdAt,
                    visits: url.visits,
                },
            }
            
        } catch (error) {
            console.log("error", error)
            return { statusCode: 500, success: false, msg: "Server error" }
        }
    }
}