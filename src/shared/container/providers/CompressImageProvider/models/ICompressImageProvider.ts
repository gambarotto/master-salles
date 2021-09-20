import { Result } from 'imagemin';
import ICompressImageDTO from '../dtos/ICompressImageDTO';

export default interface ICompressImageProvider {
  compressAndSaveImage({
    filename,
    moduleName,
  }: ICompressImageDTO): Promise<Result[]>;
}
