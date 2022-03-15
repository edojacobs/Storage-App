import { Module } from "@nestjs/common";
import { StorageBucket } from "./storage.api";
import { StorageController } from "./storage.controller";
import { StorageService } from "./storage.service";

@Module({
  imports: [],
  controllers: [StorageController],
  providers: [StorageService, StorageBucket],
  exports: [StorageService],
})
export class StorageModule {}
