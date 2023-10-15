import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";
import { dataAntigaSeExistir } from "src/infraestructure/pipes/validation/isValidDate.pipe";


export class InserirSerieRequest {
    @IsString({
        message: 'nomeSerie deve ser uma string',
    })
    @IsNotEmpty({
        message: 'nomeSerie nao pode ser vazio',
    })
    @ApiProperty({
        description: 'Nome da série',
    })
    nomeSerie: string;
    
    @ApiProperty({
        description: 'data lancamento série',
    })
    @dataAntigaSeExistir()
    dataSerie: string;
}
