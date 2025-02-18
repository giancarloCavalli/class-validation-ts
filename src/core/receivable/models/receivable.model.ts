export class Receivable {
  readonly id: string
  readonly amount: number
  readonly issueDate: Date
  readonly dueDate: Date
  readonly createdAt: Date
  readonly updatedAt: Date
  readonly customerId: string

  constructor(props: Receivable) {
    Object.assign(this, props)
  }
}
