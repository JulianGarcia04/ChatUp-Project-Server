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

describe('GET (/tasks/:id) - integration test of find task by id controller, get one task usecase and one task repository', () => {
  describe('Test error handler', () => {
    test('test when id is less equal to zero, then must return a error with status code 500', async () => {
      const props = '-1';
      const url = `/api/v1/tasks/${props}`;

      const request = await api
        .get(url)
        .expect('Content-Type', /application\/json/);

      expect(request.statusCode).toBe(500);
      expect(Object.hasOwn(request.body, 'message')).toBe(true);
    });

    test('test when the database doesnt has no task with this id, then must return a error 404', async () => {
      const props = '29';
      const url = `/api/v1/tasks/${props}`;

      const request = await api
        .get(url)
        .expect('Content-Type', /application\/json/);

      expect(request.statusCode).toBe(404);
      expect(Object.hasOwn(request.body, 'message')).toBe(true);
    });
  });

  test('test when doesnt has error then must return the task selected', async () => {
    const props = '7';
    const url = `/api/v1/tasks/${props}`;

    const request = await api
      .get(url)
      .expect('Content-Type', /application\/json/);

    expect(request.statusCode).toBe(200);
    expect(request.body).toHaveProperty('title');
  });
});
