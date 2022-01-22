import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AddUserInput } from './dto/add-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(addUserInput: AddUserInput): Promise<UserEntity> {
    const user = await this.userRepository.create(addUserInput);
    return await this.userRepository.save(user);
  }

  async findOne(userId: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(userId);
    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return user;
  }

  async findAll(): Promise<Array<UserEntity>> {
    return await this.userRepository.find();
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserInput,
    });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(userId: string): Promise<boolean> {
    const user = await this.userRepository.softDelete(userId);
    return user ? true : false;
  }
}
