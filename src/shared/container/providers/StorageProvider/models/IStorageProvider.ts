import ISaveFileStorageDTO from '../dtos/ISaveFileStorageDTO';

export default interface IStorageProvider {
  saveFile({ file, moduleName }: ISaveFileStorageDTO): Promise<string>;
  // saveTempFile(file: string): Promise<string>;
  deleteFile({ file, moduleName }: ISaveFileStorageDTO): Promise<void>;
}
