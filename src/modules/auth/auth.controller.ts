import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { signUpDto } from './dto/signUpDto';
import { signInDto } from './dto/signInDto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @ApiOperation({ summary: 'sign up' })  
  @Post('signUp')
  async login(@Body() body: signUpDto) {
    return this.authService.handleSignUp(body)
  }

  @ApiOperation({ summary: 'verfiy email' })
  @Get('verify/:token')
  async verify(@Param('token') token: any) {
    return this.authService.verify(token)
  }

  @ApiOperation({ summary: 'sign in' })
  @Post('signIn')
  async logIn(@Body() body: signInDto) {
    return this.authService.handleLogIn(body)
  }
}
