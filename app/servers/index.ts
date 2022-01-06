import { buildSubgraphSchema } from '@apollo/federation';
import { printSubgraphSchema } from '@apollo/subgraph';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import gql from 'graphql-tag';
import { graphqlUploadExpress } from 'graphql-upload';
import 'reflect-metadata';
import { buildSchemaSync, createResolversMap } from 'type-graphql';
import { createConnections } from 'typeorm';
import { dbHost, dbName, dbPassword, dbPort, dbUser } from '../config';
import { AcademicDay } from '../graphql/models/CampusAdministrator/AcademicDay';
import { AcademicHour } from '../graphql/models/CampusAdministrator/AcademicHour';
import { Course } from '../graphql/models/CampusAdministrator/Course';
import { Guardian } from '../graphql/models/CampusAdministrator/Guardian';
import { Teacher } from '../graphql/models/CampusAdministrator/Teacher';
import { AuditLogin } from '../graphql/models/GeneralAdministrator/AuditLogin';
import { DocumentType } from '../graphql/models/GeneralAdministrator/DocumentType';
import { Email } from '../graphql/models/GeneralAdministrator/Email';
import { Gender } from '../graphql/models/GeneralAdministrator/Gender';
import { GeneralAcademicArea } from '../graphql/models/GeneralAdministrator/GeneralAcademicArea';
import { Inbox } from '../graphql/models/GeneralAdministrator/Inbox';
import { Menu } from '../graphql/models/GeneralAdministrator/Menu';
import { Module } from '../graphql/models/GeneralAdministrator/Module';
import { Notification } from '../graphql/models/GeneralAdministrator/Notification';
import { Role } from '../graphql/models/GeneralAdministrator/Role';
import { User } from '../graphql/models/GeneralAdministrator/User';
import { AcademicArea } from '../graphql/models/SchoolAdministrator/AcademicArea';
import { AcademicAsignature } from '../graphql/models/SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../graphql/models/SchoolAdministrator/AcademicGrade';
import { AcademicIndicator } from '../graphql/models/SchoolAdministrator/AcademicIndicator';
import { AcademicPeriod } from '../graphql/models/SchoolAdministrator/AcademicPeriod';
import { AcademicStandard } from '../graphql/models/SchoolAdministrator/AcademicStandard';
import { CampusAdministrator } from '../graphql/models/SchoolAdministrator/CampusAdministrator';
import { CampusCoordinator } from '../graphql/models/SchoolAdministrator/CampusCoordinator';
import { EducationLevel } from '../graphql/models/SchoolAdministrator/EducationLevel';
import { EvaluativeComponent } from '../graphql/models/SchoolAdministrator/EvaluativeComponent';
import { GradeAssignment } from '../graphql/models/SchoolAdministrator/GradeAssignment';
import { Modality } from '../graphql/models/SchoolAdministrator/Modality';
import { PerformanceLevel } from '../graphql/models/SchoolAdministrator/PerformanceLevel';
import { SchoolYear } from '../graphql/models/SchoolAdministrator/SchoolYear';
import { Specialty } from '../graphql/models/SchoolAdministrator/Specialty';
import { AcademicHourResolver } from '../graphql/resolvers/CampusAdministrator/AcademicHourResolver';
import { AuditLoginResolver } from '../graphql/resolvers/GeneralAdministrator/AuditLoginResolver';
import { GenderResolver } from '../graphql/resolvers/GeneralAdministrator/GenderResolver';
import { GeneralAcademicAsignatureResolver } from '../graphql/resolvers/GeneralAdministrator/GeneralAcademicAsignatureResolver';
import { Campus } from './../graphql/models/GeneralAdministrator/Campus';
import { GeneralAcademicAsignature } from './../graphql/models/GeneralAdministrator/GeneralAcademicAsignature';
import { GeneralAcademicCycle } from './../graphql/models/GeneralAdministrator/GeneralAcademicCycle';
import { GeneralAcademicGrade } from './../graphql/models/GeneralAdministrator/GeneralAcademicGrade';
import { GeneralAcademicStandard } from './../graphql/models/GeneralAdministrator/GeneralAcademicStandard';
import { GeneralPerformanceLevel } from './../graphql/models/GeneralAdministrator/GeneralPerformanceLevel';
import { MenuItem } from './../graphql/models/GeneralAdministrator/MenuItem';
import { Municipality } from './../graphql/models/GeneralAdministrator/Municipality';
import { School } from './../graphql/models/GeneralAdministrator/School';
import { SchoolAdministrator } from './../graphql/models/GeneralAdministrator/SchoolAdministrator';
import { Student } from './../graphql/models/GeneralAdministrator/Student';
import { AcademicDayResolver } from './../graphql/resolvers/CampusAdministrator/AcademicDayResolver';
import { CourseResolver } from './../graphql/resolvers/CampusAdministrator/CourseResolver';
import { GuardianResolver } from './../graphql/resolvers/CampusAdministrator/GuardianResolver';
import { TeacherResolver } from './../graphql/resolvers/CampusAdministrator/TeacherResolver';
import { CampusResolver } from './../graphql/resolvers/GeneralAdministrator/CampusResolver';
import { DocumentTypeResolver } from './../graphql/resolvers/GeneralAdministrator/DocumentTypeResolver';
import { EmailResolver } from './../graphql/resolvers/GeneralAdministrator/EmailResolver';
import { GeneralAcademicAreaResolver } from './../graphql/resolvers/GeneralAdministrator/GeneralAcademicAreaResolver';
import { GeneralAcademicCycleResolver } from './../graphql/resolvers/GeneralAdministrator/GeneralAcademicCycleResolver';
import { GeneralAcademicGradeResolver } from './../graphql/resolvers/GeneralAdministrator/GeneralAcademicGradeResolver';
import { GeneralAcademicStandardResolver } from './../graphql/resolvers/GeneralAdministrator/GeneralAcademicStandardResolver';
import { GeneralPerformanceLevelResolver } from './../graphql/resolvers/GeneralAdministrator/GeneralPerformanceLevelResolver';
import { InboxResolver } from './../graphql/resolvers/GeneralAdministrator/InboxResolver';
import { MenuItemResolver } from './../graphql/resolvers/GeneralAdministrator/MenuItemResolver';
import { MenuResolver } from './../graphql/resolvers/GeneralAdministrator/MenuResolver';
import { ModuleResolver } from './../graphql/resolvers/GeneralAdministrator/ModuleResolver';
import { MunicipalityResolver } from './../graphql/resolvers/GeneralAdministrator/MunicipalityResolver';
import { NotificationResolver } from './../graphql/resolvers/GeneralAdministrator/NotificationResolver';
import { RoleResolver } from './../graphql/resolvers/GeneralAdministrator/RoleResolver';
import { SchoolAdministratorResolver } from './../graphql/resolvers/GeneralAdministrator/SchoolAdministratorResolver';
import { SchoolResolver } from './../graphql/resolvers/GeneralAdministrator/SchoolResolver';
import { StudentResolver } from './../graphql/resolvers/GeneralAdministrator/StudentResolver';
import { UserResolver } from './../graphql/resolvers/GeneralAdministrator/UserResolver';
import { AcademicAreaResolver } from './../graphql/resolvers/SchoolAdministrator/AcademicAreaResolver';
import { AcademicAsignatureResolver } from './../graphql/resolvers/SchoolAdministrator/AcademicAsignatureResolver';
import { AcademicGradeResolver } from './../graphql/resolvers/SchoolAdministrator/AcademicGradeResolver';
import { AcademicIndicatorResolver } from './../graphql/resolvers/SchoolAdministrator/AcademicIndicatorResolver';
import { AcademicPeriodResolver } from './../graphql/resolvers/SchoolAdministrator/AcademicPeriodResolver';
import { AcademicStandardResolver } from './../graphql/resolvers/SchoolAdministrator/AcademicStandardResolver';
import { CampusAdministratorResolver } from './../graphql/resolvers/SchoolAdministrator/CampusAdministratorResolver';
import { CampusCoordinatorResolver } from './../graphql/resolvers/SchoolAdministrator/CampusCoordinatorResolver';
import { EducationLevelResolver } from './../graphql/resolvers/SchoolAdministrator/EducationLevelResolver';
import { EvaluativeComponentResolver } from './../graphql/resolvers/SchoolAdministrator/EvaluativeComponentResolver';
import { GradeAssignmentResolver } from './../graphql/resolvers/SchoolAdministrator/GradeAssignmentResolver';
import { ModalityResolver } from './../graphql/resolvers/SchoolAdministrator/ModalityResolver';
import { PerformanceLevelResolver } from './../graphql/resolvers/SchoolAdministrator/PerformanceLevelResolver';
import { SchoolYearResolver } from './../graphql/resolvers/SchoolAdministrator/SchoolYearResolver';
import { SpecialtyResolver } from './../graphql/resolvers/SchoolAdministrator/SpecialtyResolver';

