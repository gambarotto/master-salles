import FakeStatusRepository from '@modules/orders/repositories/fakes/FakeStatusRepository';
import ListStatusService from './ListStatusService';

let fakeStatusRepository: FakeStatusRepository;
let listStatusService: ListStatusService;

describe('Status Create', () => {
  beforeEach(async () => {
    fakeStatusRepository = new FakeStatusRepository();
    listStatusService = new ListStatusService(fakeStatusRepository);

    await fakeStatusRepository.create({
      name: 'Processando o Pagamento',
      description: 'jyhgtffddfjhjkkkkkkkkkkgggggggggrrrrrrrr',
    });
  });
  it('Should be able show a status', async () => {
    const statusRec = await listStatusService.execute();
    expect(statusRec).toHaveLength(1);
  });
});
