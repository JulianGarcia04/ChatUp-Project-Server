import { type Uuid } from '../interfaces';
import { v4 } from 'uuid';

class UuidImplementation implements Uuid {
  execute(): string {
    const uuid = v4();
    return uuid;
  }
}

export default UuidImplementation;
