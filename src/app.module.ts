import { Module } from '@nestjs/common';
import { OsModule } from './os/os.module';
import { SocketGateway } from './socket.gateway';
import { ListOptionsModule } from './list-options/list-options.module';

@Module({
  imports: [OsModule, ListOptionsModule],
  controllers: [],
  providers: [SocketGateway],
})
export class AppModule {}
