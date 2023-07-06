import { Migration } from '@mikro-orm/migrations';

export class Migration20230706053412_AddUserDepartmentUniqueIndex extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_department" add constraint "user_department_user_id_department_id_unique" unique ("user_id", "department_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_department" drop constraint "user_department_user_id_department_id_unique";');
  }

}
