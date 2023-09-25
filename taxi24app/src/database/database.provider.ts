import { Connection } from 'typeorm';
// import { ModuleAEntity } from './' // Importa tus entidades aquí

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (connection: Connection) => connection,
    inject: ['DATABASE_CONNECTION'],
  },
];
