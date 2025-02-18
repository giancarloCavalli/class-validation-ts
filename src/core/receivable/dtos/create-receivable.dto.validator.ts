import { ClassValidator } from '@/libs/validation'

import { CreateReceivableDTO } from '@/core/receivable/dtos'

export class CreateReceivableDTOValidator extends ClassValidator<CreateReceivableDTO> {
  private static validator: CreateReceivableDTOValidator

  private constructor() {
    super()

    this.ruleFor('customerId').notNull().withMessage('not.null').notEmpty().withMessage('not.empty')

    this.ruleFor('amount')
      .must((amount) => typeof amount === 'number')
      .withMessage('should.be.number')
      .greaterThanOrEqualTo(0)
      .withMessage('should.be.positive.number')

    this.ruleFor('issueDate')
      .must((issueDate) => issueDate instanceof Date && !isNaN(issueDate.getTime()))
      .withMessage('should.be.date')

    this.ruleFor('dueDate')
      .must((dueDate) => dueDate instanceof Date && !isNaN(dueDate.getTime()))
      .withMessage('should.be.date')
      .must((dueDate, { issueDate }) => dueDate >= issueDate)
      .withMessage('should.be.greater.than.or.equal.issueDate')
  }

  static createInstance(): CreateReceivableDTOValidator {
    return new CreateReceivableDTOValidator()
  }

  static getInstance(): CreateReceivableDTOValidator {
    if (!this.validator) {
      this.validator = CreateReceivableDTOValidator.createInstance()
    }

    return this.validator
  }
}
