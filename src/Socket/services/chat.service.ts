import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { ChatRepository } from '../repositories/chat.repository';
import { UserService } from 'src/User/user.service';
import { createChatDto } from '../DTOs/Chats/createChat.dto';
import { Chat } from '../models/chat.model';
import { In } from 'typeorm';
import { Message } from '../models/message.model';

@Injectable()
export class ChatService {
  constructor(
    private readonly chatRepo: ChatRepository,
    private readonly userService: UserService,
  ) {}

  /**
   * Create a new chat with specified member IDs
   */
  async updateLastMessage(chatId: string, lastMessage: Message) {
    await this.chatRepo.update({ id: chatId }, { lastMessage: lastMessage });
  }
  async createChat(senderId: string, createDto: createChatDto): Promise<Chat> {
    // Fetch user entities for each member
    if(senderId == createDto.recieverId){
      throw new NotFoundException()
    }
    const sender = await this.userService.getUserById(senderId);
    const reciever = await this.userService.getUserById(createDto.recieverId);
    const members = [sender, reciever];
    try {
      return await this.chatRepo.findOneChat([senderId, createDto.recieverId]);
    } catch (e) {
      return await this.chatRepo.create({ members: members });
    }
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
    const chats = await this.chatRepo.findAll({
      where: { members: { id: userId } },
      skip: skip,
      take: take,
    });

    const res = await this.chatRepo.findAll({
      where: {
        id: In(chats.map((e) => e.id)),
      },
      relations: { members: true, lastMessage: true },
      order: { lastMessage: { createdAt: 'DESC' } },
    });
    return res.map((e) => {
      if (e.members?.length > 1) {
        return e;
      }
    });
  }

  /**
   * Get a specific chat by ID
   */
  async getChatById(id: string): Promise<Chat> {
    return await this.chatRepo.findOne({
      where: { id },
      relations: { messages: true, members: true },
    });
  }
  async chatById(id: string, userId: string): Promise<Chat> {
    return await this.chatRepo.findOne({
      where: [{ id }, { members: { id: userId } }],
      relations: { messages: true, members: true },
    });
  }
  async chatByIdwithLastMessage(id: string): Promise<Chat> {
    return await this.chatRepo.findOne({
      where: { id },
      relations: { lastMessage: true },
    });
  }
}
