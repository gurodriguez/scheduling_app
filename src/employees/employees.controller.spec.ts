import { Test, TestingModule } from '@nestjs/testing';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';
import { PrismaService } from '../prisma.service';

describe('EmployeesController', () => {
  let controller: EmployeesController;
  let service: EmployeesService;
  const employee = {
    id: 0,
    name: 'string',
    positionId: 'string',
    locationId: 0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmployeesController],
      providers: [
        EmployeesService,
        {
          provide: PrismaService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<EmployeesController>(EmployeesController);
    service = module.get<EmployeesService>(EmployeesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of employees', async () => {
      const result = [employee];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one employee', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => employee);

      expect(await controller.findOne('mock-id')).toBe(employee);
    });
  });

  describe('create', () => {
    it('should create a new employee', async () => {
      const body = {
        name: 'string',
        positionId: 'string',
        locationId: 0,
      };
      jest.spyOn(service, 'create').mockImplementation(async () => employee);

      expect(await controller.create(body)).toBe(employee);
    });
  });

  describe('update', () => {
    it('should update the employee', async () => {
      const body = {
        name: 'string',
        positionId: 'string',
        locationId: 0,
      };
      jest.spyOn(service, 'update').mockImplementation(async () => employee);

      expect(await controller.update('mock-id', body)).toBe(employee);
    });
  });

  describe('remove', () => {
    it('should delete the employee', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => employee);

      expect(await controller.remove('mock-id')).toBe(employee);
    });
  });

  describe('findSchedule', () => {
    it('should list an employee’s upcoming schedule', async () => {
      const employeeSchedule = {
        ...employee,
        shifts: ['mock-shift'],
      };
      jest
        .spyOn(service, 'findSchedule')
        .mockImplementation(async () => employeeSchedule);

      expect(await controller.findSchedule('mock-id')).toBe(employeeSchedule);
    });
  });
});
