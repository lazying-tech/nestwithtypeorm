import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration26341679848367283 implements MigrationInterface {
  name = 'migration26341679848367283';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`brands\` CHANGE \`categoryId\` \`categoryId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ea86d0c514c4ecbb5694cbf57df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`brandId\` \`brandId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` DROP FOREIGN KEY \`FK_f96476a5cd5d022aab3efcc02b5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` DROP FOREIGN KEY \`FK_2dcb0073f8a9000519739e92c3f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` CHANGE \`billId\` \`billId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` CHANGE \`productId\` \`productId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_dd941796f5112bc83a7bf499f86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_468a8ae0352d6a0647bd770e11c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` CHANGE \`userId\` \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` CHANGE \`employeeId\` \`employeeId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` CHANGE \`userId\` \`userId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ea86d0c514c4ecbb5694cbf57df\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` ADD CONSTRAINT \`FK_f96476a5cd5d022aab3efcc02b5\` FOREIGN KEY (\`billId\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` ADD CONSTRAINT \`FK_2dcb0073f8a9000519739e92c3f\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` ADD CONSTRAINT \`FK_dd941796f5112bc83a7bf499f86\` FOREIGN KEY (\`userId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` ADD CONSTRAINT \`FK_468a8ae0352d6a0647bd770e11c\` FOREIGN KEY (\`employeeId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_468a8ae0352d6a0647bd770e11c\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` DROP FOREIGN KEY \`FK_dd941796f5112bc83a7bf499f86\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` DROP FOREIGN KEY \`FK_2dcb0073f8a9000519739e92c3f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` DROP FOREIGN KEY \`FK_f96476a5cd5d022aab3efcc02b5\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` DROP FOREIGN KEY \`FK_ea86d0c514c4ecbb5694cbf57df\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`accounts\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` CHANGE \`employeeId\` \`employeeId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` CHANGE \`createAt\` \`createAt\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP()`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` ADD CONSTRAINT \`FK_468a8ae0352d6a0647bd770e11c\` FOREIGN KEY (\`employeeId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills\` ADD CONSTRAINT \`FK_dd941796f5112bc83a7bf499f86\` FOREIGN KEY (\`userId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` CHANGE \`productId\` \`productId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` CHANGE \`billId\` \`billId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` ADD CONSTRAINT \`FK_2dcb0073f8a9000519739e92c3f\` FOREIGN KEY (\`productId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`bills_products\` ADD CONSTRAINT \`FK_f96476a5cd5d022aab3efcc02b5\` FOREIGN KEY (\`billId\`) REFERENCES \`bills\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` CHANGE \`brandId\` \`brandId\` int NULL DEFAULT 'NULL'`,
    );
    await queryRunner.query(
      `ALTER TABLE \`products\` ADD CONSTRAINT \`FK_ea86d0c514c4ecbb5694cbf57df\` FOREIGN KEY (\`brandId\`) REFERENCES \`brands\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`brands\` CHANGE \`categoryId\` \`categoryId\` int NULL DEFAULT 'NULL'`,
    );
  }
}
