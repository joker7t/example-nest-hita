import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  Query,
  NotFoundException,
  Delete,
  Param,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  // add a customer
  @Post()
  async addUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
    const user = await this.userService.addUser(createUserDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Customer has been created successfully',
      user,
    });
  }

  // Retrieve customers list
  @Get()
  async getAllUsers(@Res() res) {
    const users = await this.userService.getAllUsers();
    return res.status(HttpStatus.OK).json(users);
  }

  // Fetch a particular customer using ID
  @Get('/:userId')
  async getCustomer(@Res() res, @Param('userId') userId) {
    const user = await this.userService.getUser(userId);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json(user);
  }

  // Update a customer's details
  @Put()
  async updateUser(
    @Res() res,
    @Query('userId') userId,
    @Body() createUserDTO: CreateUserDTO,
  ) {
    const user = await this.userService.updateUser(userId, createUserDTO);
    if (!user) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'User has been successfully updated',
      user,
    });
  }

  // Delete a customer
  @Delete()
  async deleteUser(@Res() res, @Query('userId') userId) {
    const user = await this.userService.deleteUser(userId);
    if (!user) throw new NotFoundException('User does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'User has been deleted',
      user,
    });
  }
}
