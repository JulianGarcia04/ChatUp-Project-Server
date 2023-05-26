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

describe('PUT (/tasks/update/:id) - integration test of update task controller, change body task usecase and edit task repository', () => {
  describe('tests with the id', () => {
    test('test when the request give the incorrect id can be a id less than one, then must return a error', async () => {
      const body = {
        title: 'Come to the restaurant',
        isReady: false,
      };
      const id = -1;
      const url = `/api/v1/tasks/update/${id}`;

      const request = await api.put(url).send(body);

      expect(request.statusCode).toBe(500);
      expect(request.body).toHaveProperty('name');
    });

    test('test when the request doesnt give the id, then must return a error', async () => {
      const body = {
        title: 'Come to the restaurant',
        isReady: false,
      };
      const id = '';
      const url = `/api/v1/tasks/update/${id}`;

      const request = await api.put(url).send(body);

      expect(request.statusCode).toBe(404);
    });

    test('test when the request give the id task but the task didnt found then must return a error', async () => {
      const body = {
        title: 'Come to the restaurant',
        isReady: false,
      };
      const id = 6;
      const url = `/api/v1/tasks/update/${id}`;

      const request = await api.put(url).send(body);

      expect(request.statusCode).toBe(404);
      expect(request.body).toHaveProperty('name');
    });
  });
  describe('test with the body request', () => {
    test('test when the body request is empty object then must return error', async () => {
      const body = {};
      const id = 5;
      const url = `/api/v1/tasks/update/${id}`;

      const request = await api
        .put(url)
        .send(body)
        .expect('Content-Type', /application\/json/);

      expect(request.statusCode).toBe(406);
      expect(request.body).toHaveProperty('name');
    });

    test('test when the body request has properties that cant be edit for example the id or isDelete', async () => {
      const body = {
        id: 23,
        title: 'Come to the restaurant',
      };
      const id = 5;
      const url = `/api/v1/tasks/update/${id}`;

      const request = await api
        .put(url)
        .send(body)
        .expect('Content-Type', /application\/json/);

      expect(request.statusCode).toBe(403);
      expect(request.body).toHaveProperty('name');
    });
  });

  test('test when the request give the correct id and body is correct then must do the change in the task', async () => {
    const body = {
      title: 'Come to the restaurant',
      isReady: false,
    };
    const id = 5;
    const url = `/api/v1/tasks/update/${id}`;

    const request = await api
      .put(url)
      .send(body)
      .expect('Content-Type', /application\/json/);

    expect(request.statusCode).toBe(202);
    expect(request.body).toHaveProperty('message');
  });
});
