import { Migration } from '@mikro-orm/migrations';

export class Migration20230705133932_CreateRoles extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "role" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null);');
    this.addSql('alter table "role" add constraint "role_name_unique" unique ("name");');

    this.addSql('create table "user_role" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "user_id" int not null, "role_id" int not null);');

    this.addSql('alter table "user_role" add constraint "user_role_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    this.addSql('alter table "user_role" add constraint "user_role_role_id_foreign" foreign key ("role_id") references "role" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user_role" drop constraint "user_role_role_id_foreign";');

    this.addSql('drop table if exists "role" cascade;');

    this.addSql('drop table if exists "user_role" cascade;');
  }

}
