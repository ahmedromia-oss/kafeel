import { GenericRepository } from 'shared/generic.repository';

import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, EntityManager, FindManyOptions, Repository } from 'typeorm';
import { Message } from '../models/message.model';

export class MessageRepository extends GenericRepository<Message> {
  constructor(
    @InjectRepository(Message)
    repository: Repository<Message>,
  ) {
    super(repository);
  }

  async findAllMessages(
    chatId: string,
    userId: string,
    skip: number,
    take: number,
  ): Promise<Message[]> {
    return await this.repository
      .createQueryBuilder('message')
      .leftJoinAndSelect('message.sender', 'sender')
      .leftJoinAndSelect('message.reciever', 'reciever')
      .where('message.chatId = :chatId', { chatId })
      .andWhere(
        new Brackets((qb) => {
          qb.where('message.senderId = :userId', { userId }).orWhere(
            'message.recieverId = :userId',
            { userId },
          );
        }),
      )
      .skip(skip)
      .take(take)
      .orderBy('message.createdAt', 'DESC')
      .getMany();
  }
}
