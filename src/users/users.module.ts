import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { User } from './user.model';
import { User_Ad } from './user_ad.model';

@Module({
  imports: [SequelizeModule.forFeature([User, User_Ad])],
  controllers: [UserController],
})
export class UsersModule {}
