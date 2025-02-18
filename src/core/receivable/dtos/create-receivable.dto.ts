import { OmitType } from '@nestjs/mapped-types'

import { CreateReceivableDTOValidator } from '@/core/receivable/dtos'
import { Receivable } from '@/core/receivable/models/receivable.model'

export class CreateReceivableDTO extends OmitType(Receivable, ['id', 'createdAt', 'updatedAt']) {
  constructor(props: CreateReceivableDTO) {
    super()

    const validator = CreateReceivableDTOValidator.getInstance()
    validator.validateAndThrow(props)

    Object.assign(this, props)
  }
}
