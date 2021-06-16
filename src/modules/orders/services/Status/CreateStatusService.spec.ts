import FakeStatusRepository from '@modules/orders/repositories/fakes/FakeStatusRepository';
import AppError from '@shared/errors/AppError';
import CreateStatusService from './CreateStatusService';

let fakeStatusRepository: FakeStatusRepository;
let createStatusService: CreateStatusService;

describe('Status Create', () => {
  beforeEach(() => {
    fakeStatusRepository = new FakeStatusRepository();
    createStatusService = new CreateStatusService(fakeStatusRepository);
  });
  it('Should be able create a new status', async () => {
    const status = await createStatusService.execute({
      name: 'Processando o Pagamento',
      description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
    });
    expect(status).toHaveProperty('id');
  });
  it('Should not be able create a new status with same name', async () => {
    await createStatusService.execute({
      name: 'Processando o Pagamento',
      description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
    });

    await expect(
      createStatusService.execute({
        name: 'Processando o Pagamento',
        description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
