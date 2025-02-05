import { Body, HttpException, HttpStatus, Injectable, Post, UnauthorizedException } from "@nestjs/common";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs"
import { User } from "../users/users.model";

@Injectable()
export class AuthService {
  constructor(private userService: UsersService,
              private jwtService: JwtService) {
  }

  //авторизация
  async login(userDto: CreateUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);

  }

  //регистрация
  async registration(userDto: CreateUserDto) {
    const candidate = await  this.userService.getUserByEmail(userDto.email);
    if (candidate){
      throw new Error('Пользователь с таким email существует')
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({... userDto, password: hashPassword});
    return this.generateToken(user);

  }

  //генерация токена
  private async generateToken(user : User){
    const payload = {email: user.email, id: user.id}
    return{
      token: this.jwtService.sign(payload)
    }
  }

  //проверка, что такой пользователь есть, если да, проверка совпадения паролей
  private async validateUser(userDto: CreateUserDto){
    const user = await this.userService.getUserByEmail(userDto.email);
    const passwordEquals = await bcrypt.compare(userDto.password, user.password);
    if (user && passwordEquals){
      return user;
    }
    throw new Error("Неверный пароль или логин")
  }
}
