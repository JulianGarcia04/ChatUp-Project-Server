export interface HandleToken<DTO> {
  generate(data: DTO): string;
  decode(token: string): unknown;
  validate(token: string): boolean;
}
