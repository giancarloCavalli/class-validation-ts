import { CreateReceivableDTO } from 'src/core/receivable/dtos/create-receivable.dto'
import { Receivable } from 'src/core/receivable/models/receivable.model'

export interface IReceivableInterface {
  create(createDto: CreateReceivableDTO): Promise<Receivable>
}
