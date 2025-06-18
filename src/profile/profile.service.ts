import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import supabase from '../../config/supabase';

@Injectable()
export class ProfileService {
  async create(createProfileDto: CreateProfileDto) {
    const { data, error } = await supabase
      .from('profiles')
      .insert([
        {
          ...createProfileDto,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ])
      .single();

    if (error) throw error;
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...updateProfileDto,
        updated_at: new Date(),
      })
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  }

  async remove(id: string) {
    const { error } = await supabase.from('profiles').delete().eq('id', id);

    if (error) throw error;
    return { message: 'Profil supprimé' };
  }
}
