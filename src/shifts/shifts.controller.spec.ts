import { Test, TestingModule } from '@nestjs/testing';
import { ShiftsController } from './shifts.controller';
import { ShiftsService } from './shifts.service';
import { PrismaService } from '../prisma.service';

describe('ShiftsController', () => {
  let controller: ShiftsController;
  let service: ShiftsService;
  const shift = {
    id: 0,
    startsAt: new Date(),
    endsAt: new Date(),
    positionId: 'string',
    statusId: 'string',
    locationId: 0,
    employeeId: 0,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShiftsController],
      providers: [
        ShiftsService,
        {
          provide: PrismaService,
          useValue: jest.fn(),
        },
      ],
    }).compile();

    controller = module.get<ShiftsController>(ShiftsController);
    service = module.get<ShiftsService>(ShiftsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of shifts', async () => {
      const result = [shift];
      jest.spyOn(service, 'findAll').mockImplementation(async () => result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return one shift', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(async () => shift);

      expect(await controller.findOne('mock-id')).toBe(shift);
    });
  });

  describe('create', () => {
    it('should create a new shift', async () => {
      const body = {
        startsAt: new Date(),
        endsAt: new Date(),
        positionId: 'string',
        statusId: 'string',
        locationId: 0,
        employeeId: 0,
      };
      jest.spyOn(service, 'create').mockImplementation(async () => shift);

      expect(await controller.create(body)).toBe(shift);
    });
  });

  describe('update', () => {
    it('should update the shift', async () => {
      const body = {
        name: 'string',
        positionId: 'string',
        locationId: 0,
      };
      jest.spyOn(service, 'update').mockImplementation(async () => shift);

      expect(await controller.update('mock-id', body)).toBe(shift);
    });
  });

  describe('remove', () => {
    it('should delete the shift', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => shift);

      expect(await controller.remove('mock-id')).toBe(shift);
    });
  });

  describe('assignEmployee', () => {
    it('should asign employee to a shift', async () => {
      const body = {
        employeeId: 0,
      };
      jest.spyOn(service, 'update').mockImplementation(async () => shift);

      expect(await controller.assignEmployee('mock-id', body)).toBe(shift);
    });
  });

  describe('unassignEmployee', () => {
    it('should unasign employee to a shift', async () => {
      jest.spyOn(service, 'update').mockImplementation(async () => shift);

      expect(await controller.unassignEmployee('mock-id')).toBe(shift);
    });
  });
});
