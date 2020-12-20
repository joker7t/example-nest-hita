import { Injectable } from '@nestjs/common';
import { UserService } from './user/user.service';

@Injectable()
export class AppService {
  constructor(private readonly userService: UserService) {}

  getHello(): string {
    return 'Hello World!';
  }

  googleLogin(req) {
    if (!req.user) {
      return 'No user from google';
    }

    const { user } = req;
    this.userService.addUser({
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      accessToken: user.accessToken,
    });
    return {
      message: 'User information from google',
      user: user,
    };
  }

  facebookLogin(req) {
    if (!req.user) {
      return 'No user from facebook';
    }

    const { user } = req;
    this.userService.addUser({
      firstname: user.user.firstName,
      lastname: user.user.lastName,
      email: user.user.email,
      accessToken: user.accessToken,
    });

    return {
      message: 'User information from facebook',
      user: user,
    };
  }
}
