import { Migration } from '@mikro-orm/migrations';

export class Migration20230730044622_UpdateAttachmentSchema extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "expense_claim_attachment" add column "processed_at" timestamptz(0) null;');
    this.addSql('alter table "expense_claim_attachment" alter column "url" type text using ("url"::text);');
    this.addSql('alter table "expense_claim_attachment" alter column "url" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "expense_claim_attachment" alter column "url" type text using ("url"::text);');
    this.addSql('alter table "expense_claim_attachment" alter column "url" set not null;');
    this.addSql('alter table "expense_claim_attachment" drop column "processed_at";');
  }

}
