import { BaseRemoteDataSource } from "@/data/shared/remote";
import { imageDto, type TImageDto } from "./dto";

export class ImageRemoteDataSource extends BaseRemoteDataSource {
  public prefix = "/image";

  async upload(file: File): Promise<TImageDto> {
    const res = await this.rpcMultipartCall(
      this.prefix,
      "image.upload",
      {},
      file,
    );
    return imageDto.parse(res);
  }
}
