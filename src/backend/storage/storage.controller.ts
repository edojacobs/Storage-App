import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { UploadDto } from "./dto/upload-file.dto";
import { StorageService } from "./storage.service";

@Controller("storage")
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post("signedurl")
  @HttpCode(HttpStatus.OK)
  signedUrl(@Body() body: UploadDto) {
    return this.storageService.signedUrl(body);
  }
}