const port = 4001;

const USER = encodeURIComponent(dbUser as string);
const PASSWORD = encodeURIComponent(dbPassword as string);
const DB_NAME = dbName;

const schema = buildSchemaSync({
  resolvers: [
    AuditLoginResolver,
    DocumentTypeResolver,
    EmailResolver,
    GenderResolver,
    InboxResolver,
    MenuResolver,
    ModuleResolver,
    NotificationResolver,
    RoleResolver,
    UserResolver,
    MenuItemResolver,
    CampusResolver,
    GeneralAcademicAreaResolver,
    GeneralAcademicAsignatureResolver,
    GeneralAcademicCycleResolver,
    GeneralAcademicGradeResolver,
    GeneralAcademicStandardResolver,
    GeneralPerformanceLevelResolver,
    MunicipalityResolver,
    SchoolAdministratorResolver,
    SchoolResolver,
    StudentResolver,
    AcademicAreaResolver,
    AcademicAsignatureResolver,
    AcademicGradeResolver,
    AcademicIndicatorResolver,
    AcademicPeriodResolver,
    AcademicStandardResolver,
    CampusAdministratorResolver,
    CampusCoordinatorResolver,
    EducationLevelResolver,
    EvaluativeComponentResolver,
    GradeAssignmentResolver,
    ModalityResolver,
    PerformanceLevelResolver,
    SchoolYearResolver,
    SpecialtyResolver,
    AcademicDayResolver,
    AcademicHourResolver,
    CourseResolver,
    GuardianResolver,
    TeacherResolver,
  ],
  emitSchemaFile: true,
  validate: false,
});

