import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationBetweenUserAndUserAddress1622142051026
  implements MigrationInterface
{
  name = 'RelationBetweenUserAndUserAddress1622142051026';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users_adresses" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "users_adresses" ADD CONSTRAINT "FK_cc84544c2f38476f224847410d9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_adresses" DROP CONSTRAINT "FK_cc84544c2f38476f224847410d9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_adresses" DROP COLUMN "userId"`,
    );
  }
}
