import { CoreError, CoreException } from '@/libs/exceptions/core.exception'

export type ValidationErrors<T> = {
  [Key in keyof T]?: string
}

export class ValidationException<T> extends CoreException {
  constructor(
    error: Omit<CoreError, 'key'>,
    readonly validationErrors: ValidationErrors<T>,
    readonly submittedObject: T,
  ) {
    super({
      ...error,
      key: 'validation.error',
      data: {
        validationErrors,
        submittedObject,
      },
    })
    this.name = ValidationException.name
  }
}
