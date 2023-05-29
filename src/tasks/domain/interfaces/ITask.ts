import { type IsDelete, type CreatedDate, type Id } from 'common/domain';

export interface ITask extends IsDelete, CreatedDate, Id {
  readonly title: string;
  readonly description: string;
  readonly isReady: boolean;
}
