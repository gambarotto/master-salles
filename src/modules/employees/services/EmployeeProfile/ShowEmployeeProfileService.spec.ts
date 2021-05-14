import FakeEmployeesRepository from '@modules/employees/repositories/fakes/FakeEmployeesRepository';
import AppError from '@shared/errors/AppError';
import ShowUserProfileService from './ShowEmployeeProfileService';

let employeesRepository: FakeEmployeesRepository;
let showUserProfileService: ShowUserProfileService;

describe('Show EmployeeProfile', () => {
  beforeEach(() => {
    employeesRepository = new FakeEmployeesRepository();
    showUserProfileService = new ShowUserProfileService(employeesRepository);
  });
  it('Should be able get a employee', async () => {
    const employee = await employeesRepository.create({
      name: 'Diego',
      email: 'diego@diego.com',
      password: '123456',
      responsibility: 'admin',
    });
    const findEmployee = await showUserProfileService.execute({
      employee_id: employee.id,
    });
    expect(findEmployee).toHaveProperty('id');
  });
  it('Should not be able get a employee with a invalid id', async () => {
    await expect(
      showUserProfileService.execute({ employee_id: 'invalid-id' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
