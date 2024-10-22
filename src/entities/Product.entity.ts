import {MetadataEntity} from "@nerisma/express-extended";
import {Column, Entity, Index, OneToMany} from "typeorm";
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

    /* Relations */

    @OneToMany(() => PriceChange, priceChange => priceChange.product, {cascade: true})
    priceChanges!: PriceChange[];
}