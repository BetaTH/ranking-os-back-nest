import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FieldDTO, FieldOptionsListDTO } from './list-options.dto';

@Injectable()
export class ListOptionsService {
  constructor(private prisma: PrismaService) { }

  async findAll() {
    const operador = await this.prisma.operador_tb.findMany({
      select: { operador: true },
    })
    const equipe = await this.prisma.equipes_tb.findMany({
      select: { equipe: true },
    })
    const tipoOS = await this.prisma.tipo_os_tb.findMany({
      select: { tipoOS: true },
    })
    const transporte = await this.prisma.transporte_tb.findMany({
      select: { transporte: true },
    })
    const zona = await this.prisma.zona_tb.findMany({ select: { zona: true } });
    const taxa = await this.prisma.taxa_tb.findMany({ select: { taxa: true } });

    const listOptions = {
      operador: operador.map(
        (item: { [key: string]: string }) => item.operador,
      ),
      equipe: equipe.map((item: { [key: string]: string }) => item.equipe),
      tipoOS: tipoOS.map((item: { [key: string]: string }) => item.tipoOS),
      transporte: transporte.map(
        (item: { [key: string]: string }) => item.transporte,
      ),
      zona: zona.map((item: { [key: string]: string }) => item.zona),
      taxa: taxa.map((item: { [key: string]: string }) => item.taxa),
    };
    return listOptions;
  }

  async getFieldsOptionsToAdminPage() {
    const equipe = await this.prisma.equipes_tb.findMany({});
    const operador = await this.prisma.operador_tb.findMany({});
    const zona = await this.prisma.zona_tb.findMany({});
    const tipoOS = await this.prisma.tipo_os_tb.findMany({});
    const transporte = await this.prisma.transporte_tb.findMany({});

    const tableOptions = {
      equipe: equipe,
      operador: operador,
      zona: zona,
      tipoOS: tipoOS,
      transporte: transporte,
    };
    return tableOptions;
  }

  async postFieldOption(
    field: FieldDTO['field'],
    data: FieldOptionsListDTO
  ) {
    switch (field) {
      case "equipe": {
        const createdEquipe = await this.prisma.equipes_tb.create({
          data: {
            equipe: data.equipe as string,
            linkFoto: data.linkFoto as string,
            transportePadrao: data.transportePadrao as string,
          },
        });
        return createdEquipe;
      }
      case "tipoOS": {
        const createdTipoOS = await this.prisma.tipo_os_tb.create({
          data: {
            tipoOS: data.tipoOS as string,
            pontos: Number(data.pontos as string),
          },
        });
        return createdTipoOS;
      }
      case "transporte": {
        const createdTransporte = await this.prisma.transporte_tb.create({
          data: {
            transporte: data.transporte as string,
          },
        });
        return createdTransporte;
      }
      case "operador": {
        const createdOperador = await this.prisma.operador_tb.create({
          data: {
            operador: data.operador as string,
          },
        });
        return createdOperador;
      }
      case "zona": {
        const createdZona = await this.prisma.zona_tb.create({
          data: {
            zona: data.zona as string,
          },
        });
        return createdZona;
      }
    }
  }

  async updateFieldOption(
    field: FieldDTO['field'],
    data: FieldOptionsListDTO
  ) {
    switch (field) {
      case "equipe": {
        const updatedEquipe = await this.prisma.equipes_tb.updateMany({
          where: {
            equipe: data.equipe as string,
          },
          data: {
            equipe: data.equipe as string,
            linkFoto: data.linkFoto as string,
            transportePadrao: data.transportePadrao as string,
          },
        });
        return updatedEquipe;
      }
      case "tipoOS": {
        const updatedTipoOS = await this.prisma.tipo_os_tb.updateMany({
          where: {
            id: Number(data.id as string),
          },
          data: {
            tipoOS: data.tipoOS as string,
            pontos: Number(data.pontos as string),
          },
        });
        return updatedTipoOS;
      }
      case "transporte": {
        const updatedTransporte = await this.prisma.transporte_tb.updateMany({
          where: {
            id: Number(data.id as string),
          },
          data: {
            transporte: data.transporte as string,
          },
        });
        return updatedTransporte;
      }
      case "operador": {
        const updatedOperador = await this.prisma.operador_tb.updateMany({
          where: {
            id: Number(data.id as string),
          },
          data: {
            operador: data.operador as string,
          },
        });
        return updatedOperador;
      }
      case "zona": {
        const updatedZona = await this.prisma.zona_tb.updateMany({
          where: {
            id: Number(data.id as string),
          },
          data: {
            zona: data.zona as string,
          },
        });
        return updatedZona;
      }
    }
  }

  async deleteFieldOption(field: string, id: string) {
    enum Models {
      tipoOS = "tipo_os_tb",
      transporte = "transporte_tb",
      operador = "operador_tb",
      zona = "zona_tb",
    }

    if (field === "equipe") {
      const deletedEquipe = await this.prisma.equipes_tb.delete({
        where: {
          equipe: id,
        },
      });
      return deletedEquipe;
    }

    const model = Models[field]

    const deletedFieldOption = await this.prisma[model].delete({
      where: {
        id: Number(id as string),
      },
    });
    return deletedFieldOption;
  }

}
