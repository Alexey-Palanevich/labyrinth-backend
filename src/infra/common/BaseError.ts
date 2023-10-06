import type { DomainErrorCodes } from 'domain/common/DomainError';

export class BaseError extends Error {
  constructor(
    message: string,
    public code: BaseCodes | DomainErrorCodes | null,
    public metadata?: object | string | number,
  ) {
    super(message);
  }
}

enum BaseCodes {
  INTERNAL_ERROR = 500,
}
