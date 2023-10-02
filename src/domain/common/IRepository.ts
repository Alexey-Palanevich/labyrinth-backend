export interface IRepository<T> {
  save(entity: Partial<T>): Promise<T>;

  find(entity: Partial<T>): Promise<T | null>;
}
