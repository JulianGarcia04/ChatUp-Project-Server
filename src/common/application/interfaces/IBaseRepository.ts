export interface IAllRepository<TDomain> {
  withPaginate(
    skip: number,
    limit: number,
    filter?: unknown,
    search?: string,
  ): Promise<TDomain[]>;

  withoutPaginate(filter?: unknown, search?: string): Promise<TDomain[] | []>;
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
