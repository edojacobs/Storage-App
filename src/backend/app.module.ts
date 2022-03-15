import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "./users/user.module";
import { StorageModule } from "./storage/storage.module";
import path from "path";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
      envFilePath: [path.resolve(".env")],
    }),

    UserModule,
    StorageModule,
  ],
})
export class AppModule {}
