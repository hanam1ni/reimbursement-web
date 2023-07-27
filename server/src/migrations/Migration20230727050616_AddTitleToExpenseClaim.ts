import { Migration } from '@mikro-orm/migrations';

export class Migration20230727050616_AddTitleToExpenseClaim extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "expense_claim" add column "title" varchar(255) not null, add column "description" varchar(255) null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "expense_claim" drop column "title";');
    this.addSql('alter table "expense_claim" drop column "description";');
  }

}
