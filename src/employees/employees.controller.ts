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
import { EmployeesService } from './employees.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { EmployeeEntity } from './entities/employee.entity';

@ApiTags('Employees')
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @ApiCreatedResponse({ type: EmployeeEntity })
  async create(@Body() createEmployeeDto: CreateEmployeeDto) {
    try {
      const data = await this.employeesService.create(createEmployeeDto);
      return data;
    } catch (error) {
      console.log(error);
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Get()
  @ApiOperation({
    summary: 'Get employees List paginated and also filtered by name',
  })
  @ApiOkResponse({ type: EmployeeEntity, isArray: true })
  @ApiQuery({ name: 'take', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  @ApiQuery({
    name: 'name',
    required: false,
    type: 'string',
    description: ' Find by name',
  })
  findAll(
    @Query('take') _take = 10,
    @Query('page') _skip = 0,
    @Query('name') _name = '',
  ) {
    if (_skip > 0) _skip--; //Page based in number 1 and ahead
    let where = {};
    if (_name) {
      where = {
        name: {
          startsWith: _name,
        },
      };
    }
    return this.employeesService.findAll({ take: +_take, skip: +_skip, where });
  }

  @Get(':id')
  @ApiOkResponse({ type: EmployeeEntity })
  async findOne(@Param('id') id: string) {
    const data = await this.employeesService.findOne({ id: +id });
    if (!data) {
      throw new NotFoundException('Record not found');
    }
    return data;
  }

  @Patch(':id')
  @ApiOkResponse({ type: EmployeeEntity })
  @ApiBody({ type: UpdateEmployeeDto })
  async update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto,
  ) {
    try {
      return await this.employeesService.update({
        where: { id: Number(id) },
        data: updateEmployeeDto,
      });
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  @Delete(':id')
  @ApiOkResponse({ type: EmployeeEntity })
  async remove(@Param('id') id: string) {
    try {
      const data = await this.employeesService.remove({ id: +id });
      return data;
    } catch (error) {
      throw new NotFoundException('Record not found');
    }
  }

  @Get('schedule/:id')
  @ApiOkResponse({ type: EmployeeEntity, isArray: true })
  @ApiOperation({
    summary: 'List an employee’s upcoming schedule',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Employee Id',
  })
  async findSchedule(@Param('id') id: string) {
    return this.employeesService.findSchedule({ id: +id });
  }
}
