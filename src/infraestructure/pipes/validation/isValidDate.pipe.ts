import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
} from 'class-validator';
import {
    startOfToday,
    parse as parseDate,
    isValid,
} from 'date-fns';

@ValidatorConstraint()
export class dataAntigaSeExistirConstraint
    implements ValidatorConstraintInterface
{
    validate(date: string): boolean {
        if (date) {
            const inicioData = parseDate(date, 'yyyy-MM-dd', startOfToday());

            if (!isValid(inicioData)) {
                return false;
            }

            const today = startOfToday();

            const dataAntiga = today.getTime() < inicioData.getTime();

            return !dataAntiga;
        }

        return false;
    }
}

export function dataAntigaSeExistir(opcoesValidacao?: ValidationOptions) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string): void {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: {
                ...opcoesValidacao,
                message: `A ${propertyName} deve ser válida e igual ou inferiro a de hoje`,
            },
            constraints: [],
            validator: dataAntigaSeExistirConstraint,
        });
    };
}
