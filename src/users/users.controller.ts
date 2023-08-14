import { ValidationPipe } from './../pipes/validation.pipe';
import { RolesGuard } from './../auth/roles.guard';
import { JwtAuthGuard } from './../auth/auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Controller, Body, Post, Get, HttpStatus, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';
import { Roles } from 'src/auth/auth-roles.decorator';
import { addRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private UsersService: UsersService) { }

  @ApiOperation({ summary: 'Создание пользователя' })
  @ApiResponse({ status: HttpStatus.OK, type: User })
  // @UsePipes(ValidationPipe) - добавил глобально в main.ts
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.UsersService.createUser(userDto)
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: HttpStatus.OK, type: [User] })
  @UseGuards(JwtAuthGuard)
  @Get()
  getAll() {
    return this.UsersService.getAllUser()
  }

  @ApiOperation({ summary: 'Выдать роль' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('god')
  @UseGuards(RolesGuard)
  @Post('/role')
  addRole(@Body() dto: addRoleDto) {
    return this.UsersService.addRole(dto)
  }

  @ApiOperation({ summary: 'Забанить пользователя' })
  @ApiResponse({ status: HttpStatus.OK })
  @Roles('god')
  @UseGuards(RolesGuard)
  @Post('/ban')
  ban(@Body() dto: BanUserDto) {
    return this.UsersService.banUser(dto)
  }
}
