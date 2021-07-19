import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddFieldDefaultToUserAddress1626717650810
  implements MigrationInterface
{
  name = 'AddFieldDefaultToUserAddress1626717650810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_adresses" ADD "default" boolean`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_adresses" DROP COLUMN "default"`,
    );
  }
}
