import ISaveFileStorageDTO from '../dtos/ISaveFileStorageDTO';
import IStorageProvider from '../models/IStorageProvider';

interface IFakeDiskStorage {
  file: string;
  folder: string;
}
class FakeDiskStorageProvider implements IStorageProvider {
  storage: IFakeDiskStorage[] = [];

  public async saveFile({
    file,
    moduleName,
  }: ISaveFileStorageDTO): Promise<string> {
    this.storage.push({ file, folder: moduleName });
    return file;
  }

  public async deleteFile({ file }: ISaveFileStorageDTO): Promise<void> {
    const findIndex = this.storage.findIndex(f => f.file === file);
    this.storage.splice(findIndex, 1);
  }
}

export default FakeDiskStorageProvider;
