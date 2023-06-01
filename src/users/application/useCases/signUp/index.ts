import {
  type UseCase,
  type Messsage,
  MessageImplementation,
  IdImplementation,
  CreatedDateImplementation,
  IsDeleteImplementation,
} from 'src/common';
import { type DTO } from './DTO';
import type { IOneUser, ICreateUser } from 'users/application/repositories';
import type { CreateId } from 'common/application';
import {
  UserImplementation,
  IsOnlineImplementation,
  AgeImplementation,
} from 'src/users/domain/entities';

export class SignUp implements UseCase<Messsage, DTO> {
  oneUserRepository: IOneUser;
  createUserRepository: ICreateUser;
  createIdService: CreateId;

  constructor(
    oneUserRepository: IOneUser,
    createUserRepository: ICreateUser,
    createIdService: CreateId,
  ) {
    this.oneUserRepository = oneUserRepository;
    this.createUserRepository = createUserRepository;
    this.createIdService = createIdService;
  }

  async execute(props: DTO): Promise<Messsage> {
    const newId = this.createIdService.execute();

    const id = IdImplementation.create(props.id ?? newId);

    const isExitsUser = this.oneUserRepository.withId(id);

    if (isExitsUser != null) {
      throw new Error();
    }

    const isDelete = IsDeleteImplementation.create().isDelete;

    const createdDate = CreatedDateImplementation.create().createdDate;

    const isOnline = IsOnlineImplementation.create();

    const age = AgeImplementation.create(props.birthdate);

    const user = UserImplementation.create({
      ...props,
      id,
      age,
      isOnline,
      isDelete,
      createdDate,
    });

    await this.createUserRepository.save(user);

    const isSavedCorrecly = this.oneUserRepository.withId(user.id);

    if (isSavedCorrecly == null) {
      throw new Error();
    }

    return new MessageImplementation({
      code: 202,
      message: 'The User was created correctly',
    });
  }
}

export type { DTO } from './DTO';
