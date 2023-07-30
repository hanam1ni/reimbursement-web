import { Migration } from '@mikro-orm/migrations';

export class Migration20230729163650_CreateExpenseClaimAttacment extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "expense_claim_attachment" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "url" varchar(255) not null, "expense_claim_id" int not null);');
    this.addSql('alter table "expense_claim_attachment" add constraint "expense_claim_attachment_url_expense_claim_id_unique" unique ("url", "expense_claim_id");');

    this.addSql('alter table "expense_claim_attachment" add constraint "expense_claim_attachment_expense_claim_id_foreign" foreign key ("expense_claim_id") references "expense_claim" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "expense_claim_attachment" cascade;');
  }

}
