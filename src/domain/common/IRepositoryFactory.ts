import type { IRepository } from 'domain/common/IRepository';

export interface IRepositoryFactory<TRepository extends IRepository<unknown>> {
  create(): TRepository;
}
