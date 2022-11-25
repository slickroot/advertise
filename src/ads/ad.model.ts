import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { User_Ad } from '../users/user_ad.model';
import { User } from '../users/user.model';

@Table
export class Ad extends Model {
  @Column
  targetingCriteria: string;

  @BelongsToMany(() => User, () => User_Ad)
  users: User[];
}
