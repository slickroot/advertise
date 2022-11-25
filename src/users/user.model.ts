import { Column, Model, Table, BelongsToMany } from 'sequelize-typescript';
import { Ad } from '../ads/ad.model';
import { User_Ad } from './user_ad.model';

@Table
export class User extends Model {
  @Column
  firstName: string;

  @Column
  lastName: string;

  @BelongsToMany(() => Ad, () => User_Ad)
  adsRead: Ad[];
}
