import { Column, Model, Table, DataType } from "sequelize-typescript"

interface UserCreationsAttrs {
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationsAttrs> {
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;
  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  email: string;
  @Column({ type: DataType.STRING, allowNull: true })
  password: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  banned: boolean;
  @Column({ type: DataType.STRING, allowNull: true })
  banReason: string;
}