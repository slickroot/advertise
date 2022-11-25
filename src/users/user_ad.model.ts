import { Column, Model, Table, ForeignKey } from 'sequelize-typescript';
import { User } from './user.model';
import { Ad } from '../ads/ad.model';

@Table
export class User_Ad extends Model {
  @ForeignKey(() => User)
  @Column
  user: number;

  @ForeignKey(() => Ad)
  @Column
  ad: number;
}
