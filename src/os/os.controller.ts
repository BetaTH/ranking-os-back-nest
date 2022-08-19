import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { OS_DTO } from './dto/create.os.dto';
import { OsService } from './os.service';

@Controller('os')
export class OsController {
  constructor(private readonly service: OsService) {}

  @Get()
  async findAll(@Query() query: { numPage?: string; justAtt?: string }) {
    return this.service.findAll(query);
  }

  @Get('/ranking')
  async getRanking(@Query() query: {dateMin: string, dateMax: string}) {
    return this.service.getRanking(query);
  }

  @Post()
  postNewOS(@Body() data: OS_DTO) {
    return this.service.postNewOS(data);
  }

  @Put()
  updateOS(@Body() data: OS_DTO) {
    return this.service.updateOS(data);
  }

  @Delete(':idOS')
  deleteOS(@Param('idOS') idOS: string) {
    return this.service.deleteOS(idOS);
  }
}
