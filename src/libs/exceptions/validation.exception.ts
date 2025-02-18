import { CoreError, CoreException } from 'src/libs/exceptions/core.exception'

export type ValidationErrors<T> = {
  [Key in keyof T]?: string
}

export class ValidationException<T> extends CoreException {
  constructor(error: Omit<CoreError, 'key'>, validationErrors: ValidationErrors<T>, submittedObject: T) {
    super({
      ...error,
      key: 'validation.error',
      data: {
        validationErrors,
        submittedObject,
      },
    })
  }
}
