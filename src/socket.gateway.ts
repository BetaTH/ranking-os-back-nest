import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

const env_cors = process.env.ORIGINS_CORS ?? null
const origin = env_cors ? env_cors.split(" , ") : "*"

const options = {
  cors: {
    origin: origin,
    methods: ['GET', 'POST', 'UPDATE', 'DELETE', 'PUT'],
  },
};
@WebSocketGateway(options)
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() io: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('dbAttServer')
  handleMessage(socket: Socket, payload: any) {
    this.io.emit('dbAttFront');
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }
}
