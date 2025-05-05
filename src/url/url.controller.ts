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
    
            return res.status(user.statusCode).json({
                responseCode: user.statusCode,
                responseMessage: user.msg,
                data: user.data,
            });

        } catch (error) {
            let message: string;
            if (error instanceof Error) {
              message = error.message;
            } else {
              message = String(error);
            }

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
    
            return res.status(user.statusCode).json({
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
    
            return res.status(user.statusCode).json({
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

export const urlList = errorMiddleware(
    async (req: Request, res: Response) => {

        const urlService = new UrlService();
    
        try {
            const user = await urlService.urlList();
    
            if (!user.success) {
                return res.status(user.statusCode).json({
                    responseCode: user.statusCode,
                    responseMessage: "Error",
                    message: user.msg,
                });
            }
    
            return res.status(user.statusCode).json({
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

export const redirect = errorMiddleware(
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
            const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
            const userAgent = req.headers["user-agent"] || "Unknown";

            const user = await urlService.redirect(url_path, ip, userAgent);
    
            if (!user.success) {
                return res.status(user.statusCode).json({
                    responseCode: user.statusCode,
                    responseMessage: "Error",
                    message: user.msg,
                });
            }

            if (!user.data) {
                return res.status(user.statusCode).json({
                    responseCode: 500,
                    responseMessage: "Error",
                    message: "something failed",
                });
            }

            return res.redirect(user.data.url);

        } catch (error) {
            return res.status(500).json({
                responseCode: "500",
                responseMessage: "Error",
                message: error,
            });
        }
    }
);