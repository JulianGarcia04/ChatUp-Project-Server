import { type createdDate } from '../interfaces';

class CreatedDate implements createdDate {
  private readonly _createdDate: Date;

  private constructor(props: createdDate) {
    this._createdDate = props.createdDate;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  static create(date?: Date): createdDate {
    const createdDate = new CreatedDate({
      createdDate: date ?? new Date(Date.now()),
    });
    return createdDate;
  }
}

export default CreatedDate;
