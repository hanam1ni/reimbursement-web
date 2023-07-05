import { Migration } from '@mikro-orm/migrations';

export class Migration20230705095537_UpdateUserDepartments extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user_department" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "user_department" drop constraint "user_department_pkey";');
    this.addSql('create sequence if not exists "user_department_id_seq";');
    this.addSql('select setval(\'user_department_id_seq\', (select max("id") from "user_department"));');
    this.addSql('alter table "user_department" alter column "id" set default nextval(\'user_department_id_seq\');');
    this.addSql('alter table "user_department" add constraint "user_department_pkey" primary key ("id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_department" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "user_department" drop constraint "user_department_pkey";');
    this.addSql('alter table "user_department" alter column "id" drop default;');
    this.addSql('alter table "user_department" add constraint "user_department_pkey" primary key ("id", "user_id", "department_id");');
  }

}
