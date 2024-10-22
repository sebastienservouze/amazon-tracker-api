import {Controller, Get} from "@nerisma/express-extended";
import {Request, Response} from "express";
import {ScrappingService} from "../services/Scrapping.service";

@Controller('/discover')
export class DiscoverController {

    constructor(private readonly scrappingService: ScrappingService) {
    }

    @Get('/')
    public async discover(req: Request, res: Response) {
        if (!req.query.url) {
            return res.status(400).json({message: 'URL is required'});
        }

        try {
            const product = await this.scrappingService.discoverProduct(req.query.url as string);
            return res.status(200).json(product);
        } catch (e: any) {
            return res.status(500).json({message: `Error while discovering product: ${e.message}`});
        }
    }

}