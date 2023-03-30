export interface UseCase<TDomain, TProps> {
  execute(props: TProps): TDomain | TDomain[];
}
