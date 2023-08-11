import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/users.model';

@Injectable()
export class AuthService {

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) { }

  async generatedToken(user: User) {
    const { email, id, roles } = user
    const payload = { email, id, roles }
    return {
      token: this.jwtService.sign(payload)
    }
  }

  async login(dto: CreateUserDto) {

  }

  async registration(dto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(dto.email);
    if (candidate) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
    }
    const salt = 5
    const hashPassword = await bcrypt.hash(dto.password, salt)
    const user = await this.usersService.createUser({ ...dto, password: hashPassword })
    return this.generatedToken(user)
  }
}
