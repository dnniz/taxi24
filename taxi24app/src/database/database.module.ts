import { Module } from '@nestjs/common';
import { Database } from './database';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [Database],
  imports: [
    TypeOrmModule.forRoot({
      // Configuración de TypeORM para la conexión a la base de datos
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
