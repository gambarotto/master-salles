/* eslint-disable @typescript-eslint/no-unused-vars */
import AppError from '@shared/errors/AppError';
import HandleFileName from '@shared/helpers/HandleFileName';
import fs from 'fs';
import sharp from 'sharp';
import IDimensionDTO from '../dtos/IDimensionDTO';
import IHandleImageProvider from '../model/IHandleImageProvider';

/**
 *  const ext = HandleFileName.extractExtension(fileName);
    this.sharpHandleImageProvider.dimension({
      image: `${destination}/uploads/products/${nameFile}`,
      destination,
      filename: nameFile,
      extension: ext,
      height: 200,
      width: 200,
    });
 */

class SharpHandleImageProvider implements IHandleImageProvider {
  public async dimension({
    image,
    destination,
    filename,
    height = 400,
    width = 400,
  }: IDimensionDTO): Promise<void> {
    const newNameImage = `${HandleFileName.extractName(filename)}.webp`;
    const newPath = `${destination}/uploads/products/${newNameImage}`;
    console.log(newNameImage);

    sharp.cache(false);

    const data = await sharp(image)
      .resize({
        width,
        fit: 'cover',
      })
      .toFormat('webp')
      .webp({ quality: 80 })

      .toBuffer();

    // Excluindo imagem antiga
    fs.access(image, err => {
      if (!err) {
        // Se não houver erro, tenta excluir
        fs.unlink(image, error => {
          if (error) console.log(error);
        });
      }
      // Salva o arquivo em buffer
      fs.writeFile(newPath, data, errors => {
        if (errors) {
          throw new AppError('Error on save image web');
        }
      });
      return newPath;
    });
  }
}

export default SharpHandleImageProvider;
