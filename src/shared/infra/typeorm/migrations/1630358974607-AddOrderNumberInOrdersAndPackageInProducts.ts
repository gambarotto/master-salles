import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddOrderNumberInOrdersAndPackageInProducts1630358974607
  implements MigrationInterface
{
  name = 'AddOrderNumberInOrdersAndPackageInProducts1630358974607';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_phones" DROP CONSTRAINT "FK_6739058db80ec1d314a7a039b0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "orders" ADD "order_number" SERIAL NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "products" ADD "package" character varying`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phones" ADD CONSTRAINT "FK_96bd55026671b792bb3ce699ffd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_phones" DROP CONSTRAINT "FK_96bd55026671b792bb3ce699ffd"`,
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "package"`);
    await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_number"`);
    await queryRunner.query(
      `ALTER TABLE "user_phones" ADD CONSTRAINT "FK_6739058db80ec1d314a7a039b0f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
