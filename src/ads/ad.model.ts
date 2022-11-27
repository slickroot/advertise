import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { User } from '../users/user.model';
import { User_Ad } from '../hooks/user_ad.model';

@Table
export class Ad extends Model {
  @Column
  targetingCriteria: string;

  @BelongsToMany(() => User, () => User_Ad)
  users: User[];
}
