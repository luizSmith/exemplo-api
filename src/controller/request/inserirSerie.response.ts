import { ApiProperty } from "@nestjs/swagger";

export class InserirSerieRequest {
    @ApiProperty({
        description: 'Id série',
    })
    idSerie: number;

    @ApiProperty({
        description: 'Nome da série',
    })
    nomeSerie: string;

    @ApiProperty({
        description: 'data lancamento série',
    })
    dataSerie: string;
}
