import {Controller, Get} from "@nerisma/express-extended";
import {Request, Response} from "express";
import {AmazonService} from "../services/Amazon.service";

@Controller('/tracker')
export class TrackerController {

    constructor(private readonly trackerService: AmazonService) {
    }

    @Get('/scan')
    public async scan(req: Request, res: Response) {
        if (!req.query.url) {
            return res.status(400).json({message: 'URL is required'});
        }

        const price = await this.trackerService.scan(req.query.url as string);
        res.status(200).json(price);
    }

}