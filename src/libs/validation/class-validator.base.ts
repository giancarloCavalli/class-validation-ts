import { Validator } from 'fluentvalidation-ts'

import { ValidationException, ValidationErrors } from '@/libs/exceptions'

export abstract class ClassValidator<T> extends Validator<T> {
  validateAndThrow(object: T): void {
    const validationErrors = this.validate(object)

    if (Object.keys(validationErrors).length > 0) {
      throw new ValidationException<T>(
        {
          message: `ValidationError occured in ${this.constructor.name}`,
        },
        validationErrors as ValidationErrors<T>,
        object,
      )
    }
  }
}
