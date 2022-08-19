import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ListOptionsController } from './list-options.controller';
import { ListOptionsService } from './list-options.service';

@Module({
  controllers: [ListOptionsController],
  providers: [PrismaService, ListOptionsService],
})
export class ListOptionsModule { }
