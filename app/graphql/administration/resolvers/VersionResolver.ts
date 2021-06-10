import { Resolver, Mutation, Arg, Query, FieldResolver, Root, Ctx } from 'type-graphql';
import { Version } from '../models/Version';
import { VersionInput } from '../types/VersionInput';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { getMongoRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from '../models/User';
import { Context } from './UserResolver';

@Resolver(Version)
export class VersionResolver {
  @InjectRepository(Version)
  private VersionRepository = getMongoRepository(Version);

  @InjectRepository(Version)
  private userRepository = getMongoRepository(User);

  @Query(() => Version, { nullable: true })
  getVersion(@Arg('id', () => String) id: number) {
    return this.VersionRepository.findOne(id);
  }

  @Query(() => [Version])
  getAllVersions(): Promise<Version[]> {
    return this.VersionRepository.find();
  }

  @Mutation(() => Version)
  async createVersion(@Arg('data') data: VersionInput, @Ctx() context: Context): Promise<Version> {
    let createdBy_id = context.user.authorization.id;
    const model = await this.VersionRepository.create({
      ...data,
    });
    return this.VersionRepository.save(model);
  }

  @Mutation(() => Version)
  async updateVersion(
    @Arg('data') data: VersionInput,
    @Arg('id', () => String) id: string,
    @Ctx() context: Context
  ): Promise<Version | undefined> {
    let updatedBy_id = context.user.authorization.id;
    let Version = await this.VersionRepository.findOne(id);
    Version = await this.VersionRepository.save({
      _id: new ObjectID(id),
      ...Version,
      ...data,
    });
    return Version;
  }
}
