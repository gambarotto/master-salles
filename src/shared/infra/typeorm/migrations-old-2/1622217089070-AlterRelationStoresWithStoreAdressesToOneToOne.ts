import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterRelationStoresWithStoreAdressesToOneToOne1622217089070
  implements MigrationInterface
{
  name = 'AlterRelationStoresWithStoreAdressesToOneToOne1622217089070';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" DROP CONSTRAINT "FK_9f6dee30c243dcacd3c60d992ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" ADD CONSTRAINT "UQ_9f6dee30c243dcacd3c60d992ef" UNIQUE ("store_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "userAdresses" DROP CONSTRAINT "FK_5e7fe1e71238b40f3b97e24fbd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userAdresses" ALTER COLUMN "user_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" ADD CONSTRAINT "FK_9f6dee30c243dcacd3c60d992ef" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "userAdresses" ADD CONSTRAINT "FK_5e7fe1e71238b40f3b97e24fbd7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userAdresses" DROP CONSTRAINT "FK_5e7fe1e71238b40f3b97e24fbd7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" DROP CONSTRAINT "FK_9f6dee30c243dcacd3c60d992ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "userAdresses" ALTER COLUMN "user_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "userAdresses" ADD CONSTRAINT "FK_5e7fe1e71238b40f3b97e24fbd7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" DROP CONSTRAINT "UQ_9f6dee30c243dcacd3c60d992ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" ADD CONSTRAINT "FK_9f6dee30c243dcacd3c60d992ef" FOREIGN KEY ("store_id") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
