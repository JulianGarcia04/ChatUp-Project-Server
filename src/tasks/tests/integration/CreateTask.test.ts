import { server } from 'src/index';
import req from 'supertest';

const app = server.app;

describe('POST (/tasks/create) - integration test of create task controller, create task usecase and create task repository', () => {
  test('must return in json', async () => {
    await req(app).post('/tasks/create').send({
      title: 'hola mundo',
      description: 'mundo 2',
      isReady: true,
    });
  });
});
