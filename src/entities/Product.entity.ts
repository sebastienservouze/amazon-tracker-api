import {MetadataEntity} from "@nerisma/express-extended";
import {Column, Entity, Index, JoinTable, ManyToMany, OneToOne} from "typeorm";
import {Tracker} from "./Tracker.entity";

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

    @OneToOne(() => Tracker, tracker => tracker.product)
    @JoinTable()
    tracker?: Tracker;
}