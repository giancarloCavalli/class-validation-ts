export type CoreError = {
  key: string
  message: string
  data?: object
}

export class CoreException extends Error {
  readonly key: string
  readonly data?: object

  constructor(coreError: CoreError) {
    super(coreError.message)

    this.key = coreError.key
    this.data = coreError?.data

    Object.setPrototypeOf(this, CoreException.prototype)
  }
}
