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
  console.log('📩 Messages envoyés à OpenRouter :', JSON.stringify(messages, null, 2));

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

  console.log('📤 Réponse OpenRouter complète :', JSON.stringify(data, null, 2));

  if (!data.choices || !data.choices[0]) {
    console.log('❌ Pas de contenu dans data.choices');
    return 'Réponse non disponible';
  }

  return data.choices[0].message.content;
}

}
