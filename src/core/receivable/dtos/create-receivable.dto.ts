import { OmitType } from '@nestjs/mapped-types'
import { Receivable } from 'src/core/receivable/models/receivable.model'

export class CreateReceivableDTO extends OmitType(Receivable, ['id', 'createdAt', 'updatedAt']) {
  constructor(props: CreateReceivableDTO) {
    super(props)

    // TODO
  }
}
