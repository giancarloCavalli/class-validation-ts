import { CreateReceivableDTO } from '@/core/receivable/dtos'
import { Receivable } from '@/core/receivable/models'

export interface IReceivableInterface {
  create(createDto: CreateReceivableDTO): Promise<Receivable>
}
