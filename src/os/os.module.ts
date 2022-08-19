import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { OsController } from './os.controller';
import { OsService } from './os.service';

@Module({
  controllers: [OsController],
  providers: [PrismaService, OsService],
})
export class OsModule {}
