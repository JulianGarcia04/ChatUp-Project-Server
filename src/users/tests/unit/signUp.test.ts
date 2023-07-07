import { type DTO, SignUp } from 'users/application/useCases/signUp';
import type { IOneUser, ICreateUser } from 'users/application/repositories';
import { initialData, uuid } from '../utils/initialData';
import type { User } from 'src/users/domain/interfaces';
import RepositoryFns from '../utils/RepositoryFns';
import { MockClass } from 'common/mocks';
import type { CreateId } from 'common/application/services';
import { ExceptionImplementation, MessageImplementation } from 'src/common';

const repositoryFns = new RepositoryFns([]);

beforeEach(() => {
  repositoryFns.users = [];
  repositoryFns.users = initialData;
});

const OneUserRepositoryMock = MockClass(
  ['withId', 'withAnotherProp'],
  [
    async (id: string | number) => await repositoryFns.findById(id),
    async (prop: unknown) => await repositoryFns.findOne(prop as User),
  ],
);

const CreateUserRepositoryMock = MockClass(
  ['save'],
  [
    async (userDomain: User): Promise<void> => {
      await repositoryFns.create(userDomain);
    },
  ],
);

const CreateUserRepositoryMockFaile = MockClass(
  ['save'],
  [async (userDomain: User): Promise<void> => {}],
);

const CreateIdService = MockClass(['execute'], [(): string => uuid]);

describe('SignUp use case tests', () => {
  const oneUserRepository = new OneUserRepositoryMock() as IOneUser;
  const createUserRepository = new CreateUserRepositoryMock() as ICreateUser;
  const createUserRepositoryFaile =
    new CreateUserRepositoryMockFaile() as ICreateUser;
  const createIdServer = new CreateIdService() as CreateId;

  describe('DTO tests', () => {
    test('Test when some prop DTO is undefined or null then must return error', async () => {
      const singUpUseCase = new SignUp(
        oneUserRepository,
        createUserRepository,
        createIdServer,
      );
      const props = {
        name: null,
        lastname: null,
        genre: null,
        phone: null,
        pin: '12345',
      };

      const executeFn = singUpUseCase.execute(props as unknown as DTO);

      await expect(executeFn).rejects.toBeInstanceOf(ExceptionImplementation);
    });

    test('Test when some prop DTO dont has the correct type then must return a error', async () => {
      const singUpUseCase = new SignUp(
        oneUserRepository,
        createUserRepository,
        createIdServer,
      );
      const props = {
        name: 12312,
        lastname: true,
        genre: 675756,
        phone: 'hola mundo',
        pin: '12345',
      };

      const executeFn = singUpUseCase.execute(props as unknown as DTO);

      await expect(executeFn).rejects.toBeInstanceOf(TypeError);
    });

    test('Test when set the id prop is repeat then must return a error', async () => {
      const singUpUseCase = new SignUp(
        oneUserRepository,
        createUserRepository,
        createIdServer,
      );
      const props: DTO = {
        id: 1,
        name: 'Julián',
        lastname: 'García',
        genre: 'male',
        phone: '+573045367660',
        birthdate: new Date(2000, 1, 4),
        email: 'jcgrrincon@gmail.com',
        pin: 123123,
      };

      const executeFn = singUpUseCase.execute(props);

      await expect(executeFn).rejects.toBeInstanceOf(ExceptionImplementation);
    });
  });

  test('Test when the user cant be create then must return a error', async () => {
    const singUpUseCase = new SignUp(
      oneUserRepository,
      createUserRepositoryFaile,
      createIdServer,
    );
    const props: DTO = {
      name: 'Julián',
      lastname: 'García',
      genre: 'male',
      phone: '+573045367660',
      birthdate: new Date(2000, 1, 4),
      email: 'jcgrrincon@gmail.com',
      pin: 123123,
    };

    const executeFn = singUpUseCase.execute(props);

    await expect(executeFn).rejects.toBeInstanceOf(ExceptionImplementation);
  });

  test('Test when the user was saved correctly then must return a confirm message', async () => {
    const singUpUseCase = new SignUp(
      oneUserRepository,
      createUserRepository,
      createIdServer,
    );
    const props: DTO = {
      name: 'Julián',
      lastname: 'García',
      genre: 'male',
      phone: '+573045367660',
      birthdate: new Date(2000, 1, 4),
      email: 'jcgrrincon@gmail.com',
      pin: 123123,
    };

    const executeFn = await singUpUseCase.execute(props);

    expect(executeFn).toBeInstanceOf(MessageImplementation);
  });
});
