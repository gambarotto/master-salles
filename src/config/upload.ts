import multer from 'multer';
import crypto from 'crypto';
import path from 'path';

const tempFolder = path.resolve(__dirname, '..', '..', 'temp');
export default {
  tempFolder,
  uploadFolder: {
    users: path.resolve(tempFolder, 'uploads', 'users'),
    employees: path.resolve(tempFolder, 'uploads', 'employees'),
    stores: path.resolve(tempFolder, 'uploads', 'stores'),
    products: path.resolve(tempFolder, 'uploads', 'products'),
  },
  storage: multer.diskStorage({
    destination: tempFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`.replace(/ /g, '-');
      return callback(null, fileName);
    },
  }),
};
