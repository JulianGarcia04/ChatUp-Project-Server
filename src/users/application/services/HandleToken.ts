export interface HandleToken<
  DTO,
  GenerateOptions = undefined,
  DecodeOptions = undefined,
  ValidateOptions = undefined,
> {
  generate(data: DTO, options?: GenerateOptions): string;
  decode(token: string, options?: DecodeOptions): unknown;
  validate(token: string, options?: ValidateOptions): boolean;
}
