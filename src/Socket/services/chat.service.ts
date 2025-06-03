import { Injectable, NotFoundException } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { UserService } from 'src/User/user.service';
import { createChatDto } from '../DTOs/Chats/createChat.dto';
import { Chat } from '../models/chat.model';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepo: ChatRepository,
    private readonly userService: UserService,
  ) {}

  /**
   * Create a new chat with specified member IDs
   */
  async createChat(createDto: createChatDto): Promise<Chat> {
    // Fetch user entities for each member
    const sender = await this.userService.getUserById(createDto.senderId);
    const reciever = await this.userService.getUserById(createDto.recieverId);
    console.log(sender , reciever)
    
    const members = [sender, reciever];
    return await this.chatRepo.create({ members: members });
  }

  /**
   * Get all chats that include a given user
   */
  async getChatsForUser(
    userId: string,
    skip: number = 0,
    take: number = 5,
  ): Promise<Chat[]> {
    // Verify user exists to prevent orphan queries
    return await this.chatRepo.findAll(
      { where: { members: { id: userId  } } , skip:skip , take:take },
   
    );
  }

  
  /**
   * Get a specific chat by ID
   */
  async getChatById(id: string): Promise<Chat> {
    const chat = await this.chatRepo.findOne({
      where: { id },
      relations: { messages: true, members: true },
    });
    if (!chat) {
      throw new NotFoundException(`Chat with id ${id} not found`);
    }
    return chat;
  }

  /**
   * Delete a chat by its ID
   */
  async deleteChat(id: string): Promise<void> {
    await this.chatRepo.delete({ id: id });
  }
}
