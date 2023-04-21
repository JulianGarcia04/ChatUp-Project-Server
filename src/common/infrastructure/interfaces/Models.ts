export interface toModel<TDomain> {
  execute(props: unknown | TDomain): TDomain;
}
