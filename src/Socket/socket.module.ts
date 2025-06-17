import { Module } from '@nestjs/common';
import { ChatGateway } from './socket.gateway';
import { ChatService } from './services/chat.service';
import { ChatRepository } from './repositories/chat.repository';
import { MessageService } from './services/message.service';
import { MessageRepository } from './repositories/message.repository';
import { UserModule } from 'src/User/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './models/message.model';
import { Chat } from './models/chat.model';
import { Attachment } from './models/attachments.model';
import { TokenModule } from 'src/JWT/jwt.module';
import { ChatController } from './controllers/chat.controller';
import { MessageController } from './controllers/message.controller';

@Module({
  imports: [UserModule , TypeOrmModule.forFeature([Message , Chat , Attachment]) , TokenModule],
  providers: [
    ChatGateway,
    ChatService,
    ChatRepository,
    MessageService,
    MessageRepository,
    
  ],
  exports: [ChatGateway],
  controllers:[ChatController , MessageController]
})
export class SocketModule {}
