import { inject, injectable } from 'tsyringe';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import IProductPhotosRepository from '@modules/products/repositories/IProductPhotosRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  employee_id: string;
  product_photo_id: string;
}

@injectable()
class DeleteProductPhotoService {
  constructor(
    @inject('ProductPhotosRepository')
    private productPhotoRepository: IProductPhotosRepository,
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    employee_id,
    product_photo_id,
  }: IRequest): Promise<void> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Employee not found');
    }
    if (employee.responsibility !== 'admin') {
      throw new AppError('The Employee has no privilegies to do this');
    }
    const photo = await this.productPhotoRepository.findById(product_photo_id);
    if (!photo) {
      throw new AppError('Image not found');
    }
    await this.productPhotoRepository.delete(photo.id);
    await this.storageProvider.deleteFile({
      file: photo.path,
      moduleName: 'products',
    });
  }
}
export default DeleteProductPhotoService;
