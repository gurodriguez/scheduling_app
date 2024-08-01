import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Shift, Prisma } from '@prisma/client';

@Injectable()
export class ShiftsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.ShiftUncheckedCreateInput): Promise<Shift> {
    return this.prisma.shift.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ShiftWhereUniqueInput;
    where?: Prisma.ShiftWhereInput;
    orderBy?: Prisma.ShiftOrderByWithRelationInput;
  }): Promise<Shift[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.shift.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        employee: true,
        location: true,
      },
    });
  }

  findOne(
    shiftWhereInputWhereUniqueInput: Prisma.ShiftWhereUniqueInput,
  ): Promise<Shift | null> {
    return this.prisma.shift.findUnique({
      where: shiftWhereInputWhereUniqueInput,
      include: {
        employee: true,
        location: true,
      },
    });
  }

  update(params: {
    where: Prisma.ShiftWhereUniqueInput;
    data: Prisma.ShiftUncheckedUpdateInput;
  }): Promise<Shift> {
    const { data, where } = params;
    return this.prisma.shift.update({
      data,
      where,
    });
  }

  remove(where: Prisma.ShiftWhereUniqueInput): Promise<Shift> {
    return this.prisma.shift.delete({
      where,
    });
  }
}
