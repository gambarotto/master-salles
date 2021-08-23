import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddDeliveryFeeInOrdersTable1628099713987
  implements MigrationInterface
{
  name = 'AddDeliveryFeeInOrdersTable1628099713987';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "delivery_fee" double precision NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "delivery_fee"`);
  }
}
