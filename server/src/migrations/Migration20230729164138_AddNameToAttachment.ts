import { Migration } from '@mikro-orm/migrations';

export class Migration20230729164138_AddNameToAttachment extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "expense_claim_attachment" add column "name" text not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "expense_claim_attachment" drop column "name";');
  }

}
