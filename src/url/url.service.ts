import { nanoid } from "nanoid";
import { UrlDocument } from "./url.interface";
import Url from "./url.model";
import { urlMessages } from "./url.helper";

export class UrlService {
    async encodeUrl(data: UrlDocument) {
        try {

            const shortCode = nanoid(6);
            await Url.create({ longUrl: data.longUrl, shortCode: shortCode });

            const shortUrl = `http://localhost:3000/${shortCode}`;

                
            return {
            success: true,
            statusCode: 201,
            msg: urlMessages.REQUEST_SUCCESS,
            data: { shortUrl, shortCode, longUrl: data.longUrl },
            }
        } catch (error) {
            console.log("error", error)
            return { statusCode: 500, success: false, msg: "Server error" }
        }
    }
}