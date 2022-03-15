import { Injectable } from "@nestjs/common";
import { UploadDto } from "./dto/upload-file.dto";
import { StorageBucket } from "./storage.api";

@Injectable()
export class StorageService {
  constructor(private readonly storage: StorageBucket) {}

  async signedUrl(content: UploadDto): Promise<any> {
    const [url] = await this.storage.signedUrl(content.name);
    return { url, size: content.size };
  }
}
