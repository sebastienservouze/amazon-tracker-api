import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729624160496 implements MigrationInterface {
    name = 'Migrations1729624160496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_change" DROP COLUMN "oldPrice"`);
        await queryRunner.query(`ALTER TABLE "price_change" ADD "oldPrice" numeric(10,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_change" DROP COLUMN "newPrice"`);
        await queryRunner.query(`ALTER TABLE "price_change" ADD "newPrice" numeric(10,2) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "price_change" DROP COLUMN "newPrice"`);
        await queryRunner.query(`ALTER TABLE "price_change" ADD "newPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "price_change" DROP COLUMN "oldPrice"`);
        await queryRunner.query(`ALTER TABLE "price_change" ADD "oldPrice" integer NOT NULL`);
    }

}
