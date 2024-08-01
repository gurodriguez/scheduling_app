import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';
import { ShiftsModule } from './shifts/shifts.module';
import { LocationsModule } from './locations/locations.module';

@Module({
  imports: [ConfigModule, EmployeesModule, ShiftsModule, LocationsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
