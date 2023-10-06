import { BaseError } from 'infra/common/BaseError';

export class DomainError extends BaseError {}

export class ValidationError extends DomainError {
  constructor(message: string, metadata?: object | string | number) {
    super(message, DomainErrorCodes.VALIDATION_ERROR, metadata);
  }
}

// TODO: find error codes
export enum DomainErrorCodes {
  VALIDATION_ERROR = 1,
}
