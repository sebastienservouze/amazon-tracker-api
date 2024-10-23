import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1729716618048 implements MigrationInterface {
    name = 'Migrations1729716618048'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variants_product" DROP CONSTRAINT "FK_8c79256e1773bd9c18b82b3800b"`);
        await queryRunner.query(`ALTER TABLE "product_variants_product" ADD CONSTRAINT "FK_8c79256e1773bd9c18b82b3800b" FOREIGN KEY ("productId_2") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_variants_product" DROP CONSTRAINT "FK_8c79256e1773bd9c18b82b3800b"`);
        await queryRunner.query(`ALTER TABLE "product_variants_product" ADD CONSTRAINT "FK_8c79256e1773bd9c18b82b3800b" FOREIGN KEY ("productId_2") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
