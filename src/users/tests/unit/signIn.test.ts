import { SignIn, type DTO } from 'users/application/useCases/signIn';
import type { IOneUser } from 'users/application/repositories';
import type { User } from 'src/users/domain/interfaces';
import { MessageImplementation } from 'src/common';
import { MockClass } from 'src/common/mocks';
import {
  OnlyPhone,
  OnlyPin,
  BothProps,
} from 'users/application/useCases/signIn/states';
import RepositoryFns from '../utils/RepositoryFns';
import { initialData } from '../utils/initialData';

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

describe('Unit test of the Sign In use case', () => {
  const foundUser: User = {
    id: 1,
    name: 'Julián',
    lastname: 'García',
    about: 'Io sto imparando la lingua italiana',
    email: 'jcgrrincon@gmail.com',
    age: 19,
    birthdate: new Date('13-02-2004'),
    genre: 'male',
    phone: 3023001508,
    pin: 12345,
    createdDate: new Date(Date.now()),
    isOnline: true,
    isDelete: false,
  };
  const oneUserRepository = new OneUserRepositoryMock() as IOneUser;
  describe('Test of the execute method of the SignIn class', () => {
    test('test when set the props param with empty object, then must throw a error', async () => {
      const initialState = new OnlyPhone();
      const signIn = new SignIn(oneUserRepository, initialState);
      const props: DTO = {};

      const executeFn = signIn.execute(props);

      await expect(executeFn).rejects.toThrow();
    });

    describe('test when the sign in is in two steps, when first set the email and after set the password', () => {
      test('test when set one params (phone) in the props object param then must return confirm message with continue', async () => {
        const initialState = new OnlyPhone();
        const signIn = new SignIn(oneUserRepository, initialState);
        const props: DTO = { phone: 3023001508 };

        const executeFn = await signIn.execute(props);

        expect(executeFn).toBeInstanceOf(MessageImplementation);
        expect(executeFn).toHaveProperty('message', 'continue');
      });

      test('test when only set the pin param in the props object param then must throw error', async () => {
        const initialState = new OnlyPin();
        const signIn = new SignIn(oneUserRepository, initialState);
        const props: DTO = { pin: 12345 };

        const executeFn = await signIn.execute(props, foundUser);

        expect(executeFn).toBeInstanceOf(MessageImplementation);
        expect(executeFn).toHaveProperty('message', 'welcome to the jungle');
      });
    });

    test('test when set the both props (phone, pin) then must do the Sign In normally, then must return a confirm message', async () => {
      const initialState = new BothProps();
      const signIn = new SignIn(oneUserRepository, initialState);
      const props: DTO = { phone: 3023001508, pin: 12345 };

      const executeFn = await signIn.execute(props);

      expect(executeFn).toBeInstanceOf(MessageImplementation);
      expect(executeFn).toHaveProperty('message', 'welcome to the jungle');
    });
  });
});
