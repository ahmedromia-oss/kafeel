import { ForbiddenException, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { subscribe } from 'diagnostics_channel';

import { Server, Socket } from 'socket.io';
import { webSocketGaurd } from 'src/Auth/Gaurds/webSocket.guard';
import { tokenType } from 'src/constants';
import { customJwtService } from 'src/JWT/jwt.service';

import { userToken } from 'src/models/userToken.model';
import { user } from 'src/User/Decorators/user.decorator';
import { ChatService } from './services/chat.service';
import { WsCurrentUser } from './decorators/wsUser.decorator';
import { createChatDto } from './DTOs/Chats/createChat.dto';

import { MessageService } from './services/message.service';

@WebSocketGateway()
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private jwtService: customJwtService,
    private configService: ConfigService,
    private chatService: ChatService,
    private messageService: MessageService,
  ) {}
  @WebSocketServer()
  server: Server;

  async afterInit(server: Server) {}

  async handleConnection(client: Socket) {
    try {
      const user = await this.getUserIdFromClient(client);
      const rooms = (await this.chatService.getChatsForUser(user.sub)).map(
        (room) => room.id,
      );
      client.join(rooms);
    } catch (e) {}
  }

  handleDisconnect(client: Socket) {
    client.handshake.auth = null;
  }
  @SubscribeMessage('markRead')
  async handleMarkRead(
    @MessageBody() chatId: string,
    @WsCurrentUser() user: userToken,
  ) {
    await this.messageService.markRead(chatId, user.sub);
  }
  @SubscribeMessage('sendMessage')
  async handleChatMessage(
    @MessageBody() data: any,
    @WsCurrentUser() user: userToken,
    @ConnectedSocket() client: Socket,
  ) {
    // Broadcast to all other clients except sender
    try {
      client.broadcast
        .to(data.chatId)
        .emit('chatMessage', { message: data.message, senderId: user.sub });
      const result = await this.messageService.createMessage(
        { chatId: data.chatId, content: data.message },
        user.sub,
      );

      return result;
    } catch (e) {}
  }
  @SubscribeMessage('createChat')
  async createChat(
    @MessageBody() recieverId: string,
    @WsCurrentUser() user: userToken,
  ) {
    if (user.sub != recieverId) {
      return await this.chatService.createChat(user.sub, {
        recieverId: recieverId,
      } as createChatDto);
    }
  }

  private async getUserIdFromClient(client: Socket): Promise<userToken> {
    try {
      // Extract userId from token/auth - implement based on your auth system
      const token = client.handshake.auth?.token;

      if (!token) {
        throw new ForbiddenException();
      }

      const user = await this.jwtService.verifyToken(
        token,
        this.configService.get<string>('secretKey'),
      );
      if (user.tokenType == tokenType.VALID && user.data?.sub) {
        client.data.user = user.data;
        return user.data;
      } else {
        throw new ForbiddenException();
      }
      // For now, return from query params (replace with real auth)
    } catch (error) {
      throw new ForbiddenException();
    }
  }
}
