export interface IAllRepository<TDomain> {
  withPaginate(
    filter: unknown,
    skip: number,
    limit: number,
  ): Promise<TDomain[]>;

  withoutPaginate(filter: unknown): Promise<TDomain[] | []>;
}

export interface IOneRepository<TDomain> {
  withId(id: number | string): Promise<TDomain | null>;
}

export interface ICreateRepository<TDomain> {
  save(props: TDomain): Promise<void>;
}

export interface IEditRepository {
  withId(id: string | number, props: unknown): Promise<void>;
}
