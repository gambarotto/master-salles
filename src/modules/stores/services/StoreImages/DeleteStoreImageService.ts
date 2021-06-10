import { inject, injectable } from 'tsyringe';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import IStoreImagesRepository from '@modules/stores/repositories/IStoreImagesRepository';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  employee_id: string;
  store_image_id: string;
}

@injectable()
class DeleteStoreImageService {
  constructor(
    @inject('StoreImagesRepository')
    private storeImagesRepository: IStoreImagesRepository,
    @inject('StoresRepository')
    private storeRepository: IStoresRepository,
    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    employee_id,
    store_image_id,
  }: IRequest): Promise<void> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Only authenticate employee can do this', 401);
    }
    if (employee.responsibility !== 'admin') {
      throw new AppError('The Employee has no privilegies to do this');
    }

    const storeImage = await this.storeImagesRepository.findById(
      store_image_id,
    );
    if (!storeImage) {
      throw new AppError('Image not found');
    }
    try {
      await this.storeImagesRepository.delete(storeImage.id);
      await this.storageProvider.deleteFile({
        file: storeImage.path,
        moduleName: 'stores',
      });
    } catch (error) {
      throw new AppError('Error on delete store image');
    }
  }
}
export default DeleteStoreImageService;
