import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AlterTypeLatAndLongToFloat81622218105718
  implements MigrationInterface
{
  name = 'AlterTypeLatAndLongToFloat81622218105718';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "storeAdresses" DROP COLUMN "lat"`);
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" ADD "lat" double precision`,
    );
    await queryRunner.query(`ALTER TABLE "storeAdresses" DROP COLUMN "long"`);
    await queryRunner.query(
      `ALTER TABLE "storeAdresses" ADD "long" double precision`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "storeAdresses" DROP COLUMN "long"`);
    await queryRunner.query(`ALTER TABLE "storeAdresses" ADD "long" integer`);
    await queryRunner.query(`ALTER TABLE "storeAdresses" DROP COLUMN "lat"`);
    await queryRunner.query(`ALTER TABLE "storeAdresses" ADD "lat" integer`);
  }
}
