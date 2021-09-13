import imagemin, { Result } from 'imagemin';
import path from 'path';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import uploadConfig from '@config/upload';
import ICompressImageProvider from '../models/ICompressImageProvider';
import ICompressImageDTO from '../dtos/ICompressImageDTO';

class ImageminProvider implements ICompressImageProvider {
  async compressAndSaveImage({
    filename,
    moduleName,
  }: ICompressImageDTO): Promise<Result[]> {
    const files = await imagemin(
      [path.resolve(uploadConfig.tempFolder, filename)],
      {
        destination: path.resolve(uploadConfig.uploadFolder[moduleName]),
        plugins: [
          imageminMozjpeg({ quality: 50 }),
          imageminPngquant({
            quality: [0.6, 0.8],
          }),
        ],
      },
    );
    return files;
  }
}
export default ImageminProvider;
