import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import fetch from 'node-fetch';

@Injectable()
export class ChatService {
  [x: string]: any;
  private apiKey: string;
  private baseUrl: string;

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    this.baseUrl = this.configService.get<string>('OPENROUTER_URL');
  }

  async getChatResponse(messages: any[]): Promise<string> {
    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://bubblehouse-frontend.vercel.app',
        'X-Title': 'Bubblehouse',
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo',
        messages,
      }),
    });

    const data = await response.json();
    if (!data.choices || !data.choices[0]) {
      console.log('⚠️ Aucune réponse dans data.choices');
      return 'Réponse non disponible';
}
  }
}
