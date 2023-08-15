import { CreatePostDto } from './dto/create-post.dto';
import { Column, Model, Table, DataType, BelongsTo, ForeignKey } from "sequelize-typescript"
import { User } from "src/users/users.model";

interface PostCreationsAttrs extends CreatePostDto {
  image: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationsAttrs> {
  // @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  // @ApiProperty({ example: 'user@mail.ru', description: 'email пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  title: string;

  // @ApiProperty({ example: '0000', description: 'пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  // @ApiProperty({ example: '0000', description: 'пароль' })
  @Column({ type: DataType.STRING, allowNull: true })
  image: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}