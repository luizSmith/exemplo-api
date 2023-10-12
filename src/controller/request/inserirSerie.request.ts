import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Validate } from "class-validator";


export class InserirSerieRequest {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome da série',
    })
    nomeSerie: string;

    
    @ApiProperty({
        description: 'data lancamento série',
    })
    @IsNotEmpty()
    dataSerie: string;
}
