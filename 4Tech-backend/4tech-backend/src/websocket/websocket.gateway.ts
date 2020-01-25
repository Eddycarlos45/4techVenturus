import { SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';

@WebSocketGateway()
export class WebsocketGateway {

  @WebSocketServer() server;

  notifyOnlike(userActivityId: string, userId: string) {
    this.server.emit('events', { mediaId: userActivityId, userId });
  }
}
