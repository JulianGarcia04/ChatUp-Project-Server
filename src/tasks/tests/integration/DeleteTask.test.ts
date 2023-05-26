import req from 'supertest';
import { server } from 'src/index';
import { Task } from 'tasks/infrastructure/schemas';
import { mongodb } from 'src/common/infrastructure/utils';
import { initialTasks } from '../utils/initialData';

const app = server.app;

const api = req(app);

beforeEach(async () => {
  await Task.deleteMany({});

  await Task.create(initialTasks);
});

afterAll(async () => {
  server?.listener?.close();
  await mongodb.orm.connection.close();
});

describe('DELETE (/tasks/delete/:id) - integration test of delete task controller, delete task usecase and edit task repository', () => {
  describe('tests of id param request', () => {
    test('test when the request give the incorrect id can be a id less than one, then must return a error', async () => {
      const id = -1;
      const url = `/api/v1/tasks/delete/${id}`;

      const request = await api
        .delete(url)
        .expect('Content-Type', /application\/json/);

      expect(request.statusCode).toBe(500);
      expect(request.body).toHaveProperty('name');
    });

    test('test when the request doesnt give the id, then must return a error', async () => {
      const id = '';
      const url = `/api/v1/tasks/delete/${id}`;

      const request = await api.delete(url);

      expect(request.statusCode).toBe(404);
    });

    test('test when the request give the id task but the task didnt found then must return a error', async () => {
      const id = 6;
      const url = `/api/v1/tasks/delete/${id}`;

      const request = await api
        .delete(url)
        .expect('Content-Type', /application\/json/);

      expect(request.statusCode).toBe(404);
      expect(request.body).toHaveProperty('name');
    });
  });

  test('test when the request is success then must response with confirm message', async () => {
    const id = 7;
    const url = `/api/v1/tasks/delete/${id}`;

    const request = await api
      .delete(url)
      .expect('Content-Type', /application\/json/);

    expect(request.statusCode).toBe(200);
    expect(request.body).toHaveProperty('message');
  });
});
