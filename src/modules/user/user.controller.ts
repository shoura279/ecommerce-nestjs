import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { Roles } from '../../guards/roles/roles.decorator';
import { Role } from '../../guards/roles/roles.enum';
import { RolesGuard } from '../../guards/roles/roles.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('user')
@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) { }
  @ApiOperation({ summary: 'add user' })
  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);

    return {
      message: 'user created successfully',
      success: true,
      user
    }
  }
  @ApiOperation({ summary: 'get all user' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'get specific user' })
  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async findOne(@Param('id') id: string) {
    const user = await this.userService.findOne(+id);
    return {
      success: true,
      user
    }
  }
  @ApiOperation({ summary: 'update user' })
  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.update(+id, updateUserDto);
    return {
      message: 'user updated successfully',
      success: true,
      user
    }
  }
  @ApiOperation({ summary: 'delete user' })
  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const user = await this.userService.remove(+id);
    return {
      message: 'user deleted successfully',
      success: true,
    }
  }
}
