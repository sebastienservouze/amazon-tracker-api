import {Column, Entity, JoinTable, ManyToMany} from "typeorm";
import {AuthRole} from "../enums/AuthRole.enum";
import {MetadataEntity} from "@nerisma/express-extended";
import {Product} from "./Product.entity";


@Entity()
export class User extends MetadataEntity {

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({default: AuthRole.GUEST})
    role!: string;

    /* Relations */

    @ManyToMany(() => Product)
    @JoinTable()
    products?: Product[];
}