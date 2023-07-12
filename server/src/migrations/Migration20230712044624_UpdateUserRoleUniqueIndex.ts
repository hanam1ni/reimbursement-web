import { Migration } from '@mikro-orm/migrations';

export class Migration20230712044624_UpdateUserRoleUniqueIndex extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_role" add constraint "user_role_user_id_role_id_unique" unique ("user_id", "role_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_role" drop constraint "user_role_user_id_role_id_unique";');
  }

}
