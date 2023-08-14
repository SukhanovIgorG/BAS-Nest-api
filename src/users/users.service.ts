import { CreateUserDto } from './dto/create-user.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { RolesService } from 'src/roles/roles.service';
import { addRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userRepository: typeof User,
    private roleService: RolesService
  ) { }

  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto)
    const role = await this.roleService.getRoleByValue('god')
    await user.$set('roles', [role.id])
    user.roles = [role]
    return user
  }

  async getAllUser() {
    const users = await this.userRepository.findAll({ include: { all: true } })
    return users
  }

  async getUserByEmail(email: string) {
    const users = await this.userRepository.findOne({
      where: { email },
      include: { all: true }
    })
    return users
  }
  async addRole(dto: addRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.roleService.getRoleByValue(dto.value);
    if (user && role) {
      await user.$add('role', role.id);
      return dto;
    }
    throw new HttpException('user or role not found', HttpStatus.NOT_FOUND)
  }
  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
