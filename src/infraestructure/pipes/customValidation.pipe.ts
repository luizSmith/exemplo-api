/* eslint-disable @typescript-eslint/ban-types */
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { Injectable, PipeTransform } from '@nestjs/common';
import { ArgumentMetadata } from '@nestjs/common';
import { BusinessRuleException } from '../customExceptions/businessRuleException.exception';

@Injectable()
export class CustomValidationPipe implements PipeTransform {
    async transform(
        value: unknown,
        { metatype }: ArgumentMetadata
    ): Promise<unknown> {
        if (!metatype) return;

        const object = plainToClass(metatype, value);
        const errors = await validate(object, {
            skipMissingProperties: false,
            skipUndefinedProperties: false,
        });
        if (errors.length > 0) {
            const message = errors.map(
                (err) => err.constraints && Object.values(err.constraints)
            );
            throw new BusinessRuleException(message);
        }
        return object;
    }
}
