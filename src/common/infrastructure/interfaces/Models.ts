export interface toModel<TDomainProp, TDomainJSON> {
  execute(props: unknown | TDomainProp): TDomainJSON;
}
