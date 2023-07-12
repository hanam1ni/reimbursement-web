import { Migration } from '@mikro-orm/migrations';

export class Migration20230712051045_CreateExpenseClaim extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "expense_claim" ("id" serial primary key, "created_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "updated_at" timestamptz(0) not null default CURRENT_TIMESTAMP, "amount" int not null, "status" varchar(255) not null, "created_by_id" int null, "approved_at" timestamptz(0) null, "approved_by_id" int null, "rejected_at" timestamptz(0) null, "rejected_by_id" int null, "completed_at" timestamptz(0) null, "completed_by_id" int null);');

    this.addSql('alter table "expense_claim" add constraint "expense_claim_created_by_id_foreign" foreign key ("created_by_id") references "user" ("id") on update cascade on delete set null;');
    this.addSql('alter table "expense_claim" add constraint "expense_claim_approved_by_id_foreign" foreign key ("approved_by_id") references "user" ("id") on update cascade on delete set null;');
    this.addSql('alter table "expense_claim" add constraint "expense_claim_rejected_by_id_foreign" foreign key ("rejected_by_id") references "user" ("id") on update cascade on delete set null;');
    this.addSql('alter table "expense_claim" add constraint "expense_claim_completed_by_id_foreign" foreign key ("completed_by_id") references "user" ("id") on update cascade on delete set null;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "expense_claim" cascade;');
  }

}
