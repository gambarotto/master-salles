import { MigrationInterface, QueryRunner } from 'typeorm';

export default class AddAvatarSocialMediaFieldInUsers1625496663826
  implements MigrationInterface
{
  name = 'AddAvatarSocialMediaFieldInUsers1625496663826';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "avatar_social_media" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP COLUMN "avatar_social_media"`,
    );
  }
}
