import { type IisDelete, type createdDate } from 'common/domain';

export interface ITask extends IisDelete, createdDate {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly isReady: boolean;
}
