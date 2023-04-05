export interface UseCase<TDomain, TProps> {
  execute(props: TProps): Promise<TDomain> | Promise<TDomain[]>;
}
