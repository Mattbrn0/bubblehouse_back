import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from './config/config.module';
import { UsersService } from './users/users.service';
import { ChatModule } from './chat/chat.module';
import { SupabaseService } from './supabase/supabase.service';
import { ProfileService } from './profile/profile.service';
import { ProfileModule } from './profile/profile.module';
import { LocalisationService } from './localisation/localisation.service';
import { LocalisationController } from './localisation/localisation.controller';

@Module({
  imports: [UsersModule, ConfigModule, ChatModule, ProfileModule],
  controllers: [AppController, LocalisationController],
  providers: [
    AppService,
    UsersService,
    SupabaseService,
    ProfileService,
    LocalisationService,
  ],
})
export class AppModule {}
