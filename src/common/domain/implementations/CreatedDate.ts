import { type createdDate } from '../interfaces';

class CreatedDate implements createdDate {
  private readonly _createdDate: Date;

  private constructor(props: createdDate) {
    this._createdDate = props.createdDate;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  static create(): createdDate {
    const createdDate = new CreatedDate({ createdDate: new Date(Date.now()) });
    return createdDate;
  }
}

export default CreatedDate;
