import {MetadataEntity} from "@nerisma/express-extended";
import {Product} from "./Product.entity";
import {Column, Entity, ManyToOne} from "typeorm";

@Entity()
export class PriceChange extends MetadataEntity {

    @Column("decimal", {precision: 10, scale: 2})
    oldPrice!: number;

    @Column("decimal", {precision: 10, scale: 2})
    newPrice!: number;

    @ManyToOne(() => Product, product => product.priceChanges)
    product!: Product;
}