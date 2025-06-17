import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Query,
  Body,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { Chat } from '../models/chat.model';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { user } from 'src/User/Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { MessageService } from '../services/message.service';
import { getMessageDto } from '../DTOs/Messages/getMessage.dto';
import { Message } from '../models/message.model';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  /**
   * Create a new chat
   * POST /chats
   */

  /**
   * Get all chats for a user
   * GET /chats/user/:userId?skip=0&take=5
   */
  @Get(':chatId')
  @UseGuards(AuthGuard)
  @serialize(getMessageDto)
  async getMessages(
    @user() user: userToken,
    @Param('chatId') chatId: string,
    @Query('skip') skip = 0,
    @Query('take') take = 5,
  ): Promise<Message[]> {
    return await this.messageService.getMessageWithChat(
      chatId,
      user.sub,
      Number(skip),
      Number(take),
    );
  }
}
