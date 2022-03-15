import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  constructor() {}

  findById(id: number): any {
    return {
      id: "123",
    };
  }
}
