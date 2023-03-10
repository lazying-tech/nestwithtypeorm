import { MigrationInterface, QueryRunner } from 'typeorm';

export class newMigration1678446008838 implements MigrationInterface {
  name = 'newMigration1678446008838';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\` ON \`users\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` CHANGE \`age\` \`age\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1bda35cdb9a2c1b777f5541d87\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`profileId\` \`profileId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1bda35cdb9a2c1b777f5541d87\` FOREIGN KEY (\`profileId\`) REFERENCES \`user_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_b1bda35cdb9a2c1b777f5541d87\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`profileId\` \`profileId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD CONSTRAINT \`FK_b1bda35cdb9a2c1b777f5541d87\` FOREIGN KEY (\`profileId\`) REFERENCES \`user_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_profile\` CHANGE \`age\` \`age\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_b1bda35cdb9a2c1b777f5541d8\` ON \`users\` (\`profileId\`)`,
    );
  }
}
