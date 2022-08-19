import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class ListOptionsPrismaService {
    constructor(private prisma: PrismaService) { }

    async findAll(field: 'operador' | "equipe" | "tipoOS" | "transporte" | "zona" | "taxa") {
        switch (field) {
            case "operador": {
                return await this.prisma.operador_tb.findMany({
                    select: { operador: true },
                })
            }
            case "equipe": {
                return await this.prisma.equipes_tb.findMany({
                    select: { equipe: true },
                })
            }
            case "tipoOS": {
                return await this.prisma.tipo_os_tb.findMany({
                    select: { tipoOS: true },
                })
            }
            case "transporte": {
                return await this.prisma.transporte_tb.findMany({
                    select: { transporte: true },
                })
            }
            case "zona": {
                return await this.prisma.zona_tb.findMany({ select: { zona: true } });
            }
            case "taxa": {
                return await this.prisma.taxa_tb.findMany({ select: { taxa: true } });
            }

        }
    }

    async getFieldsOptionsToAdminPage(field: string) {
        enum Models {
            operador = "operador_tb",
            equipe = "equipes_tb",
            tipoOS = "tipo_os_tb",
            transporte = "transporte_tb",
            zona = "zona_tb",
        }
        const model = Models[field]
        return await this.prisma[model].findMany({});

    }


}
