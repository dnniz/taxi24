import { Connection } from 'typeorm';
import { ModuleAEntity } from '../module-a/entities/module-a.entity'; // Importa tus entidades aquí

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (connection: Connection) => connection,
    inject: ['DATABASE_CONNECTION'],
  },
];