import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SupabaseService } from '../supabase/supabase.service';

@Controller('image')
export class ImageController {
  constructor(private readonly supabaseService: SupabaseService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder: string,
  ) {
    const path = `${folder}/${file.originalname}`;
    const uploadedPath = await this.supabaseService.uploadImage(file, path);
    const publicUrl = this.supabaseService.getPublicUrl(uploadedPath);
    return { url: publicUrl };
  }
}
