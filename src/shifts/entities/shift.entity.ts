import { Shift } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ShiftEntity implements Shift {
  @ApiProperty()
  id: number;

  @ApiProperty()
  startsAt: Date;

  @ApiProperty()
  endsAt: Date;

  @ApiProperty()
  positionId: string;

  @ApiProperty()
  statusId: string;

  @ApiProperty()
  locationId: number;

  @ApiProperty()
  employeeId: number;
}
