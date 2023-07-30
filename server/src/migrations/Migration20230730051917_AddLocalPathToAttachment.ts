import { Migration } from '@mikro-orm/migrations';

export class Migration20230730051917_AddLocalPathToAttachment extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "expense_claim_attachment" add column "local_path" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "expense_claim_attachment" drop column "local_path";');
  }

}
