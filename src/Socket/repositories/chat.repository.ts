import { GenericRepository } from 'shared/generic.repository';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Chat } from '../models/chat.model';

export class ChatRepository extends GenericRepository<Chat> {
  constructor(
    @InjectRepository(Chat)
    repository: Repository<Chat>,
  ) {
    super(repository);
  }
  async findOneChat(userIds: string[]) {
    const result = await this.repository
      .createQueryBuilder('chat')
      .leftJoin('chat.members', 'member')
      .where('member.id IN (:...userIds)', { userIds }) // include matching members
      .groupBy('chat.id')
      .having('COUNT(DISTINCT member.id) = :count', { count: userIds.length }) // match exact user count
      .getOne();
    return await this.findOne({
      where: { id: result.id },
      relations: { members: true },
    });

    // return the first matching chat
  }
  async findChats(userIds: string , skip:number , take:number) {
    return await this.repository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.members', 'member')
      .where('member.id  = :userIds', { userIds }) // include matching members
      .skip(skip)
      .take(take)// match exact user count
      .getMany();
    

    // return the first matching chat
  }

}
