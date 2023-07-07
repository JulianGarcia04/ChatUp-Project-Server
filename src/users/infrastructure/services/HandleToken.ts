import type { HandleToken } from 'users/application/services';
import config from 'src/config';
import {
  sign,
  type SignOptions,
  decode,
  type DecodeOptions,
  verify,
  type VerifyOptions,
} from 'jsonwebtoken';

const { SECRET } = config;

class HandleTokenImplementation
  implements HandleToken<unknown, SignOptions, DecodeOptions, VerifyOptions>
{
  generate(data: unknown, options?: SignOptions): string {
    if (SECRET == null) {
      throw new Error('Internal error');
    }
    const token = sign(data as object, SECRET, options);
    return token;
  }

  decode(token: string, options?: DecodeOptions): unknown {
    const decodeToken = decode(token, options);

    return decodeToken;
  }

  validate(token: string, options?: VerifyOptions): boolean {
    if (SECRET == null) {
      throw new Error('Internal error');
    }
    const isValidateToken = verify(token, SECRET, options);

    return Boolean(isValidateToken);
  }
}

export default HandleTokenImplementation;
