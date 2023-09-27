
export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    // useFactory: (connection: Connection) => connection,
    inject: ['DATABASE_CONNECTION'],
  },
]
