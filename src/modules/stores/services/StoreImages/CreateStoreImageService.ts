import { inject, injectable } from 'tsyringe';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import StoreImage from '@modules/stores/infra/typeorm/entities/StoreImage';
import IStoreImagesRepository from '@modules/stores/repositories/IStoreImagesRepository';
import IStoresRepository from '@modules/stores/repositories/IStoresRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  employee_id: string;
  store_id: string;
  nameFile: string;
}

@injectable()
class CreateStoreImageService {
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
    store_id,
    nameFile,
  }: IRequest): Promise<StoreImage> {
    const employee = await this.employeesRepository.findById(employee_id);
    if (!employee) {
      throw new AppError('Only authenticate employee can do this', 401);
    }
    if (employee.responsibility !== 'admin') {
      throw new AppError('The Employee has no privilegies to do this');
    }
    const store = await this.storeRepository.findById({
      store_id,
    });

    if (!store) {
      throw new AppError('Store not found');
    }
    const fileName = await this.storageProvider.saveFile({
      file: nameFile,
      moduleName: 'stores',
    });
    const name = fileName
      .split('-')
      .filter((element, index) => index > 0 && element)
      .toString()
      .replace(/,/g, '-');

    const storeImage = await this.storeImagesRepository.create({
      store_id,
      path: fileName,
      name,
    });

    return storeImage;
  }
}
export default CreateStoreImageService;
