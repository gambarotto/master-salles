import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';
import ISaveFileStorageDTO from '../dtos/ISaveFileStorageDTO';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile({
    file,
    moduleName,
  }: ISaveFileStorageDTO): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.uploadFolder[moduleName], file),
    );
    return file;
  }

  public async deleteFile({
    file,
    moduleName,
  }: ISaveFileStorageDTO): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder[moduleName], file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
