import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserInput } from './dto/add-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(addUserInput: AddUserInput): Promise<User> {
    const user = await this.userRepository.create(addUserInput);
    return await this.userRepository.save(user);
  }

  async findOne(userId: string): Promise<User> {
    const user = await this.userRepository.findOne(userId,{relations:['restaurant']});
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async findAll(): Promise<Array<User>> {
    return await this.userRepository.find({relations:['restaurant']});
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserInput,
    });
    if (!user) {
      throw new Error("User not found!")
    }
    return this.userRepository.save(user);
  }

  async remove(userId: string): Promise<boolean> {
    const user = await this.userRepository.softDelete(userId);
    return user ? true : false;
  }
}
