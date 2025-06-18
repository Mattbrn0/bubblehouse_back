// src/config/config.service.ts
import * as dotenv from 'dotenv';
dotenv.config();

import { Injectable } from '@nestjs/common';
import postgres = require('postgres');

@Injectable()
export class ConfigService {
  private readonly sql;

  constructor() {
    const connectionString = process.env.DATABASE_URL;
    this.sql = postgres(connectionString, {
      // options si besoin
    });
  }

  get sqlConnection() {
    return this.sql;
  }
}
