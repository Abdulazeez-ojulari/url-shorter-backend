import errorMiddleware from "../middlewares/error";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { UrlService } from "./url.service";

export const encodeUrl = errorMiddleware(
    async (req: Request, res: Response) => {
        const { longUrl } = req.body;

        const urlService = new UrlService();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
            responseCode: "400",
            responseMessage: "Bad request",
            data: errors.array(),
            });
        }
    
        try {
            const user = await urlService.encodeUrl(longUrl);
    
            if (!user.success) {
                return res.status(user.statusCode).json({
                    responseCode: user.statusCode,
                    responseMessage: "Error",
                    message: user.msg,
                });
            }
    
            return res.status(200).json({
                responseCode: user.statusCode,
                responseMessage: user.msg,
                data: user.data,
            });

        } catch (error) {
            return res.status(500).json({
                responseCode: "500",
                responseMessage: "Error",
                message: error,
            });
        }
    }
);

export const decodeUrl = errorMiddleware(
    async (req: Request, res: Response) => {
        const { shortCode } = req.body;

        const urlService = new UrlService();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
            responseCode: "400",
            responseMessage: "Bad request",
            data: errors.array(),
            });
        }
    
        try {
            const user = await urlService.decodeUrl(shortCode);
    
            if (!user.success) {
                return res.status(user.statusCode).json({
                    responseCode: user.statusCode,
                    responseMessage: "Error",
                    message: user.msg,
                });
            }
    
            return res.status(200).json({
                responseCode: user.statusCode,
                responseMessage: user.msg,
                data: user.data,
            });

        } catch (error) {
            return res.status(500).json({
                responseCode: "500",
                responseMessage: "Error",
                message: error,
            });
        }
    }
);

export const urlStatistic = errorMiddleware(
    async (req: Request, res: Response) => {
        const { url_path } = req.params;

        const urlService = new UrlService();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
            responseCode: "400",
            responseMessage: "Bad request",
            data: errors.array(),
            });
        }
    
        try {
            const user = await urlService.urlStatistic(url_path);
    
            if (!user.success) {
                return res.status(user.statusCode).json({
                    responseCode: user.statusCode,
                    responseMessage: "Error",
                    message: user.msg,
                });
            }
    
            return res.status(200).json({
                responseCode: user.statusCode,
                responseMessage: user.msg,
                data: user.data,
            });

        } catch (error) {
            return res.status(500).json({
                responseCode: "500",
                responseMessage: "Error",
                message: error,
            });
        }
    }
);