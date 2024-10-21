import {Controller, Get} from "@nerisma/express-extended";
import {Request, Response} from "express";
import {TrackerService} from "../services/Tracker.service";

@Controller('/tracker')
export class TrackerController {

    constructor(private readonly trackerService: TrackerService) {
    }

    @Get('/discover')
    public async discover(req: Request, res: Response) {
        if (!req.query.url) {
            return res.status(400).json({message: 'URL is required'});
        }

        const price = await this.trackerService.discover(req.query.url as string);
        res.status(200).json(price);
    }

}