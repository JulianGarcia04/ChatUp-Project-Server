import type { Age } from '../interfaces';

class AgeImplementation implements Age {
  private readonly _age: number;

  private constructor(prop: number) {
    this._age = prop;
  }

  get age(): number {
    return this._age;
  }

  public static create(birthdate: Date, age?: number): number {
    if (age == null) {
      const nowYear = new Date(Date.now()).getUTCFullYear();
      const birthYear = birthdate.getUTCFullYear();
      return new AgeImplementation(nowYear - birthYear).age;
    }

    return new AgeImplementation(age).age;
  }
}

export default AgeImplementation;
