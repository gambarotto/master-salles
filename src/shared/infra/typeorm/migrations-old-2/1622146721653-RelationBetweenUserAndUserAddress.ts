import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RelationBetweenUserAndUserAddress1622146721653
  implements MigrationInterface
{
  name = 'RelationBetweenUserAndUserAddress1622146721653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "userAdresses" ADD "user_id" uuid`);
    await queryRunner.query(
      `ALTER TABLE "userAdresses" ADD CONSTRAINT "FK_5e7fe1e71238b40f3b97e24fbd7" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "userAdresses" DROP CONSTRAINT "FK_5e7fe1e71238b40f3b97e24fbd7"`,
    );
    await queryRunner.query(`ALTER TABLE "userAdresses" DROP COLUMN "user_id"`);
  }
}
