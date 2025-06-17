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
import { ChatService } from '../services/chat.service';
import { createChatDto } from '../DTOs/Chats/createChat.dto';
import { Chat } from '../models/chat.model';
import { serialize } from 'shared/Interceptors/Serialize.Interceptor';
import { AuthGuard } from 'src/Auth/Gaurds/auth.gaurd';
import { user } from 'src/User/Decorators/user.decorator';
import { userToken } from 'src/models/userToken.model';
import { RoleGuard } from 'src/Auth/Gaurds/Role.gaurd';
import { roles } from 'src/Auth/Decorators/Roles.decorator';
import { UserType } from 'src/constants';
import { kafeel } from 'src/Kafeel/kafeel.model';

@Controller('chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  /**
   * Create a new chat
   * POST /chats
   */
  @Post()
  @serialize()
  @UseGuards(AuthGuard, RoleGuard)
  // @roles(UserType.KAFEEL)
  async createChat(
    @user() user: userToken,
    @Body() createDto: createChatDto,
  ): Promise<Chat> {
    return await this.chatService.createChat(user.sub, createDto);
  }

  /**
   * Get all chats for a user
   * GET /chats/user/:userId?skip=0&take=5
   */
  @Get('user/:userId')
  @UseGuards(AuthGuard)
  @serialize()
  async getChatsForUser(
    @user() user: userToken,
    @Query('skip', ParseIntPipe) skip = 0,
    @Query('take', ParseIntPipe) take = 5,
  ): Promise<Chat[]> {
    return await this.chatService.getChatsForUser(user.sub, skip, take);
  }

  /**
   * Get a specific chat by ID
   * GET /chats/:id
   */
  @Get(':id')
  @UseGuards(AuthGuard)
  @serialize()
  async getChatById(
    @Param('id') id: string,
    @user() user: userToken,
  ): Promise<Chat> {
    return await this.chatService.chatById(id, user.sub);
  }
}
