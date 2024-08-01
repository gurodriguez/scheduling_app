import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Location, Prisma } from '@prisma/client';

@Injectable()
export class LocationsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.LocationCreateInput): Promise<Location> {
    return this.prisma.location.create({
      data,
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.LocationWhereUniqueInput;
    where?: Prisma.LocationWhereInput;
    orderBy?: Prisma.LocationOrderByWithRelationInput;
  }): Promise<Location[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.location.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  findOne(
    locationWhereInputWhereUniqueInput: Prisma.LocationWhereUniqueInput,
  ): Promise<Location | null> {
    return this.prisma.location.findUnique({
      where: locationWhereInputWhereUniqueInput,
      include: {
        employees: true,
        shifts: true,
      },
    });
  }

  update(params: {
    where: Prisma.LocationWhereUniqueInput;
    data: Prisma.LocationUpdateInput;
  }): Promise<Location> {
    const { data, where } = params;
    return this.prisma.location.update({
      data,
      where,
    });
  }

  remove(where: Prisma.LocationWhereUniqueInput): Promise<Location> {
    return this.prisma.location.delete({
      where,
    });
  }
}
