
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../modules/user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers

    if (!authorization?.startsWith('nest__')) {
      throw new BadRequestException('In-Valid Bearer Key')
    }

    const token = authorization.split('nest__')[1]
    if (!token) throw new BadRequestException('In-Valid Token')

    try {

      const decode = this.jwtService.verify(token, {
        secret: process.env.jwt_token_secret
      })
      if (!decode?.id) throw new UnauthorizedException('In-Valid Token')

      const user = await this.userRepository.findOne({ where: { id: decode.id } })
      if (!user) throw new UnauthorizedException('In-Valid')

      return request['user'] = user as any

    } catch (err) {
      throw new HttpException(err.message, 400)
    }
  }

}
