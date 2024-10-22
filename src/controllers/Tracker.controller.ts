import {Controller, Get, Post} from "@nerisma/express-extended";
import {Request, Response} from "express";
import {ScrappingService} from "../services/Scrapping.service";
import {ProductService} from "../services/Product.service";
import {ProductDiscovery} from "../models/ProductDiscovery.model";
import {Product} from "../entities/Product.entity";
import {PriceChange} from "../entities/PriceChange.entity";

@Controller('/tracker')
export class TrackerController {

    constructor(private readonly scrappingService: ScrappingService,
                private readonly productService: ProductService) {
    }

    @Get('/discover')
    public async discover(req: Request, res: Response) {
        if (!req.query.url) {
            return res.status(400).json({message: 'URL is required'});
        }

        try {
            const product = await this.scrappingService.discover(req.query.url as string);
            return res.status(200).json(product);
        } catch (e: any) {
            return res.status(500).json({message: `Error while discovering product: ${e.message}`});
        }
    }

    @Post('/track')
    public async track(req: Request, res: Response): Promise<Product[] | any> {
        if (!req.body) {
            return res.status(400)
                      .json({message: 'Body is required'});
        }

        if (!Array.isArray(req.body)) {
            return res.status(400)
                      .json({message: 'Invalid body'});
        }

        const discoveries = req.body as ProductDiscovery[];

        for (const discovery of discoveries) {
            if (discovery.price) {
                continue;
            }

            try {
                const product = await this.scrappingService.discover(discovery.url);
                discovery.price = product[0].price;
            } catch (e: any) {
                return res.status(500)
                          .json({message: `Error while discovering product: ${e.message}`});
            }
        }

        const products = this.getProductsFromDiscovery(discoveries);

        try {
            const result = await this.productService.createMany(products);
            return res.status(201)
                      .json(result);
        } catch (e: any) {
            return res.status(500)
                      .json({message: `Error while tracking product: ${e.message}`});
        }
    }

    private getProductFromDiscovery(product: ProductDiscovery): Product {
        const newProduct = new Product();
        newProduct.amazonId = product.amazonId;
        newProduct.name = product.name;
        newProduct.url = product.url;

        const priceChange = new PriceChange();
        priceChange.oldPrice = product.price!;
        priceChange.newPrice = product.price!;

        newProduct.priceChanges = [priceChange];

        return newProduct;
    }

    private getProductsFromDiscovery(discoveries: ProductDiscovery[]): Product[] {
        return discoveries.map(discovery => this.getProductFromDiscovery(discovery));
    }
}