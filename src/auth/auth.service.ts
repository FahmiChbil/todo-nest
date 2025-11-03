import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User.name)  private userModel : Model<UserDocument> , 
        private jwtService : JwtService  ,  
    ) {}


    async register(data : RegisterDto) {
        const exisiting = await this.userModel.findOne({email : data.email}) ; 

        if(exisiting) {
            throw new BadRequestException('email already in use ') ; 

        }

        const passwordHash = await bcrypt.hash(data.password , 10) ; 
        
        const createdUser = new this.userModel({
            email : data.email , 
            passwordHash : passwordHash , 
            name : data.name
        })

        createdUser.save() ; 


        return this.builAuthResponse(createdUser) ; 
    }


    async login (data : LoginDto) {
        const user  = await this.userModel.findOne({email : data.email}) ; 

        if(!user) {
            throw new  UnauthorizedException('Invalid email or password ') ; 

        }
        const isValid = await bcrypt.compare(data.password , user.passwordHash) ; 
        if(!isValid) {
            throw new UnauthorizedException('Invalid email or password') ; 
        } 

        return this.builAuthResponse(user) ; 
    }

    builAuthResponse (user :  UserDocument) {
        const payload  = {sub : user.id , email : user.email}

        const token = this.jwtService.sign(payload) ; 

        return {
            token , 
            user : user.toJSON()
        }
    }

}
