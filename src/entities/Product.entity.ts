import {MetadataEntity} from "@nerisma/express-extended";
import {Column, Index, JoinTable, OneToMany, OneToOne} from "typeorm";
import {Tracker} from "./Tracker.entity";


export class Product extends MetadataEntity {

    @Index({unique: true})
    @Column()
    amazonId!: string;

    @Column()
    name!: string;

    /* Relations */

    @OneToOne(() => Tracker, tracker => tracker.product)
    @JoinTable()
    tracker?: Tracker;
}