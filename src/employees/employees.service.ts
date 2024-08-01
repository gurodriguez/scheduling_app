import { Injectable } from '@nestjs/common';
import { Employee, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EmployeesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.EmployeeUncheckedCreateInput): Promise<Employee> {
    return this.prisma.employee.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeeWhereUniqueInput;
    where?: Prisma.EmployeeWhereInput;
    orderBy?: Prisma.EmployeeOrderByWithRelationInput;
  }): Promise<Employee[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.employee.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        location: true,
        position: true,
      },
    });
  }

  findOne(
    employeeWhereInputWhereUniqueInput: Prisma.EmployeeWhereUniqueInput,
  ): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: employeeWhereInputWhereUniqueInput,
      include: {
        position: true,
        location: true,
        shifts: true,
      },
    });
  }

  update(params: {
    where: Prisma.EmployeeWhereUniqueInput;
    data: Prisma.EmployeeUncheckedUpdateInput;
  }): Promise<Employee> {
    const { data, where } = params;
    return this.prisma.employee.update({
      data,
      where,
    });
  }

  remove(where: Prisma.EmployeeWhereUniqueInput): Promise<Employee> {
    return this.prisma.employee.delete({
      where,
    });
  }

  findSchedule(
    employeeWhereInputWhereUniqueInput: Prisma.EmployeeWhereUniqueInput,
  ): Promise<Employee | null> {
    return this.prisma.employee.findUnique({
      where: employeeWhereInputWhereUniqueInput,
      include: {
        position: true,
        location: true,
        shifts: {
          where: {
            startsAt: {
              // Unassigned from Now to the future.
              gte: new Date(),
            },
          },
        },
      },
    });
  }
}
