import { Migration } from '@mikro-orm/migrations';

export class Migration20230729163938_UpdateTextType extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "expense_claim" alter column "description" type text using ("description"::text);');

    this.addSql('alter table "expense_claim_attachment" alter column "url" type text using ("url"::text);');
  }

  async down(): Promise<void> {
    this.addSql('alter table "expense_claim" alter column "description" type varchar(255) using ("description"::varchar(255));');

    this.addSql('alter table "expense_claim_attachment" alter column "url" type varchar(255) using ("url"::varchar(255));');
  }

}
