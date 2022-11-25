import { InjectModel } from '@nestjs/sequelize';
import { Controller, Get } from '@nestjs/common';
import { User } from './user.model';

@Controller('users')
export class UserController {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  @Get()
  all() {
    return this.userModel.findAll();
  }
}
