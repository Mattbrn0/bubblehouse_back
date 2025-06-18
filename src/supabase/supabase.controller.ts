import { Controller, Get } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Controller('meditations')
export class SupabaseController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Get()
  async getMeditationImages() {
    const { data, error } =
      await this.supabaseService.listImages('meditation/');
    if (error) throw new Error(error.message);

    return data.map((item) =>
      this.supabaseService.getPublicUrl(`meditation/${item.name}`),
    );
  }
}
