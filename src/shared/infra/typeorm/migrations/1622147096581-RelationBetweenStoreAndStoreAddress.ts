import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationBetweenStoreAndStoreAddress1622147096581
  implements MigrationInterface
{
  name = 'RelationBetweenStoreAndStoreAddress1622147096581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "storeAdresses" ADD "storeId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" ADD CONSTRAINT "FK_9f6dee30c243dcacd3c60d992ef" FOREIGN KEY ("storeId") REFERENCES "stores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" DROP CONSTRAINT "FK_9f6dee30c243dcacd3c60d992ef"`,
    );
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" DROP COLUMN "storeId"`,
    );
  }
}
