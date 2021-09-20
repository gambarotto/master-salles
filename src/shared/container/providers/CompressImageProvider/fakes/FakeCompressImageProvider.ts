import { Result } from 'imagemin';
import ICompressImageDTO from '../dtos/ICompressImageDTO';

class FakeCompressImageProvider {
  async compressAndSaveImage(_data: ICompressImageDTO): Promise<Result[]> {
    // eslint-disable-next-line no-lone-blocks
    {
      return [
        {
          data: Buffer.from([8, 6, 7, 5, 3, 0, 9]),
          sourcePath: 'path',
          destinationPath: 'destinationPath',
        },
      ];
    }
  }
}
export default FakeCompressImageProvider;
