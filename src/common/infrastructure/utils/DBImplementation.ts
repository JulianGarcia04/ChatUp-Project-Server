import { type ORM } from '../interfaces';
import { Mongoose } from 'mongoose';

class DBImplementation implements ORM<Mongoose> {
  private readonly _orm: Mongoose = new Mongoose();

  get orm(): Mongoose {
    return this._orm;
  }
}

export default DBImplementation;
