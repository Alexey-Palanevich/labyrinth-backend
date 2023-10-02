export interface IFactory<TConfig, TEntity> {
  (config: TConfig): TEntity;
}
