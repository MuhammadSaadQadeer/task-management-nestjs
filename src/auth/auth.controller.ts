import { CreateUserDto } from './dto/user.create.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/signup')
  signUp(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.authService.signUp(createUserDto);
  }

  @Post('/signIn')
  signIn(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(createUserDto);
  }
}
