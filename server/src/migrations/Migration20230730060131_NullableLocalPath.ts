import { Migration } from '@mikro-orm/migrations';

export class Migration20230730060131_NullableLocalPath extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "expense_claim_attachment" alter column "local_path" type text using ("local_path"::text);');
    this.addSql('alter table "expense_claim_attachment" alter column "local_path" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "expense_claim_attachment" alter column "local_path" type text using ("local_path"::text);');
    this.addSql('alter table "expense_claim_attachment" alter column "local_path" set not null;');
  }

}
