import { Injectable } from '@nestjs/common';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import { PrismaService } from 'src/prisma.service';
import { OS_DTO } from './dto/create.os.dto';

@Injectable()
export class OsService {
  constructor(private prisma: PrismaService) {}
  async findAll(query: { numPage?: string; justAtt?: string }) {
    const numPage = Number(query.numPage);

    if (!query.numPage) {
      const tableData = await this.prisma.os_tb.findMany({
        orderBy: {
          dataInsercao: 'desc',
        },
        take: 20,
      });
      return tableData;
    } else if (query.justAtt) {
      const tableData = await this.prisma.os_tb.findMany({
        orderBy: {
          dataInsercao: 'desc',
        },
        take: 20 + numPage * 10,
      });
      return tableData;
    } else {
      const tableData = await this.prisma.os_tb.findMany({
        orderBy: {
          dataInsercao: 'desc',
        },
        skip: 20 + numPage * 10,
        take: 10,
      });
      return tableData;
    }
  }

  async getRanking(query: {dateMin: string, dateMax: string}){
    const equipePontos: {
      equipe: string;
      pontos: number;
      linkFoto: string;
      transporte: string;
    }[] = await this.prisma.$queryRaw`SELECT a."equipe", SUM(a."pontos") as pontos, b."linkFoto", b."transportePadrao" as "transporte"
      FROM os_tb as a
      INNER JOIN equipes_tb as b ON a."equipe" = b."equipe"
      WHERE a."dataFechamento" BETWEEN ${new Date(
        query.dateMin
      )} AND ${new Date(query.dateMax)}
      GROUP BY a."equipe", b."linkFoto", b."transportePadrao"
      ORDER BY pontos DESC`;
    let epMotos = equipePontos.filter((df) => df.transporte != "Carro");
    let epCarro = equipePontos.filter((df) => df.transporte != "Moto");
    return {
      rankingMoto: epMotos,
      rankingGeral: epCarro,
    };
  }

  async postNewOS(data: OS_DTO) {
    const trs =
      differenceInHours(
        new Date(data.dataFechamento),
        new Date(data.dataAbertura),
      ) + ' Horas';
    const trsMin = differenceInMinutes(
      new Date(data.dataFechamento),
      new Date(data.dataAbertura),
    );
    const getTipo_OS = await this.prisma.tipo_os_tb.findMany({
      select: { tipoOS: true, pontos: true },
    });
    const pontosPorTipoOS: { [key: string]: number } = getTipo_OS
      .map((item) => [item.tipoOS, item.pontos])
      .reduce(
        (acc, item) =>
          Object.assign(acc, Object.fromEntries([[item[0], item[1]]])),
        {},
      );
    const createdData = await this.prisma.os_tb.create({
      data: {
        idOS: data.idOS as string,
        cliente: data.cliente as string,
        operador: data.operador as string,
        zona: data.zona as string,
        equipe: data.equipe as string,
        transporte: data.transporte as string,
        dataInsercao: new Date() as Date,
        dataAbertura: data.dataAbertura,
        dataFechamento: data.dataFechamento,
        taxa: data.taxa as string,
        correcao: data.correcao as string,
        trs: trs as string,
        trsMin: trsMin as number,
        pontos: pontosPorTipoOS[data.tipoOS] as number,
        tipoOS: data.tipoOS as string,
      },
    });

    return createdData;
  }

  async updateOS(data: OS_DTO) {
    const trs =
      differenceInHours(
        new Date(data.dataFechamento),
        new Date(data.dataAbertura),
      ) + ' Horas';
    const trsMin = differenceInMinutes(
      new Date(data.dataFechamento),
      new Date(data.dataAbertura),
    );
    const getTipo_OS = await this.prisma.tipo_os_tb.findMany({
      select: { tipoOS: true, pontos: true },
    });
    const pontosPorTipoOS: { [key: string]: number } = getTipo_OS
      .map((item) => [item.tipoOS, item.pontos])
      .reduce(
        (acc, item) =>
          Object.assign(acc, Object.fromEntries([[item[0], item[1]]])),
        {},
      );
    const updatedOS = await this.prisma.os_tb.updateMany({
      where: {
        idOS: data.idOS as string,
      },
      data: {
        idOS: data.idOS as string,
        cliente: data.cliente as string,
        operador: data.operador as string,
        zona: data.zona as string,
        equipe: data.equipe as string,
        transporte: data.transporte as string,
        dataAbertura: data.dataAbertura,
        dataFechamento: data.dataFechamento,
        taxa: data.taxa as string,
        correcao: data.correcao as string,
        trs: trs as string,
        trsMin: trsMin as number,
        pontos: pontosPorTipoOS[data.tipoOS] as number,
        tipoOS: data.tipoOS as string,
      },
    });

    return updatedOS;
  }

  async deleteOS(idOS: string) {
    const deletedOS = await this.prisma.os_tb.delete({
      where: {
        idOS: idOS,
      },
    });
    return deletedOS;
  }
}
