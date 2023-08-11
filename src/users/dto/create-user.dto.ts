import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {

  @ApiProperty({ example: 'user@mail.ru', description: 'email пользователя' })
  readonly email: string;

  @ApiProperty({ example: '0000', description: 'пароль' })
  readonly password: string;
}