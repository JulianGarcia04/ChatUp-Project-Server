import { uuid } from 'src/container';
import type { IdGenerator } from 'common/application';

class IdGeneratorImplementation implements IdGenerator {
  execute(): string {
    return uuid.execute();
  }
}

export default IdGeneratorImplementation;
