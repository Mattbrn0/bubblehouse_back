// src/config/config.service.ts
import * as dotenv from 'dotenv';
dotenv.config(); // Charger les variables d'environnement depuis le fichier .env

import { Injectable } from '@nestjs/common';
import * as postgres from 'postgres';

@Injectable()
export class ConfigService {
  private readonly sql;

  constructor() {
    // Configuration de la connexion à la base de données avec les variables d'environnement
    this.sql = postgres({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_DATABASE,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });
  }

  // Méthode pour accéder à la connexion
  get sqlConnection() {
    return this.sql;
  }
}
