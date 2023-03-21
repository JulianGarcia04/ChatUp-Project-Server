export interface IException {
  readonly code: number;
  readonly name: string;
  readonly message: string;
  readonly stack: string;
}
