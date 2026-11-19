import { Controller, Get, Query } from '@nestjs/common';
import { UpazilasService } from './upazilas.service';

@Controller('api/upazilas')
export class UpazilasController {
  constructor(private readonly upazilasService: UpazilasService) {}

  @Get()
  getUpazilas(@Query('q') query?: string) {
    return this.upazilasService.findAll(query);
  }
}

