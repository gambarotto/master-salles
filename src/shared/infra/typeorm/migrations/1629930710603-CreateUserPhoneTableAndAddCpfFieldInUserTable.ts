import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateUserPhoneTableAndAddCpfFieldInUserTable1629930710603
  implements MigrationInterface
{
  name = 'CreateUserPhoneTableAndAddCpfFieldInUserTable1629930710603';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_phones" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "phone_number" text NOT NULL, "default" boolean NOT NULL, "user_id" uuid, CONSTRAINT "PK_975f5d595e466bdcbb7b0afc2b1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "cpf" character varying`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_230b925048540454c8b4c481e1c" UNIQUE ("cpf")`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_phones" ADD CONSTRAINT "FK_6739058db80ec1d314a7a039b0f" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_phones" DROP CONSTRAINT "FK_6739058db80ec1d314a7a039b0f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_230b925048540454c8b4c481e1c"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "cpf"`);
    await queryRunner.query(`DROP TABLE "user_phones"`);
  }
}
