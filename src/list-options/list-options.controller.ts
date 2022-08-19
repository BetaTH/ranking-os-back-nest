import { Body, Controller, Delete, Get, Options, Param, Post, Put } from '@nestjs/common';
import { FieldDTO, FieldOptionsListDTO } from './list-options.dto';
import { ListOptionsService } from './list-options.service';


//list-options === Fields Options List
@Controller('list-options')
export class ListOptionsController {
  constructor(private readonly service: ListOptionsService) { }
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @Get('/admin')
  async getFieldsOptionsToAdminPage(
  ) {
    return this.service.getFieldsOptionsToAdminPage();
  }

  @Post('/admin/:field')
  async postFieldOption(
    @Param('field') field: FieldDTO['field'],
    @Body() data: FieldOptionsListDTO) {
    return this.service.postFieldOption(field, data);
  }

  @Put('/admin/:field')
  async updateFieldOption(
    @Param('field') field: FieldDTO['field'],
    @Body() data: FieldOptionsListDTO) {

    return this.service.updateFieldOption(field, data);
  }

  @Delete('/admin/:field/:id')
  async deleteFieldOption(
    @Param('field') field: FieldDTO['field'],
    @Param('id') id: string,
  ) {
    return this.service.deleteFieldOption(field, id)
  }
}
