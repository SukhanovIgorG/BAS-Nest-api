import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {

  @ApiProperty({ example: 'user@mail.ru', description: 'email пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный адрес почты' })
  readonly email: string;

  @ApiProperty({ example: '0000', description: 'пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(4, 8, { message: 'Должен содержать от 4 до 8 символов' })
  readonly password: string;
}