import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { LocationsService } from './locations.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { LocationEntity } from './entities/location.entity';

@ApiTags('Locations')
@Controller('locations')
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Post()
  @ApiCreatedResponse({ type: LocationEntity })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }

  @Get()
  @ApiOkResponse({ type: LocationEntity, isArray: true })
  @ApiQuery({ name: 'take', required: false, type: 'number' })
  @ApiQuery({ name: 'page', required: false, type: 'number' })
  findAll(@Query('take') _take = 10, @Query('page') _skip = 0) {
    if (_skip > 0) _skip--; //Page based in number 1 and ahead
    return this.locationsService.findAll({ take: +_take, skip: +_skip });
  }

  @Get(':id')
  @ApiOkResponse({ type: LocationEntity })
  findOne(@Param('id') id: string) {
    return this.locationsService.findOne({ id: +id });
  }

  @Patch(':id')
  @ApiOkResponse({ type: LocationEntity })
  @ApiBody({ type: UpdateLocationDto })
  update(
    @Param('id') id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update({
      where: { id: Number(id) },
      data: updateLocationDto,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: LocationEntity })
  @ApiExcludeEndpoint()
  remove(@Param('id') id: string) {
    return this.locationsService.remove({ id: +id });
  }
}
