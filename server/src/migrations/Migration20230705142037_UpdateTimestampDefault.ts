import { Migration } from '@mikro-orm/migrations';

export class Migration20230705142037_UpdateTimestampDefault extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "department" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "department" alter column "created_at" set default CURRENT_TIMESTAMP;');
    this.addSql('alter table "department" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "department" alter column "updated_at" set default CURRENT_TIMESTAMP;');

    this.addSql('alter table "role" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "role" alter column "created_at" set default CURRENT_TIMESTAMP;');
    this.addSql('alter table "role" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "role" alter column "updated_at" set default CURRENT_TIMESTAMP;');

    this.addSql('alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "created_at" set default CURRENT_TIMESTAMP;');
    this.addSql('alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "updated_at" set default CURRENT_TIMESTAMP;');

    this.addSql('alter table "user_department" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user_department" alter column "created_at" set default CURRENT_TIMESTAMP;');
    this.addSql('alter table "user_department" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "user_department" alter column "updated_at" set default CURRENT_TIMESTAMP;');

    this.addSql('alter table "user_role" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user_role" alter column "created_at" set default CURRENT_TIMESTAMP;');
    this.addSql('alter table "user_role" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
    this.addSql('alter table "user_role" alter column "updated_at" set default CURRENT_TIMESTAMP;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "department" alter column "created_at" drop default;');
    this.addSql('alter table "department" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "department" alter column "updated_at" drop default;');
    this.addSql('alter table "department" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "role" alter column "created_at" drop default;');
    this.addSql('alter table "role" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "role" alter column "updated_at" drop default;');
    this.addSql('alter table "role" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "user" alter column "created_at" drop default;');
    this.addSql('alter table "user" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user" alter column "updated_at" drop default;');
    this.addSql('alter table "user" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "user_department" alter column "created_at" drop default;');
    this.addSql('alter table "user_department" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user_department" alter column "updated_at" drop default;');
    this.addSql('alter table "user_department" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');

    this.addSql('alter table "user_role" alter column "created_at" drop default;');
    this.addSql('alter table "user_role" alter column "created_at" type timestamptz(0) using ("created_at"::timestamptz(0));');
    this.addSql('alter table "user_role" alter column "updated_at" drop default;');
    this.addSql('alter table "user_role" alter column "updated_at" type timestamptz(0) using ("updated_at"::timestamptz(0));');
  }

}
