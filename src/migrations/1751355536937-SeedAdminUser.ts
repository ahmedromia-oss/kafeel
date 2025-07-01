import { randomBytes, scrypt as _scrypt } from 'crypto';
import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { promisify } from 'util';

export class SeedAdminUser implements MigrationInterface {
  name = 'SeedAdminUser1751355536937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const userId = uuidv4();

    const scrypt = promisify(_scrypt);
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt('supersecretAdmin', salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');

    await queryRunner.query(`
  INSERT INTO \`user\` (\`id\`, \`email\`, \`password\`, \`userType\`)
  VALUES ('${userId}', 'admin@kafeel.com', '${result}', 'ADMIN');
`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
  DELETE FROM \`user\` WHERE \`email\` = 'admin@kafeel.com';
`);

  }
}
