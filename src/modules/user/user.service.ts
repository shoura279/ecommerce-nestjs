import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }
  async create(createUserDto: CreateUserDto): Promise<User> {
    const isExist = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (isExist) {
      throw new ConflictException('Email already exist');
    }

    const salt = 8
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt)
    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword
    });
    return this.userRepository.save(newUser)

  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    if (updateUserDto.email) {
      const isExist = await this.userRepository.findOne({ where: { email: updateUserDto.email } });
      if (isExist) {
        throw new ConflictException('Email already exist');
      }
    }
    await this.userRepository.update(id, updateUserDto);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    await this.userRepository.delete(id);
  }
}
