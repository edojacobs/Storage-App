import { Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Storage, GetSignedUrlResponse } from "@google-cloud/storage";

export enum Actions {
  read = "read",
  write = "write",
}

@Injectable()
export class StorageBucket {
  private storage: Storage;
  private bucketname: string;

  constructor(configService: ConfigService) {
    this.bucketname = configService.get("STORAGE_NAME");

    const credentials = {
      client_email: configService.get("CLIENT_EMAIL"),
      private_key: configService.get("PRIVATE_KEY"),
      client_id: configService.get("CLIENT_ID"),
      token_url: configService.get("TOKEN_URI"),
    };

    this.storage = new Storage({
      projectId: configService.get("PROJECT_ID"),
      credentials,
    });
  }

  private setCors(): void {
    this.storage.bucket(this.bucketname).setCorsConfiguration([
      {
        origin: ["*"],
        responseHeader: [
          "Content-Type",
          "Access-Control-Allow-Origin",
          "x-goog-resumable",
        ],
        method: ["PUT", "POST"],
        maxAgeSeconds: 3600,
      },
    ]);
  }

  public async signedUrl(filename: string): Promise<GetSignedUrlResponse> {
    this.setCors();
    return await this.storage
      .bucket(this.bucketname)
      .file(filename)
      .getSignedUrl({
        version: "v4",
        contentType: "image/png",
        action: Actions.write,
        expires: Date.now() + 15 * 60 * 1000,
      });
  }
}
