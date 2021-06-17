import Status from '@modules/orders/infra/typeorm/entities/Status';
import FakeStatusRepository from '@modules/orders/repositories/fakes/FakeStatusRepository';
import AppError from '@shared/errors/AppError';
import DeleteStatusService from './DeleteStatusService';

let fakeStatusRepository: FakeStatusRepository;
let deleteStatusService: DeleteStatusService;

let status: Status;
describe('Status Delete', () => {
  beforeEach(async () => {
    fakeStatusRepository = new FakeStatusRepository();
    deleteStatusService = new DeleteStatusService(fakeStatusRepository);

    status = await fakeStatusRepository.create({
      name: 'Processando o Pagamento',
      description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
    });
  });
  it('Should be able delete a status', async () => {
    await deleteStatusService.execute(status.id);
    const statuses = await fakeStatusRepository.findAll();
    expect(statuses).toHaveLength(0);
  });
  it('Should not be able delete a status with invalid id', async () => {
    await expect(
      deleteStatusService.execute('invalid-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
