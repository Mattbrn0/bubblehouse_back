import { Controller, Body, Post } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post()
  async chat(@Body('messages') messages: any[]) {
    const reply = await this.chatService.getChatResponse(messages);
    return { reply };
  }
}
