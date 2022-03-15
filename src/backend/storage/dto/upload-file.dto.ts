import { IsNotEmpty, MinLength } from "class-validator";

export class UploadDto {
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsNotEmpty()
  size: number;
}
