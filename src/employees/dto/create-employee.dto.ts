import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  name: string;

  @ApiProperty({
    description: 'rn, lpn, cna',
    default: 'rn',
  })
  positionId: string;

  @ApiProperty()
  locationId: number;
}