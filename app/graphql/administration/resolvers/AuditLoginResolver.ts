import {
  Resolver,
  Mutation,
  Arg,
  Query,
  FieldResolver,
  Root,
} from 'type-graphql';
import { AuditLogin } from '../models/AuditLogin';
import { AuditLoginInput } from '../types/AuditLoginInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from '../models/User';

@Resolver(AuditLogin)
export class AuditLoginResolver {
  @InjectRepository(AuditLogin)
  private auditLoginRepository = getMongoRepository(AuditLogin);

  @InjectRepository(AuditLogin)
  private userRepository = getMongoRepository(User);

  @Query(() => AuditLogin, { nullable: true })
  getAuditLogin(@Arg('id', () => String) id: number) {
    return this.auditLoginRepository.findOne(id);
  }

  @Query(() => [AuditLogin])
  getAllAuditLogins(): Promise<AuditLogin[]> {
    return this.auditLoginRepository.find();
  }

  @Mutation(() => AuditLogin)
  async createAuditLogin(
    @Arg('data') data: AuditLoginInput
  ): Promise<AuditLogin> {
    let user_id = data.userInput?.id ? data.userInput?.id : '';
    const model = await this.auditLoginRepository.create({
      ...data,
      user_id,
    });
    return this.auditLoginRepository.save(model);
  }

  @Mutation(() => AuditLogin)
  async updateAuditLogin(
    @Arg('data') data: AuditLoginInput,
    @Arg('id', () => String) id: string
  ): Promise<AuditLogin | undefined> {
    let auditLogin = await this.auditLoginRepository.findOne(id);
    auditLogin = await this.auditLoginRepository.save({
      _id: new ObjectID(id),
      ...auditLogin,
      ...data,
    });
    return auditLogin;
  }

  @FieldResolver((_type) => User, { nullable: true })
  async user(@Root() auditLogin: AuditLogin) {
    let data = auditLogin.user_id
      ? await this.userRepository.findOne(auditLogin.user_id)
      : null;
    return data;
  }
}
