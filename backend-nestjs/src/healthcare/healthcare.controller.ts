import { Controller, Get, Query } from '@nestjs/common';
import { HealthcareService } from './healthcare.service';

@Controller('api/healthcare')
export class HealthcareController {
  constructor(private readonly healthcareService: HealthcareService) {}

  @Get()
  getHospitals(@Query('type') type?: string) {
    return this.healthcareService.findAll(type);
  }
}
