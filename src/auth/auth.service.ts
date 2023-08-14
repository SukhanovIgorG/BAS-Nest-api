import { CreateUserDto } from './../users/dto/create-user.dto';
import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
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

  private async generatedToken(userDto: User) {
    const { email, id, roles } = userDto
    const payload = { email, id, roles }
    return {
      token: this.jwtService.sign(payload)
    }
  }
  private async validateUser(userDto: CreateUserDto) {
    const { email } = userDto
    const user = await this.usersService.getUserByEmail(email)
    const passwordEquals = await await bcrypt.compare(userDto.password, user.password)
    if (user && passwordEquals) {
      return user
    }
    throw new UnauthorizedException({ message: "Invalid email or password" })
  }

  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto)
    return this.generatedToken(user)
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.usersService.getUserByEmail(userDto.email);
    if (candidate) {
      throw new HttpException('Пользователь с таким email существует', HttpStatus.BAD_REQUEST)
    }
    const salt = 5
    const hashPassword = await bcrypt.hash(userDto.password, salt)
    const user = await this.usersService.createUser({ ...userDto, password: hashPassword })
    return this.generatedToken(user)
  }
}
