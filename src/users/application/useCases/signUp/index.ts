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
import {
  type IdGenerator,
  PropertyIsNull,
  EntityHasAlreadyBeenCreated,
  CantBeSave,
} from 'common/application';
import { isNull } from 'common/application/utils';
import {
  UserImplementation,
  IsOnlineImplementation,
  AgeImplementation,
} from 'src/users/domain/entities';

export class SignUp implements UseCase<Messsage, DTO> {
  oneUserRepository: IOneUser;
  createUserRepository: ICreateUser;
  createIdService: IdGenerator;

  constructor(
    oneUserRepository: IOneUser,
    createUserRepository: ICreateUser,
    createIdService: IdGenerator,
  ) {
    this.oneUserRepository = oneUserRepository;
    this.createUserRepository = createUserRepository;
    this.createIdService = createIdService;
  }

  async execute(props: DTO): Promise<Messsage> {
    const isNullProperties = isNull<DTO>(props, ['id']);

    if (!isNullProperties.success && isNullProperties.key != null) {
      throw new PropertyIsNull(isNullProperties?.key);
    }

    const newId = this.createIdService.execute();

    const id = IdImplementation.create(props.id ?? newId);

    const isExitsUser = await this.oneUserRepository.withId(id);

    if (isExitsUser != null) {
      throw new EntityHasAlreadyBeenCreated('user');
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

    const wasSavedCorrecly = await this.oneUserRepository.withId(user.id);

    if (wasSavedCorrecly == null) {
      throw new CantBeSave('user');
    }

    return new MessageImplementation({
      code: 202,
      message: 'The User was created correctly',
    });
  }
}

export type { DTO } from './DTO';
