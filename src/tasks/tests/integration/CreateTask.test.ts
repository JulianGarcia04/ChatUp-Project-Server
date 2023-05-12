import { server } from 'src/index';
import { mongodb } from 'src/common/infrastructure/utils';
import { Task } from 'tasks/infrastructure/schemas';
import req from 'supertest';

const app = server.app;

beforeEach(async () => {
  await Task.deleteMany({});
});

afterAll(async () => {
  server?.listener?.close();
  await mongodb.orm.connection.close();
});

describe('POST (/tasks/create) - integration test of create task controller, create task usecase and create task repository', () => {
  describe('body request test, where check that the body request always will be the same', () => {
    test('test when the request is different to {title:string, description:string, isReady:boolean}, then I going to set the {text, data, isReady}, then musnt to pass request', async () => {
      const request = await req(app)
        .post('/api/v1/tasks/create')
        .send({
          title: 'muc',
          description: 'muchos loros 3',
          isCheck: true,
          text: 'sadasdasd',
          isReady: false,
        })
        .expect('Content-Type', /application\/json/);
      expect(request.statusCode).toBe(400);
    });
  });

  test('test when the body request has {id:string | number, title:string, description:string, isReady:boolean}, then must create a task with this id', async () => {
    const request = await req(app)
      .post('/api/v1/tasks/create')
      .send({
        id: 1,
        title: 'test 1',
        description: 'muchos loros 3',
        isReady: false,
      })
      .expect('Content-Type', /application\/json/);

    expect(request.statusCode).toBe(202);

    const checkTest = await Task.findOne({ id: 1 });

    expect(checkTest).toHaveProperty('id', 1);
  });

  test('test when the body request has {title:string, description:string, isReady:boolean}, then must create a task with a random uuid', async () => {
    const request = await req(app)
      .post('/api/v1/tasks/create')
      .send({
        title: 'test 1',
        description: 'muchos loros 3',
        isReady: false,
      })
      .expect('Content-Type', /application\/json/);

    expect(request.statusCode).toBe(202);

    const checkTest = await Task.find({ isDelete: false });

    expect(checkTest).toHaveLength(1);
  });
});
