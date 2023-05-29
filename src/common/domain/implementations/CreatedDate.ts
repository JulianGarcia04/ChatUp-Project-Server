import { type CreatedDate } from '../interfaces';

class CreatedDateImplementation implements CreatedDate {
  private readonly _createdDate: Date;

  private constructor(props: CreatedDate) {
    this._createdDate = props.createdDate;
  }

  get createdDate(): Date {
    return this._createdDate;
  }

  static create(date?: Date): CreatedDate {
    const createdDate = new CreatedDateImplementation({
      createdDate: date ?? new Date(Date.now()),
    });
    return createdDate;
  }
}

export default CreatedDateImplementation;
