import {MetadataEntity} from "@nerisma/express-extended";
import {Column, Entity, Index, JoinTable, ManyToMany, OneToMany} from "typeorm";
import {PriceChange} from "./PriceChange.entity";

@Entity()
export class Product extends MetadataEntity {

    @Index({unique: true})
    @Column()
    amazonId!: string;

    @Column()
    name!: string;

    @Column()
    url!: string;

    @Column("decimal", {precision: 10, scale: 2})
    price!: number;

    @Column("decimal", {precision: 10, scale: 2})
    lowestPrice!: number;

    @Column("decimal", {precision: 10, scale: 2})
    averagePrice!: number;

    @Column("decimal", {precision: 10, scale: 2})
    highestPrice!: number;

    @Column()
    lastScan!: Date;

    /* Relations */

    @OneToMany(() => PriceChange, priceChange => priceChange.product, {cascade: true})
    priceChanges!: PriceChange[];

    @ManyToMany(() => Product)
    @JoinTable()
    variants?: Partial<Product>[];
}