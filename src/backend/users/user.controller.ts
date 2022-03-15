import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UsersService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findById(@Body() body: any) {
    return {
      testing: "xxxxx",
    };
  }
}
