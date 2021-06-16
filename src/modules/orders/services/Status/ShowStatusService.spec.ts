import Status from '@modules/orders/infra/typeorm/entities/Status';
import FakeStatusRepository from '@modules/orders/repositories/fakes/FakeStatusRepository';
import AppError from '@shared/errors/AppError';
import ShowStatusService from './ShowStatusService';

let fakeStatusRepository: FakeStatusRepository;
let showStatusService: ShowStatusService;

let status: Status;
describe('Status Create', () => {
  beforeEach(async () => {
    fakeStatusRepository = new FakeStatusRepository();
    showStatusService = new ShowStatusService(fakeStatusRepository);

    status = await fakeStatusRepository.create({
      name: 'Processando o Pagamento',
      description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
    });
  });
  it('Should be able show a status', async () => {
    const statusRec = await showStatusService.execute(status.id);
    expect(statusRec).toHaveProperty('id');
  });
  it('Should not be able show a status with invalid id', async () => {
    await expect(
      showStatusService.execute('invalid-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
