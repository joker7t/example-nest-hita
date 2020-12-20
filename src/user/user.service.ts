// ./src/customer/customer.service.ts
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserAttrs } from './interfaces/User.interface';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<UserAttrs>) {}
  // fetch all customers
  async getAllUsers(): Promise<UserAttrs[]> {
    const users = await this.userModel.find().exec();
    return users;
  }
  // Get a single customer
  async getUser(userId): Promise<UserAttrs> {
    const user = await this.userModel.findById(userId).exec();
    return user;
  }
  // post a single customer
  async addUser(createUserDTO: CreateUserDTO): Promise<UserAttrs> {
    const newUser = await new this.userModel(createUserDTO);
    return newUser.save();
  }
  // Edit customer details
  async updateUser(userId, createUserDTO: CreateUserDTO): Promise<UserAttrs> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      createUserDTO,
      { new: true },
    );
    return updatedUser;
  }
  // Delete a customer
  async deleteUser(userId): Promise<any> {
    const deletedUser = await this.userModel.findByIdAndRemove(userId);
    return deletedUser;
  }
}
