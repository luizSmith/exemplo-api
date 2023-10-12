import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class InserirSerieDTO {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description: 'Nome da série',
    })
    nomeSerie: string;

    @IsString()
    @IsNotEmpty()
    @IsDateString()
    @ApiProperty({
        description: 'data lancamento série',
    })
    dataSerie: string;
}
