import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { UserService } from 'src/User/user.service';
import { createChatDto } from '../DTOs/Chats/createChat.dto';
import { Chat } from '../models/chat.model';
import { MessageRepository } from '../repositories/message.repository';
import { CreateMessageDto } from '../DTOs/Messages/createMessage.dto';
import { MessageType } from 'src/constants';
import { Message } from '../models/message.model';
import { getMessageDto } from '../DTOs/Messages/getMessage.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepo: MessageRepository,
    private readonly userService: UserService,
  ) {}

  /**
   * Create a new chat with specified member IDs
   */
  async getMessageWithChat(
    chatId: string,
    userId: string,
  ): Promise<getMessageDto[]> {
    const result = await this.messageRepo.findAll({
      where: [
        { chatId: chatId, recieverId: userId },
        { chatId: chatId, senderId: userId },
      ],
    });
    return plainToInstance(getMessageDto, result, {
      excludeExtraneousValues: true,
    });
  }
  async createMessage(
    createMessage: CreateMessageDto,
    userId: string,
  ): Promise<Message> {
    // Fetch user entities for each member

    const chat = await this.messageRepo.findById(createMessage.chatId);

    const sender = await this.userService.getUserById(userId);

    return await this.messageRepo.create({
      sender: sender,
      chat: chat,
      messageType: MessageType.TEXT,
      content: createMessage.content,
    });
  }
}
