import { Module } from '@nestjs/common';
import { UpazilasController } from './upazilas/upazilas.controller';
import { UpazilasService } from './upazilas/upazilas.service';
import { CommunityController } from './community/community.controller';
import { CommunityService } from './community/community.service';
import { HealthcareController } from './healthcare/healthcare.controller';
import { HealthcareService } from './healthcare/healthcare.service';
import { SupabaseService } from './supabase/supabase.service';

@Module({
  imports: [],
  controllers: [UpazilasController, CommunityController, HealthcareController],
  providers: [UpazilasService, CommunityService, HealthcareService, SupabaseService],
})
export class AppModule {}

