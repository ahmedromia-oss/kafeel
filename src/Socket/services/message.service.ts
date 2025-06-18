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
import { take } from 'rxjs';
import { ChatService } from './chat.service';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageRepo: MessageRepository,
    private readonly userService: UserService,
    private readonly chatService: ChatService,
  ) {}

  /**
   * Create a new chat with specified member IDs
   */
  async getMessageWithChat(
    chatId: string,
    userId: string,
    skip?: number,
    take?: number,
  ): Promise<Message[]> {
    return await this.messageRepo.findAllMessages(chatId, userId, skip, take);
  }
  async createMessage(
    createMessage: CreateMessageDto,
    userId: string,
  ): Promise<Message> {
    // Fetch user entities for each member

    const chat = await this.chatService.getChatById(createMessage.chatId);

    if (chat.members.find((e) => e.id == userId)) {
      const reciever = chat.members.find((e) => e.id != userId);
      const sender = chat.members.find((e) => e.id == userId);

      const message = await this.messageRepo.create({
        reciever: reciever,
        sender: sender,
        chat: chat,
        messageType: MessageType.TEXT,
        content: createMessage.content,
      });
      await this.chatService.updateLastMessage(chat.id, message);
      return message;
    } else {
      throw new NotFoundException();
    }
  }
}
