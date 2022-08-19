export interface FieldOptionsListDTO {
    id?: string;
    equipe?: string;
    linkFoto?: string;
    transportePadrao?: string;
    transporte?: string;
    tipoOS?: string;
    pontos?: string;
    operador?: string;
    zona?: string;
}

export interface FieldDTO {
    field: 'equipe' | 'tipoOS' | 'transporte' | 'operador' | 'zona';
}

// export class FieldOptionsListDTO {
//     @IsString()
//     id?: string;
//     @IsString()
//     equipe?: string;
//     @IsString()
//     linkFoto?: string;
//     @IsString()
//     transportePadrao?: string;
//     @IsString()
//     transporte?: string
//     @IsString()
//     tipoOS?: string;
//     @IsString()
//     pontos?: string;
//     @IsString()
//     operador?: string;
//     @IsString()
//     zona?: string;
// }