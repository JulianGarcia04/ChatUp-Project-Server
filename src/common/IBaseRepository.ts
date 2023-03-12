export interface IBaseRepository<TProps, TDomain> {
  getAll: (props: TProps) => TDomain[];
  getOne: (props: TProps) => TDomain;
  create: (props: TProps) => TDomain;
  edit: (props: TProps) => TDomain;
}
