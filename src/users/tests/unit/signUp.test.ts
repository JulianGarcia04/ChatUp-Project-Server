import { type DTO, SignUp } from 'users/application/useCases/signUp';
import type { IOneUser, ICreateUser } from 'users/application/repositories';
import { initialData, uuid } from '../utils/initialData';
import type { User } from 'src/users/domain/interfaces';
import RepositoryFns from '../utils/RepositoryFns';
import { MockClass } from 'common/mocks';
import type { CreateId } from 'common/application/services';

const repositoryFns = new RepositoryFns([]);

beforeAll(() => {
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

const CreateIdService = MockClass(['execute'], [(): string => uuid]);

describe('Tests signUp use case', () => {
  const oneUserRepository = new OneUserRepositoryMock() as IOneUser;
  const createUserRepository = new CreateUserRepositoryMock() as ICreateUser;
  const createIdServer = new CreateIdService() as CreateId;
});
