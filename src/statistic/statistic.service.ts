import { UAParser } from "ua-parser-js";
import { statisticMessages } from "./statistic.helper";
import Statistic from "./statistic.model";
var geoip = require('geoip-country');

export class StatisticService {

    async getStatsById(id: any){
        try {

            const statistic = await Statistic.findById(id);

            if (!statistic) {
                return { statusCode: 404, success: false, msg: statisticMessages.FETCH_ERROR };
            }
                                               
            return {
                success: true,
                statusCode: 200,
                msg: statisticMessages.FETCH_SUCCESS,
                data: statistic,
            }
            
        } catch (error) {
            console.log("error", error)
            return { statusCode: 500, success: false, msg: "Server error" }
        }
     
    }

    async createStats() {
        try {

            const stats = new Statistic();

            await stats.save()
                
            return {
                success: true,
                statusCode: 201,
                msg: statisticMessages.REQUEST_SUCCESS,
                data: stats,
            }
        } catch (error) {
            console.log("error", error)
            return { statusCode: 500, success: false, msg: "Server error" }
        }
    }

    async updateStats(id: number, ip: any, userAgent: string){
        try {
            const statistic = await Statistic.findById(id);

            if (!statistic) {
                return { statusCode: 404, success: false, msg: statisticMessages.FETCH_ERROR };
            }

            const parser = new UAParser(userAgent);
            const ua = parser.getResult();
            const osName = ua.os.name || "Unknown OS";
            const browser = ua.browser.name || "Unknown Browser";
            var geo = geoip.lookup(ip);

            const now = new Date();
            const dateStr = now.toISOString().split("T")[0];
            
            let country = "Unknown Country"

            if(geo)
                country = geo.country;
          
            statistic.totalClicks += 1;

            statistic.clicksByDate.set(
                dateStr,
                (statistic.clicksByDate.get(dateStr) || 0) + 1
            );
        
            statistic.countries.set(
                country,
                (statistic.countries.get(country) || 0) + 1
            );
        
            statistic.browsers.set(
                browser,
                (statistic.browsers.get(browser) || 0) + 1
            );

            statistic.os.set(
                osName,
                (statistic.os.get(osName) || 0) + 1
            );

            await statistic.save();
                                     
            return {
                success: true,
                statusCode: 200,
                msg: statisticMessages.FETCH_SUCCESS,
                data: {},
            }
            
        } catch (error) {
            console.log("error", error)
            return { statusCode: 500, success: false, msg: "Server error" }
        }
     
    }
}