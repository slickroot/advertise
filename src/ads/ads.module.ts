import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ad } from './ad.model';

@Module({
  imports: [SequelizeModule.forFeature([Ad])],
})
export class AdsModule {}
