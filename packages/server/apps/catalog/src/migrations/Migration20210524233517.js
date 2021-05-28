'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Migration = require('@mikro-orm/migrations').Migration;

class Migration20210524233517 extends Migration {

  async up() {
    this.addSql('create table "collection" ("id" varchar(255) not null, "isActive" bool not null, "isArchived" bool not null, "createdAt" timestamptz(0) not null, "createdBy" varchar(255) not null, "updatedAt" timestamptz(0) not null, "updatedBy" varchar(255) not null, "internalComment" varchar(300) null, "name" varchar(255) not null);');
    this.addSql('alter table "collection" add constraint "collection_pkey" primary key ("id");');

    this.addSql('create table "collectionType" ("id" varchar(255) not null, "isActive" bool not null, "isArchived" bool not null, "createdAt" timestamptz(0) not null, "createdBy" varchar(255) not null, "updatedAt" timestamptz(0) not null, "updatedBy" varchar(255) not null, "internalComment" varchar(300) null, "name" varchar(255) not null, "collectionId" varchar(255) null);');
    this.addSql('alter table "collectionType" add constraint "collectionType_pkey" primary key ("id");');

    this.addSql('create table "product" ("id" varchar(255) not null, "isActive" bool not null, "isArchived" bool not null, "createdAt" timestamptz(0) not null, "createdBy" varchar(255) not null, "updatedAt" timestamptz(0) not null, "updatedBy" varchar(255) not null, "internalComment" varchar(300) null, "name" varchar(255) not null, "price" int4 not null, "image" varchar(255) not null, "collectionTypeId" varchar(255) null);');
    this.addSql('alter table "product" add constraint "product_pkey" primary key ("id");');

    this.addSql('alter table "collectionType" add constraint "collectionType_collectionId_foreign" foreign key ("collectionId") references "collection" ("id") on update cascade on delete cascade;');

    this.addSql('alter table "product" add constraint "product_collectionTypeId_foreign" foreign key ("collectionTypeId") references "collectionType" ("id") on update cascade on delete cascade;');
  }

}
exports.Migration20210524233517 = Migration20210524233517;
