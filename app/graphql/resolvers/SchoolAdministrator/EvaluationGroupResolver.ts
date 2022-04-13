import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { EvaluationGroupRepository, SchoolRepository, UserRepository } from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewEvaluationGroup } from '../../inputs/SchoolAdministrator/NewEvaluationGroup';
import { IContext } from '../../interfaces/IContext';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import {
    EvaluationGroup,
    EvaluationGroupConnection
} from '../../models/SchoolAdministrator/EvaluationGroup';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(EvaluationGroup)
export class EvaluationGroupResolver {
    @InjectRepository(EvaluationGroup)
    private repository = EvaluationGroupRepository;

    @InjectRepository(User)
    private repositoryUser = UserRepository;

    @InjectRepository(School)
    private repositorySchool = SchoolRepository;

    @Query(() => EvaluationGroup, { nullable: true })
    async getEvaluationGroup(@Arg('id', () => String) id: string) {
        const result = await this.repository.findOneBy(id);
        return result;
    }

    @Query(() => EvaluationGroupConnection)
    async getAllEvaluationGroup(
        @Args() args: ConnectionArgs,
        @Arg('allData', () => Boolean) allData: Boolean,
        @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
        @Arg('schoolId', () => String) schoolId: String,
    ): Promise<EvaluationGroupConnection> {
        let result;
        if (allData) {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: { schoolId },
                    order: { createdAt: 'DESC' },
                });
            } else {
                result = await this.repository.findBy({ where: { schoolId } });
            }
        } else {
            if (orderCreated) {
                result = await this.repository.findBy({
                    where: {
                        schoolId,
                        active: true,
                    },
                    order: { createdAt: 'DESC' },
                });
            } else {
                result = await this.repository.findBy({
                    where: {
                        schoolId,
                        active: true,
                    },
                });
            }
        }
        let resultConn = new EvaluationGroupConnection();
        let resultConnection = connectionFromArraySlice(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = { ...resultConnection, totalCount: result.length };
        return resultConn;
    }

    @Mutation(() => EvaluationGroup)
    async createEvaluationGroup(
        @Arg('data') data: NewEvaluationGroup,
        @Ctx() context: IContext
    ): Promise<EvaluationGroup> {
        let dataProcess: NewEvaluationGroup = removeEmptyStringElements(data);
        let createdByUserId = context?.user?.authorization?.id;
        const model = await this.repository.create({
            ...dataProcess,
            active: true,
            version: 0,
            createdByUserId,
        });
        let result = await this.repository.save(model);
        return result;
    }

    @Mutation(() => EvaluationGroup)
    async updateEvaluationGroup(
        @Arg('data') data: NewEvaluationGroup,
        @Arg('id', () => String) id: string,
        @Ctx() context: IContext
    ): Promise<EvaluationGroup | null> {
        let dataProcess = removeEmptyStringElements(data);
        let updatedByUserId = context?.user?.authorization?.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save({
            _id: new ObjectId(id),
            ...result,
            ...dataProcess,
            version: (result?.version as number) + 1,
            updatedByUserId,
        });
        return result;
    }

    @Mutation(() => Boolean)
    async changeActiveEvaluationGroup(
        @Arg('active', () => Boolean) active: boolean,
        @Arg('id', () => String) id: string,
        @Ctx() context: IContext
    ): Promise<Boolean | null> {
        let updatedByUserId = context?.user?.authorization?.id;
        let result = await this.repository.findOneBy(id);
        result = await this.repository.save({
            _id: new ObjectId(id),
            ...result,
            active: active,
            version: (result?.version as number) + 1,
            updatedByUserId,
        });
        if (result.id) {
            return true;
        } else {
            return false;
        }
    }

    @Mutation(() => Boolean)
    async deleteEvaluationGroup(
        @Arg('id', () => String) id: string,
        @Ctx() context: IContext
    ): Promise<Boolean | null> {
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
        return result?.result?.ok === 1 ?? true;
    }

    @FieldResolver((_type) => User, { nullable: true })
    async createdByUser(@Root() data: EvaluationGroup) {
        let id = data.createdByUserId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryUser.findOneBy(id);
            return result;
        }
        return null;
    }

    @FieldResolver((_type) => User, { nullable: true })
    async updatedByUser(@Root() data: EvaluationGroup) {
        let id = data.updatedByUserId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryUser.findOneBy(id);
            return result;
        }
        return null;
    }

    @FieldResolver((_type) => School, { nullable: true })
    async school(@Root() data: EvaluationGroup) {
        let id = data.schoolId;
        if (id !== null && id !== undefined) {
            const result = await this.repositorySchool.findOneBy(id);
            return result;
        }
        return null;
    }
}
