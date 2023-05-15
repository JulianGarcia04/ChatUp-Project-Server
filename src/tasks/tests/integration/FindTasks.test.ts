import req from 'supertest';
import { server } from 'src/index';
import { Task } from 'tasks/infrastructure/schemas';
import { mongodb } from 'src/common/infrastructure/utils';
import { initialTasks } from '../utils/initialData';

const app = server.app;

const api = req(app);

beforeAll(async () => {
  await Task.deleteMany({});

  await Task.create(initialTasks);
});

afterAll(async () => {
  server?.listener?.close();
  await mongodb.orm.connection.close();
});

describe('GET (/tasks/create) - integration test of find tasks controller, get all tasks usecase and all task repository', () => {
  describe('tests where check the query request and how its works', () => {
    test('then i going to set the a limit and skip in the request url and must return array with objects according to this params', async () => {
      const limit = 5;
      const skip = 0;
      const url = `/api/v1/tasks?limit=${limit}&skip=${skip}`;

      const request = await api.get(url);

      expect(request.body).toHaveLength(5);
      expect(request.statusCode).toBe(200);
    });

    test('then I going to set the limit, skip and search in the request url and must return array with objects according to this query', async () => {
      const limit = 5;
      const skip = 0;
      const search = 'setting';
      const url = `/api/v1/tasks?limit=${limit}&skip=${skip}&search=${search}`;

      const request = await api.get(url);

      expect(request.body).toHaveLength(2);
      expect(request.statusCode).toBe(200);
    });
  });
});
