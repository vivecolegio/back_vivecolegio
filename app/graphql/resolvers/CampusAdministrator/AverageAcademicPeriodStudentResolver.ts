import { connectionFromArraySlice } from 'graphql-relay';
import { ObjectId } from 'mongodb';
import { Arg, Args, Ctx, FieldResolver, Mutation, Query, Resolver, Root } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { AcademicDayRepository, AverageAcademicPeriodStudentRepository, CampusRepository, UserRepository } from '../../../servers/DataSource';
import { removeEmptyStringElements } from '../../../types';
import { NewAverageAcademicPeriodStudent } from '../../inputs/CampusAdministrator/NewAverageAcademicPeriodStudent';
import { IContext } from '../../interfaces/IContext';
import { AcademicDay } from '../../models/CampusAdministrator/AcademicDay';
import { AverageAcademicPeriodStudent, AverageAcademicPeriodStudentConnection } from '../../models/CampusAdministrator/AverageAcademicPeriodStudent';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { User } from '../../models/GeneralAdministrator/User';
import { ConnectionArgs } from '../../pagination/relaySpecs';

@Resolver(AverageAcademicPeriodStudent)
export class AverageAcademicPeriodStudentResolver {
    @InjectRepository(AverageAcademicPeriodStudent)
    private repository = AverageAcademicPeriodStudentRepository;

    @InjectRepository(User)
    private repositoryUser = UserRepository;

    @InjectRepository(Campus)
    private repositoryCampus = CampusRepository;

    @InjectRepository(AcademicDay)
    private repositoryAcademicDay = AcademicDayRepository;

    @Query(() => AverageAcademicPeriodStudent, { nullable: true })
    async getAverageAcademicPeriodStudent(@Arg('id', () => String) id: string) {
        const result = await this.repository.findOneBy(id);
        return result;
    }

    @Query(() => AverageAcademicPeriodStudentConnection)
    async getAllAverageAcademicPeriodStudent(
        @Args() args: ConnectionArgs,
        @Arg('allData', () => Boolean) allData: Boolean,
        @Arg('orderCreated', () => Boolean) orderCreated: Boolean,
        @Arg('campusId', () => String, { nullable: true }) campusId: String,
        @Arg('academicDayId', () => String, { nullable: true }) academicDayId: String
    ): Promise<AverageAcademicPeriodStudentConnection> {
        let result;
        if (allData) {
            if (orderCreated) {
                if (campusId && academicDayId) {
                    result = await this.repository.findBy({
                        where: { campusId, academicDayId },
                        order: { createdAt: 'DESC' },
                    });
                } else {
                    if (campusId) {
                        result = await this.repository.findBy({
                            where: { campusId },
                            order: { createdAt: 'DESC' },
                        });
                    } else {
                        result = await this.repository.findBy({
                            where: { academicDayId },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            } else {
                if (campusId && academicDayId) {
                    result = await this.repository.findBy({
                        where: { campusId, academicDayId },
                    });
                } else {
                    if (campusId) {
                        result = await this.repository.findBy({
                            where: { campusId },
                        });
                    } else {
                        result = await this.repository.findBy({
                            where: { academicDayId },
                        });
                    }
                }
            }
        } else {
            if (orderCreated) {
                if (campusId && academicDayId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicDayId,
                            active: true,
                        },
                        order: { createdAt: 'DESC' },
                    });
                } else {
                    if (campusId) {
                        result = await this.repository.findBy({
                            where: {
                                campusId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    } else {
                        result = await this.repository.findBy({
                            where: {
                                academicDayId,
                                active: true,
                            },
                            order: { createdAt: 'DESC' },
                        });
                    }
                }
            } else {
                if (campusId && academicDayId) {
                    result = await this.repository.findBy({
                        where: {
                            campusId,
                            academicDayId,
                            active: true,
                        },
                    });
                } else {
                    if (campusId) {
                        result = await this.repository.findBy({
                            where: {
                                campusId,
                                active: true,
                            },
                        });
                    } else {
                        result = await this.repository.findBy({
                            where: {
                                academicDayId,
                                active: true,
                            },
                        });
                    }
                }
            }
        }
        let resultConn = new AverageAcademicPeriodStudentConnection();
        let resultConnection = connectionFromArraySlice(result, args, {
            sliceStart: 0,
            arrayLength: result.length,
        });
        resultConn = { ...resultConnection, totalCount: result.length };
        return resultConn;
    }

    @Mutation(() => AverageAcademicPeriodStudent)
    async createAverageAcademicPeriodStudent(
        @Arg('data') data: NewAverageAcademicPeriodStudent,
        @Ctx() context: IContext
    ): Promise<AverageAcademicPeriodStudent> {
        let dataProcess: NewAverageAcademicPeriodStudent = removeEmptyStringElements(data);
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

    @Mutation(() => AverageAcademicPeriodStudent)
    async updateAverageAcademicPeriodStudent(
        @Arg('data') data: NewAverageAcademicPeriodStudent,
        @Arg('id', () => String) id: string,
        @Ctx() context: IContext
    ): Promise<AverageAcademicPeriodStudent | null> {
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
    async changeActiveAverageAcademicPeriodStudent(
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
    async deleteAverageAcademicPeriodStudent(
        @Arg('id', () => String) id: string,
        @Ctx() context: IContext
    ): Promise<Boolean | null> {
        let data = await this.repository.findOneBy(id);
        let result = await this.repository.deleteOne({ _id: new ObjectId(id) });
        return result?.result?.ok === 1 ?? true;
    }

    @FieldResolver((_type) => User, { nullable: true })
    async createdByUser(@Root() data: AverageAcademicPeriodStudent) {
        let id = data.createdByUserId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryUser.findOneBy(id);
            return result;
        }
        return null;
    }

    @FieldResolver((_type) => User, { nullable: true })
    async updatedByUser(@Root() data: AverageAcademicPeriodStudent) {
        let id = data.updatedByUserId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryUser.findOneBy(id);
            return result;
        }
        return null;
    }

    @FieldResolver((_type) => Campus, { nullable: true })
    async campus(@Root() data: AverageAcademicPeriodStudent) {
        let id = data.campusId;
        if (id !== null && id !== undefined) {
            const result = await this.repositoryCampus.findOneBy(id);
            return result;
        }
        return null;
    }

}
