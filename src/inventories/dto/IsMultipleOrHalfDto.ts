import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsMultipleOfHalf(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isMultipleOfHalf',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return typeof value === 'number' && value % 0.5 === 0;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a multiple of 0.5`;
        },
      },
    });
  };
}
