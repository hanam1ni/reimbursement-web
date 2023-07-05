import { Migration } from '@mikro-orm/migrations';

export class Migration20230705092227_CreateDepartments extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "department" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');
    this.addSql('alter table "department" add constraint "department_name_unique" unique ("name");');

    this.addSql('create table "user_department" ("id" int not null, "user_id" int not null, "department_id" int not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "role" text check ("role" in (\'manager\', \'member\')) not null, constraint "user_department_pkey" primary key ("id", "user_id", "department_id"));');

    this.addSql('alter table "user_department" add constraint "user_department_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "user_department" add constraint "user_department_department_id_foreign" foreign key ("department_id") references "department" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_department" drop constraint "user_department_department_id_foreign";');

    this.addSql('drop table if exists "department" cascade;');

    this.addSql('drop table if exists "user_department" cascade;');
  }

}
