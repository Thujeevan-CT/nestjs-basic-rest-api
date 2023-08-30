import mongoose from 'mongoose';
import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) {}

  async register(user: User): Promise<User> {
    const alreadyEmailHave = await this.userModel.findOne({
      email: user.email,
    });

    if (alreadyEmailHave) {
      throw new UnprocessableEntityException('Email already exists!');
    }

    const hash = await bcrypt.hash(
      user.password,
      Number(process.env.PASSWORD_HASH),
    );
    const hashedData = {
      ...user,
      password: hash,
    };
    const res = await this.userModel.create(hashedData);
    return res;
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    return users;
  }

  async login(data: loginDto): Promise<User> {
    const haveAccount = await this.userModel.findOne({ email: data.email });
    if (!haveAccount) {
      throw new NotFoundException('Email or password incorrect!');
    }

    const isMatch = await bcrypt.compare(data.password, haveAccount.password);
    if (!isMatch) {
      throw new NotFoundException('Email or password incorrect!');
    }

    return haveAccount;
  }
}
