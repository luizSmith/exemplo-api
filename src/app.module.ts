import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath: 'local.env',
    }),
    TypeOrmModule.forRoot({
        type: 'mysql',
        port: Number(process.env.PORT_DB) || 3306,
        host: process.env.HOST_DB,
        username: process.env.USERNAME_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE,
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
