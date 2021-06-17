import Status from '@modules/orders/infra/typeorm/entities/Status';
import FakeStatusRepository from '@modules/orders/repositories/fakes/FakeStatusRepository';
import AppError from '@shared/errors/AppError';
import UpdateStatusService from './UpdateStatusService';

let fakeStatusRepository: FakeStatusRepository;
let updateStatusService: UpdateStatusService;

let status: Status;
describe('Status Update', () => {
  beforeEach(async () => {
    fakeStatusRepository = new FakeStatusRepository();
    updateStatusService = new UpdateStatusService(fakeStatusRepository);

    status = await fakeStatusRepository.create({
      name: 'Processando o Pagamento',
      description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
    });
  });
  it('Should be able create a new status', async () => {
    const statusUp = await updateStatusService.execute({
      status_id: status.id,
      name: 'Processando',
      description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
    });
    expect(statusUp.name).toBe('Processando');
  });
  it('Should be able update a status without pass name or description', async () => {
    const statusUp = await updateStatusService.execute({
      status_id: status.id,
    });
    expect(statusUp.name).toBe('Processando o Pagamento');
  });
  it('Should not be able update a status with invalid id', async () => {
    await expect(
      updateStatusService.execute({
        status_id: 'invalid-id',
        name: 'Processando o Pagamento',
        description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able update a status with name already existent', async () => {
    await fakeStatusRepository.create({
      name: 'Processando',
      description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
    });
    await expect(
      updateStatusService.execute({
        status_id: status.id,
        name: 'Processando',
        description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
