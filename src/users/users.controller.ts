import { RolesGuard } from './../auth/roles.guard';
import { JwtAuthGuard } from './../auth/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Body, Post, Get, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from 'src/auth/auth-roles.decorator';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) { }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.UsersService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @Roles('people')
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.UsersService.getAllUser()
  }
}
