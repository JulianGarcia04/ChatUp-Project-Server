import { type IisDelete } from 'common/domain/interfaces/IisDelete';

export interface ITask extends IisDelete {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly isReady: boolean;
}
