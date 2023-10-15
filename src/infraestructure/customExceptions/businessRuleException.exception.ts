import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsArray, IsString } from 'class-validator';
import { CustomException } from './customError.exception';
export class BusinessRuleException extends CustomException {
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


    constructor(message: Array<unknown>) {
        super(message, 400, 'Business Exception');
        this.error = 'Business Exception';
        this.statusCode = 400;
        console.error(
            'Business Rule Exception',
            this.error,
            message
        );
    }
}
