import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ShiftsService } from './shifts.service';
import { CreateShiftDto } from './dto/create-shift.dto';
import { UpdateShiftDto } from './dto/update-shift.dto';
import { ShiftEntity } from './entities/shift.entity';
import { AssignShiftDto } from './dto/assign-shift.dto';

@ApiTags('Shifts')
@Controller('shifts')
export class ShiftsController {
  constructor(private readonly shiftsService: ShiftsService) {}

  @Post()
  @ApiCreatedResponse({ type: ShiftEntity })
  async create(@Body() createShiftDto: CreateShiftDto) {
    try {
      const data = await this.shiftsService.create(createShiftDto);
      return data;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Get()
  @ApiOkResponse({ type: ShiftEntity, isArray: true })
  @ApiQuery({ name: 'take', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  findAll(@Query('take') _take = 10, @Query('page') _skip = 0) {
    if (_skip > 0) _skip--; //Page based in number 1 and ahead
    return this.shiftsService.findAll({ take: +_take, skip: +_skip });
  }

  @Get(':id')
  @ApiOkResponse({ type: ShiftEntity })
  async findOne(@Param('id') id: string) {
    const data = await this.shiftsService.findOne({ id: +id });
    if (!data) {
      throw new NotFoundException('Record not found');
    }
    return data;
  }

  @Patch(':id')
  @ApiOkResponse({ type: ShiftEntity })
  @ApiBody({ type: UpdateShiftDto })
  async update(
    @Param('id') id: string,
    @Body() updateShiftDto: UpdateShiftDto,
  ) {
    try {
      return await this.shiftsService.update({
        where: { id: Number(id) },
        data: updateShiftDto,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: ShiftEntity })
  async remove(@Param('id') id: string) {
    try {
      const data = await this.shiftsService.remove({ id: +id });
      return data;
    } catch (error) {
      throw new NotFoundException('Record not found');
    }
  }

  @Get('unassigned/:locationId')
  @ApiOkResponse({ type: ShiftEntity, isArray: true })
  @ApiQuery({ name: 'take', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiOperation({
    summary: 'List unassigned shifts in the future at a facility',
  })
  @ApiParam({
    name: 'locationId',
    required: true,
    description: 'Location Id',
  })
  async findUnassigned(
    @Query('take') _take = 10,
    @Query('page') _skip = 0,
    @Param('locationId') locationId: string,
  ) {
    if (_skip > 0) _skip--; //Page based in number 1 and ahead

    const where = {
      locationId: +locationId,
      startsAt: {
        // Unassigned from Now to the future.
        gte: new Date(),
      },
      employeeId: null,
    };

    return this.shiftsService.findAll({ take: +_take, skip: +_skip, where });
  }

  @Patch('assign/:id')
  @ApiOkResponse({ type: ShiftEntity })
  @ApiBody({ type: AssignShiftDto })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Shift Id',
  })
  @ApiOperation({
    summary: 'Assign an employee to a shift',
  })
  async assignEmployee(
    @Param('id') id: string,
    @Body() updateShiftDto: AssignShiftDto,
  ) {
    try {
      //Biz logic here, like validations of status, positions, etc
      return await this.shiftsService.update({
        where: { id: Number(id) },
        data: updateShiftDto,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Get('unassign/:id')
  @ApiOkResponse({ type: ShiftEntity })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Shift Id',
  })
  @ApiOperation({
    summary: 'Unassign an employee to a shift / remove employee from shift',
  })
  async unassignEmployee(@Param('id') id: string) {
    try {
      //Biz logic here, like validations of status, positions, etc when unassing
      return await this.shiftsService.update({
        where: { id: Number(id) },
        data: { employeeId: null },
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }
}
