import { mongodb } from 'common/infrastructure';
import { type ITask } from 'tasks/domain';

const Task = new mongodb.orm.Schema<ITask>({
  id: {
    type: mongodb.orm.Schema.Types.Mixed,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isReady: {
    type: Boolean,
    required: true,
  },
  isDelete: {
    type: Boolean,
    required: true,
  },
  createdDate: {
    type: Date,
    required: true,
  },
});

Task.index({ title: 'text', description: 'text' });

export default mongodb.orm.model('task', Task);
