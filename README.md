# Class Validator TypeScript

This project showcases an approach to validating classes upon instantiation using TypeScript and [fluentvalidation-ts](https://www.npmjs.com/package/fluentvalidation-ts).

## Tech Stack

![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![GitHub Actions](https://img.shields.io/badge/github%20actions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)

## Validation Strategy

### UML Diagram

![Class Validator UML Diagram](./docs/ClassValidatorUML.png)

### Guidance

- Payload schema validation is performed in the Core (business) layer by creating a validator class that extends `ClassValidator<T>`. The class validator is executed inside the DTO constructor.
  - DTOs are instantiated in the Controller layer and then passed to the Core layer through a Service interface.
- If validation fails, a `ValidationException` is thrown.
- The [fluentvalidation-ts](https://www.npmjs.com/package/fluentvalidation-ts) library is used to implement class validation functionalities. It is based on .NET's [Fluent Validation](https://docs.fluentvalidation.net/en/latest/index.html).
- This sample demonstrates the instantiation of a DTO designed for use by `ReceivableService` when creating new receivables.

## Installation

```bash
$ pnpm install
```

## Test

```bash
# unit tests
$ pnpm run test

# test coverage
$ pnpm run test:cov
```

## Quick Note

[NestJS](https://nestjs.com/) was chosen for this project because it provides a scalable and modular architecture, making it a good foundation for future use cases beyond class validation. This project may evolve to demonstrate additional scenarios that leverage NestJS's built-in features, such as dependency injection, interceptors, and middleware.
