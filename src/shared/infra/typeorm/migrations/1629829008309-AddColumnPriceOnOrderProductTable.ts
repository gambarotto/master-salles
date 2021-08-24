import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddColumnPriceOnOrderProductTable1629829008309
  implements MigrationInterface
{
  name = 'AddColumnPriceOnOrderProductTable1629829008309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_products" ADD "price" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders_products" DROP COLUMN "price"`,
    );
  }
}
