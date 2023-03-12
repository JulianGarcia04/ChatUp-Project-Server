export interface IUseCase<TDomain, TProps> {
  execute: (props: TProps) => TDomain | TDomain[];
}
