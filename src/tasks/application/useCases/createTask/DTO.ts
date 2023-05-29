import { type Id } from 'src/common/domain';
export interface createTaskDTO extends Id {
  title: string;
  description: string;
  isReady: boolean;
}
