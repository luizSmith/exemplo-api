import { HttpException } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString } from 'class-validator';
export class CustomException extends HttpException {
    @ApiProperty({
        description: 'HTTP Status Code',
    })
    @IsNumber()
    statusCode: number;

    @ApiProperty({
        description: 'Error description array',
        type: [String],
    })
    @IsArray()
    message: string;

    @ApiProperty({
        description: 'HTTP status code name',
    })
    @IsString()
    error: string;

    @ApiProperty({
        description: 'Timestamp',
    })
    @IsString()
    timeStamp: Date;

    constructor(
        message: Array<unknown> | string,
        statusCode: number,
        error?: string
    ) {
        if (!statusCode) {
            statusCode = 500;
            message = 'Ocorreu um erro inesperado';
        }
        super(
            {
                statusCode: statusCode,
                message: message,
                error: error || HttpErrorByCode[statusCode].name,
            },
            statusCode
        );
        this.statusCode = statusCode;
    }
}
