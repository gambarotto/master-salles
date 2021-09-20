import { container } from 'tsyringe';
import ImageminProvider from './implementations/ImageminProvider';
import ICompressImageProvider from './models/ICompressImageProvider';

const providers = {
  imagemin: ImageminProvider,
};

container.registerSingleton<ICompressImageProvider>(
  'CompressImageProvider',
  providers.imagemin,
);
