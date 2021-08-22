import { CreateUserDto } from './dto/user.create.dto';
import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bycrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { username, password } = createUserDto;
    const salt = await bycrypt.genSalt();
    const hashedPassword = await bycrypt.hash(password, salt);
    const user = this.create({
      username,
      password: hashedPassword,
    });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        // Duplicate username
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }
}
