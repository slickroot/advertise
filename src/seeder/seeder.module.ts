import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../users/user.model';
import { Ad } from '../ads/ad.model';
import { SeederController } from './seeder.controller';

@Module({
  imports: [SequelizeModule.forFeature([User, Ad])],
  controllers: [SeederController],
})
export class SeederModule {}
