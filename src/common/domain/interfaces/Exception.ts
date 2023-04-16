export interface Exception {
  readonly code: number;
  readonly name: string;
  readonly message: string;
  readonly stack: string;
}
