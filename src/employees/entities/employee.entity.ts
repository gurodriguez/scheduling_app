import { Employee } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class EmployeeEntity implements Employee {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  positionId: string;

  @ApiProperty()
  locationId: number;
}
