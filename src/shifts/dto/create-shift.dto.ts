import { ApiProperty } from '@nestjs/swagger';

export class CreateShiftDto {
  @ApiProperty()
  startsAt: Date;

  @ApiProperty()
  endsAt: Date;

  @ApiProperty({
    description: 'rn, lpn, cna',
    default: 'rn',
  })
  positionId: string;

  @ApiProperty({
    description: 'open, closed, filled',   
    default: 'open',
  })
  statusId: string;

  @ApiProperty()
  locationId: number;

  @ApiProperty({ required: false, nullable: true })
  employeeId: number | null;
}
