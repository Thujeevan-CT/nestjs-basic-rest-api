import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './schema/user.schema';
import { registerUserDto } from './dto/createUser.dto';
import { loginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post('/new')
  async register(
    @Body()
    user: registerUserDto,
  ): Promise<User> {
    return this.userService.register(user);
  }

  @Post('/login')
  async login(
    @Body()
    data: loginDto,
  ): Promise<User> {
    return this.userService.login(data);
  }
}
