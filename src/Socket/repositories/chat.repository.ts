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
}
