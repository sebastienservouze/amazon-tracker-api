import {MetadataEntity} from "@nerisma/express-extended";
import {Product} from "./Product.entity";
import {Column, Entity, ManyToOne} from "typeorm";

@Entity()
export class PriceChange extends MetadataEntity {

    @Column()
    oldPrice!: number;

    @Column()
    newPrice!: number;

    @ManyToOne(() => Product, product => product.priceChanges)
    product!: Product;
}