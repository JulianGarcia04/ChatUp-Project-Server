export interface IAllRepository<TDomain> {
  withPaginate(filter: unknown, skip: number, limit: number): TDomain[];

  withoutPaginate(filter: unknown): TDomain[];
}

export interface IOneRepository<TDomain> {
  withId(id: number | string): TDomain;
}

export interface ICreateRepository<TDomain> {
  save(props: TDomain): void;
}

export interface IEditRepository<TDomain> {
  withId(id: string | number, props: unknown): TDomain;
}
