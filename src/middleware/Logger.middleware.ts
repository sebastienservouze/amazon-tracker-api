import {logger} from "../logger/Logger";
import {NextFunction, Request, Response} from "express";

export abstract class LoggerMiddleware {
    public static logError(err: Error, req: Request, res: Response, next: NextFunction) {
        logger.error(err.message);
        next(err);
    }

    public static logResponse(req: Request, res: Response, next: NextFunction) {
        res.on('finish', () => {
            if (res.statusCode === 200 || res.statusCode === 201) {
                logger.info(`[${req.method}] ${req.url} [${res.statusCode}]`);
            } else {
                logger.error(`[${req.method}] ${req.url} [${res.statusCode}]`);
            }
        });
        next();
    }
}