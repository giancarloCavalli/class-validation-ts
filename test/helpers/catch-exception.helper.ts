export class ExceptionCatcher {
  static catch(expectedExceptionName: string, fn: () => any) {
    let exception = null

    try {
      fn()
    } catch (error) {
      if (error.name === expectedExceptionName) {
        exception = error
      }
    }

    return exception
  }

  static async catchAsync(expectedExceptionName: string, fn: () => Promise<any>) {
    let exception = null

    try {
      await fn()
    } catch (error) {
      if (error.name === expectedExceptionName) {
        exception = error
      }
    }

    return exception
  }
}
