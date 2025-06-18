// src/supabase/supabase.service.ts
import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabase;

  constructor() {
    this.supabase = createClient(
      process.env.DATABASE_URL,
      process.env.DATABASE_KEY,
    );
  }

  async uploadImage(file: Express.Multer.File, path: string) {
    const { data, error } = await this.supabase.storage
      .from('urlexercice')
      .upload(path, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (error) throw new Error(error.message);
    return data.path;
  }

  async listImages(folder: string) {
    return await this.supabase.storage.from('urlexercice').list(folder, {
      limit: 5,
      offset: 0,
    });
  }

  getPublicUrl(path: string) {
    return this.supabase.storage.from('urlexercice').getPublicUrl(path).data
      .publicUrl;
  }
}
