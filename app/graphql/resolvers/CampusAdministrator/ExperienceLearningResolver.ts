import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { CampusRepository, EvidenceLearningRepository, ExperienceLearningRepository, LearningRepository, UserRepository } from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewExperienceLearning } from '../../inputs/CampusAdministrator/NewExperienceLearning';
import { IContext } from '../../interfaces/IContext';
import { ExperienceLearning, ExperienceLearningConnection } from '../../models/CampusAdministrator/ExperienceLearning';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { User } from '../../models/GeneralAdministrator/User';
import { EvidenceLearning } from '../../models/SchoolAdministrator/EvidenceLearning';
import { Learning } from '../../models/SchoolAdministrator/Learning';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(ExperienceLearning)
export class ExperienceLearningResolver {
    @InjectRepository(ExperienceLearning)
    private repository = ExperienceLearningRepository;

    @InjectRepository(User)
    private repositoryUser = UserRepository;

    @InjectRepository(Campus)
    private repositoryCampus = CampusRepository;

    @InjectRepository(Learning)
    private repositoryLearning = LearningRepository;

    @InjectRepository(EvidenceLearning)
    private repositoryEvidenceLearning = EvidenceLearningRepository;

    @Query(() => ExperienceLearning, { nullable: true })
    async getExperienceLearning(@Arg('id', () => String) id: string) {
        const result = await this.repository.findOneBy(id);
        return result;
    }

    @Query(() => ExperienceLearningConnection)
    async getAllExperienceLearning(
        @Args() args: ConnectionArgs,
        @Arg('allData', () => Boolean) allData: Boolean,
        @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
        @Arg('campusId', () => String) campusId: String,
        @Arg('academicAsignatureCourseId', () => String, { nullable: true }) academicAsignatureCourseId: String,
    ): Promise<ExperienceLearningConnection> {
        let result;
        if (allData) {
            if (orderCreated) {
                if (academicAsignatureCourseId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicAsignatureCourseId
                        },
                        order: { createdAt: 'DESC' },
                    });
                } else {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            } else {
                if (academicAsignatureCourseId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicAsignatureCourseId
                        },
                    });
                } else {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                        },
                    });
                }
            }
        } else {
            if (orderCreated) {
                if (academicAsignatureCourseId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicAsignatureCourseId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                } else {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                }
            } else {
                if (academicAsignatureCourseId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicAsignatureCourseId,
                            active: true,
                        },
                    });
                } else {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            active: true,
                        },
                    });
                }
            }
        }
        let resultConn = new ExperienceLearningConnection();
        let resultConnection = connectionFromArraySlice(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = { ...resultConnection, totalCount: result.length };
        return resultConn;
    }

    @Mutation(() => ExperienceLearning)
    async createExperienceLearning(@Arg('data') data: NewExperienceLearning, @Ctx() context: IContext): Promise<ExperienceLearning> {
        let dataProcess: NewExperienceLearning = removeEmptyStringElements(data);
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

    @Mutation(() => ExperienceLearning)
    async updateExperienceLearning(
        @Arg('data') data: NewExperienceLearning,
        @Arg('id', () => String) id: string,
        @Ctx() context: IContext
    ): Promise<ExperienceLearning | null> {
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
    async changeActiveExperienceLearning(
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
    async deleteExperienceLearning(
        @Arg('id', () => String) id: string,
        @Ctx() context: IContext
    ): Promise<Boolean | null> {
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: ObjectId(id) });
        return result?.result?.ok === 1 ?? true;
    }

    @FieldResolver((_type) => User, { nullable: true })
    async createdByUser(@Root() data: ExperienceLearning) {
        let id = data.createdByUserId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryUser.findOneBy(id);
            return result;
        }
        return null;
    }

    @FieldResolver((_type) => User, { nullable: true })
    async updatedByUser(@Root() data: ExperienceLearning) {
        let id = data.updatedByUserId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryUser.findOneBy(id);
            return result;
        }
        return null;
    }

    @FieldResolver((_type) => Campus, { nullable: true })
    async campus(@Root() data: ExperienceLearning) {
        let id = data.campusId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryCampus.findOneBy(id);
            return result;
        }
        return null;
    }

    @FieldResolver((_type) => [Learning], { nullable: true })
    async learnigs(@Root() data: ExperienceLearning) {
        let id = data.learningsId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryLearning.findBy({ where: { _id: { $in: id } } });
            return result;
        }
        return null;
    }

    @FieldResolver((_type) => [EvidenceLearning], { nullable: true })
    async evidenciceLearnings(@Root() data: ExperienceLearning) {
        let id = data.evidenciceLearningsId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryEvidenceLearning.findBy({ where: { _id: { $in: id } } });
            return result;
        }
        return null;
    }
}
