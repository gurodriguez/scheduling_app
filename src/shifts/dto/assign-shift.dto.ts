import { ApiProperty } from '@nestjs/swagger';

export class AssignShiftDto {
  @ApiProperty({ required: true })
  employeeId: number;
}