createConnections([
  {
    type: 'mongodb',
    url: `mongodb+srv://${USER}:${PASSWORD}@${dbHost as string}:${dbPort}`,
    authSource: 'admin',
    database: `${DB_NAME}`,
    entities: [
      AuditLogin,
      DocumentType,
      Email,
      Gender,
      Inbox,
      Menu,
      Module,
      Notification,
      Role,
      User,
      MenuItem,
      Campus,
      GeneralAcademicArea,
      GeneralAcademicAsignature,
      GeneralAcademicCycle,
      GeneralAcademicGrade,
      GeneralAcademicStandard,
      GeneralPerformanceLevel,
      Municipality,
      School,
      SchoolAdministrator,
      Student,
      AcademicArea,
      AcademicAsignature,
      AcademicGrade,
      AcademicIndicator,
      AcademicPeriod,
      AcademicStandard,
      CampusAdministrator,
      CampusCoordinator,
      EducationLevel,
      EvaluativeComponent,
      GradeAssignment,
      Modality,
      PerformanceLevel,
      SchoolYear,
      Specialty,
      AcademicDay,
      AcademicHour,
      Course,
      Guardian,
      Teacher,
    ],
    synchronize: true,
    logger: 'advanced-console',
    logging: 'all',
    dropSchema: false,
    cache: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
]).catch((error) => {
  console.log(error);
});

const federatedSchema = buildSubgraphSchema({
  typeDefs: gql(printSubgraphSchema(schema)),
  resolvers: createResolversMap(schema) as any,
});

const server = new ApolloServer({
  //schema: applyMiddleware(federatedSchema, permissions),
  schema: applyMiddleware(federatedSchema),
  context: ({ req }: any) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    console.log(req.headers);
    return { user };
  },
  introspection: true,
  plugins: [
    // ApolloServerPluginLandingPageGraphQLPlayground(),
    // ApolloServerPluginUsageReporting({
    //   sendVariableValues: { all: true },
    // }),
    ApolloServerPluginInlineTraceDisabled(),
  ],
});

const app = express();

app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }))

server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen({ port }, () => {
  console.log('Server service ready -V2');
});
