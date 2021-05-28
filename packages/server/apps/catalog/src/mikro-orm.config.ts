import { CamelCaseNamingStrategy } from '@nelp/base';
import { Collection, CollectionType, Product } from '@nelp/entities';

export default {
  entities: [Product, Collection, CollectionType],
  dbName: 'nelp',
  type: 'postgresql',
  host: '172.28.0.3',
  user: 'nelp',
  password: 'nelp_pg_3718',
  namingStrategy: CamelCaseNamingStrategy,
  migrations: {
    tableName: 'migrations', // name of database table with log of executed transactions
    path: process.cwd() + '/apps/catalog/src/migrations', // path to the folder with migrations
    pattern: /^[\w-]+\d+\.js$/, // regex pattern for the migration files
    transactional: true, // wrap each migration in a transaction
    disableForeignKeys: true, // wrap statements with `set foreign_key_checks = 0` or equivalent
    allOrNothing: true, // wrap all migrations in master transaction
    dropTables: true, // allow to disable table dropping
    safe: false, // allow to disable table and column dropping
    emit: 'js', // migration generation mode
  },
};
