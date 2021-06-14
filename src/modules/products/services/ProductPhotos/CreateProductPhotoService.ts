import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import ProductPhoto from '@modules/products/infra/typeorm/entities/ProductPhoto';
import IProductPhotosRepository from '@modules/products/repositories/IProductPhotosRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  employee_id: string;
  originalName: string;
  nameFile: string;
  product_id: string;
}

@injectable()
class CreateProductPhotoService {
  constructor(
    @inject('ProductPhotosRepository')
    private productPhotoRepository: IProductPhotosRepository,
    @inject('ProductsRepository')
    private productRepository: IProductsRepository,
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    employee_id,
    originalName,
    nameFile,
    product_id,
  }: IRequest): Promise<ProductPhoto> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Employee not found');
    }
    if (employee.responsibility !== 'admin') {
      throw new AppError('The Employee has no privilegies to do this');
    }
    const product = await this.productRepository.findById({
      product_id,
    });
    if (!product) {
      throw new AppError('Product not found');
    }

    const fileName = await this.storageProvider.saveFile({
      file: nameFile,
      moduleName: 'products',
    });
    const productPhoto = await this.productPhotoRepository.create({
      name: originalName,
      path: fileName,
      product_id,
    });
    return productPhoto;
  }
}
export default CreateProductPhotoService;
