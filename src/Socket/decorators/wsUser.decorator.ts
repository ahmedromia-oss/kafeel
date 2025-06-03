import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { userToken } from 'src/models/userToken.model';


export const WsCurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): userToken => {
    const client: Socket = context.switchToWs().getClient<Socket>();
    return client.data.user;
  },
);