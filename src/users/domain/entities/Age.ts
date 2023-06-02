import type { Age } from '../interfaces';

class AgeImplementation implements Age {
  private readonly _age: number;

  private constructor(prop: number) {
    this._age = prop;
  }

  get age(): number {
    return this._age;
  }

  public static create(birthDate: Date, age?: number): number {
    if (age != null) {
      return new AgeImplementation(age).age;
    }
    const nowDate = new Date(Date.now());
    // now date info
    const nowDay = nowDate.getUTCDate();

    const nowMonth = nowDate.getUTCMonth();

    const nowYear = nowDate.getUTCFullYear();

    // birth date info
    const birthDay = birthDate.getUTCDate();

    const birthMonth = birthDate.getUTCMonth();

    const birthYear = birthDate.getUTCFullYear();

    if (
      (nowMonth <= birthMonth && nowDay <= birthDay) ||
      nowMonth <= birthMonth
    ) {
      return new AgeImplementation(nowYear - birthYear).age;
    } else {
      return new AgeImplementation(nowYear - birthYear - 1).age;
    }
  }
}

export default AgeImplementation;
