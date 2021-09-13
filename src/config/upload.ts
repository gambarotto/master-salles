import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';
import path from 'path';

/** Correção p/ o erro
 * O elemento implicitamente tem um tipo 'any'
 * porque a expressão do tipo 'string' não pode ser usada para o tipo de índice
 */
interface IUploadFolder {
  [key: string]: string;
}
interface IUploadConfig {
  tempFolder: string;
  uploadFolder: IUploadFolder;
  storage: StorageEngine;
}

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');
const uploadConfig: IUploadConfig = {
  tempFolder,
  uploadFolder: {
    users: path.resolve(tempFolder, 'uploads', 'users'),
    employees: path.resolve(tempFolder, 'uploads', 'employees'),
    stores: path.resolve(tempFolder, 'uploads', 'stores'),
    products: path.resolve(tempFolder, 'uploads', 'products'),
    categories: path.resolve(tempFolder, 'uploads', 'categories'),
  },
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`.replace(/ /g, '');
      return callback(null, fileName);
    },
  }),
};
export default uploadConfig;
