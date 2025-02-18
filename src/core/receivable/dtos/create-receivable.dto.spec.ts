import { ExceptionCatcher } from '~/helpers/catch-exception.helper'

import { ValidationException } from '@/libs/exceptions'
import { CreateReceivableDTO, CreateReceivableDTOValidator } from '@/core/receivable/dtos'

describe('CreateReceivableDTO', () => {
  beforeAll(() => {
    const newDateMock = new Date('2024-02-01')
    newDateMock.setHours(23, 0, 0, 0)
    jest.useFakeTimers({
      now: newDateMock,
    })
  })

  const createInstanceSpy = jest.spyOn(CreateReceivableDTOValidator, 'createInstance')

  it('should throw not null errors', () => {
    const createCommandFn = () =>
      new CreateReceivableDTO({
        customerId: null,
        issueDate: null,
        dueDate: null,
        amount: null,
      })

    const exception: ValidationException<CreateReceivableDTO> = ExceptionCatcher.catch(
      ValidationException.name,
      createCommandFn,
    )

    expect(exception).not.toBeNull()
    expect(exception.name).toBe('ValidationException')
    expect(exception.message).toBe(`ValidationError occured in ${CreateReceivableDTOValidator.name}`)
    expect(exception.key).toBe('validation.error')
    expect(exception.validationErrors).toEqual({
      amount: 'should.be.number',
      customerId: 'not.null',
      issueDate: 'should.be.date',
      dueDate: 'should.be.date',
    })
    expect(exception.submittedObject).toEqual({
      amount: null,
      customerId: null,
      issueDate: null,
      dueDate: null,
    })

    expect(createInstanceSpy).toHaveBeenCalledTimes(1)
  })

  it('should validate invalid values', () => {
    const createCommandFn = () =>
      new CreateReceivableDTO({
        customerId: '',
        issueDate: 'invalid-date' as unknown as Date,
        dueDate: 'also invalid-date' as unknown as Date,
        amount: -1,
      })

    const exception: ValidationException<CreateReceivableDTO> = ExceptionCatcher.catch(
      ValidationException.name,
      createCommandFn,
    )

    expect(exception).not.toBeNull()
    expect(exception.name).toBe('ValidationException')
    expect(exception.message).toBe(`ValidationError occured in ${CreateReceivableDTOValidator.name}`)
    expect(exception.key).toBe('validation.error')
    expect(exception.validationErrors).toEqual({
      amount: 'should.be.greater.than.zero',
      customerId: 'not.empty',
      issueDate: 'should.be.date',
      dueDate: 'should.be.date',
    })
    expect(exception.submittedObject).toEqual<CreateReceivableDTO>({
      amount: -1,
      customerId: '',
      issueDate: 'invalid-date' as unknown as Date,
      dueDate: 'also invalid-date' as unknown as Date,
    })

    expect(createInstanceSpy).toHaveBeenCalledTimes(1)
  })

  it('should validate invalid values (case dueData < issueDate)', () => {
    const createCommandFn = () =>
      new CreateReceivableDTO({
        customerId: 'customer-id',
        issueDate: new Date('2024-02-02'),
        dueDate: new Date('2024-02-01'),
        amount: 1000,
      })

    const exception: ValidationException<CreateReceivableDTO> = ExceptionCatcher.catch(
      ValidationException.name,
      createCommandFn,
    )

    expect(exception).not.toBeNull()
    expect(exception.name).toBe('ValidationException')
    expect(exception.message).toBe(`ValidationError occured in ${CreateReceivableDTOValidator.name}`)
    expect(exception.key).toBe('validation.error')
    expect(exception.validationErrors).toEqual({
      dueDate: 'should.be.greater.than.or.equal.issueDate',
    })
    expect(exception.submittedObject).toEqual<CreateReceivableDTO>({
      amount: 1000,
      customerId: 'customer-id',
      issueDate: new Date('2024-02-02'),
      dueDate: new Date('2024-02-01'),
    })

    expect(createInstanceSpy).toHaveBeenCalledTimes(1)
  })

  it('should succeed (case issueDate<today and dueDate<today)', () => {
    const createCommandFn = () =>
      new CreateReceivableDTO({
        customerId: 'customer-id',
        issueDate: new Date('2024-01-01'),
        dueDate: new Date('2024-01-01'),
        amount: 1,
      })

    const createCommand = createCommandFn()

    expect(createCommand).not.toBeNull()
    expect(createCommand).toEqual<CreateReceivableDTO>({
      amount: 1,
      customerId: 'customer-id',
      issueDate: new Date('2024-01-01'),
      dueDate: new Date('2024-01-01'),
    })

    expect(createInstanceSpy).toHaveBeenCalledTimes(1)
  })

  it('should succeed (case issueDate === dueDate)', () => {
    const createCommandFn = () =>
      new CreateReceivableDTO({
        customerId: 'customer-id',
        issueDate: new Date('2024-02-01'),
        dueDate: new Date('2024-02-01'),
        amount: 1,
      })

    const createCommand = createCommandFn()

    expect(createCommand).not.toBeNull()
    expect(createCommand).toEqual<CreateReceivableDTO>({
      amount: 1,
      customerId: 'customer-id',
      issueDate: new Date('2024-02-01'),
      dueDate: new Date('2024-02-01'),
    })

    expect(createInstanceSpy).toHaveBeenCalledTimes(1)
  })

  it('should succeed (case issueDate < dueDate)', () => {
    const createCommandFn = () =>
      new CreateReceivableDTO({
        customerId: 'customer-id',
        issueDate: new Date('2024-02-01'),
        dueDate: new Date('2024-02-03'),
        amount: 1,
      })

    const createCommand = createCommandFn()

    expect(createCommand).not.toBeNull()
    expect(createCommand).toEqual<CreateReceivableDTO>({
      amount: 1,
      customerId: 'customer-id',
      issueDate: new Date('2024-02-01'),
      dueDate: new Date('2024-02-03'),
    })

    expect(createInstanceSpy).toHaveBeenCalledTimes(1)
  })
})
