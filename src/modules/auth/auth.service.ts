import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { signUpDto } from './dto/signUpDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { sendEmail } from '../../email/sendEmail';
import { signInDto } from './dto/signInDto';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from '../../../src/Db/Schemas/cart.schema';
import { Model } from 'mongoose';
@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
        private jwtService: JwtService,@InjectModel(Cart.name) private cartModel:Model<Cart>) { }

    async handleSignUp(user: signUpDto): Promise<object> {
        const isExist = await this.userRepository.findOne({ where: { email: user.email } });
        if (isExist) {
            throw new ConflictException('Email already exist');
        }
        const salt = 8
        const hashedPassword = await bcrypt.hash(user.password, salt)
        const newUser = this.userRepository.create({
            ...user,
            password: hashedPassword
        });
        const savedUser = await this.userRepository.save(newUser)

        const token = await this.jwtService.signAsync({
            id: savedUser.id,
            email: savedUser.email,
            role: savedUser.role
        }, {
            secret: process.env.jwt_token_secret
        })
        sendEmail({ email: savedUser.email, api: `http://localhost:3000/auth/verify/${token}` })
        // create cart
        await this.cartModel.create({userId:newUser.id,products:[]})
        return {
            message: 'user created successfully',
            success: true,
            user: savedUser
        }
    }




    async verify(token: any) {

        const user = await this.jwtService.decode(token)
        console.log(user);
        const isExist = await this.userRepository.findOne({ where: { email: user.email } })
        if (!isExist) {
            throw new NotFoundException('User not found')
        }

        await this.userRepository.update(isExist.id, { verified: true })

        return {
            message: 'account verified successfully.',
            success: true,
        }
    }



    async handleLogIn(body: signInDto) {
        const { email, password } = body
        const isExist = await this.userRepository.findOne({ where: { email } })

        if (!isExist) {
            throw new BadRequestException('You Have To Register First')
        }
        if (!isExist.verified) throw new BadRequestException('You Have To Verify Your Account First Please Check Your Email.')

        const match = await bcrypt.compare(password, isExist['password'])
        if (!match) {
            throw new BadRequestException('Wrong Password')
        }

        const token = this.jwtService.sign({
            id: isExist.id,
            email: isExist.email,
            role: isExist.role
        }, {
            secret: process.env.jwt_token_secret
        })
        return {
            message: 'success',
            token
        }

    }

}
