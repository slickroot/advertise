import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { AdsModule } from './ads/ads.module';
import { HooksModule } from './hooks/hooks.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'root',
      password: 'root',
      database: 'postgres',
      autoLoadModels: true,
      synchronize: true,
      logging: false,
    }),
    UsersModule,
    AdsModule,
    HooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
