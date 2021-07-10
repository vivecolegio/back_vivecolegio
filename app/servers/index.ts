import { buildFederatedSchema, printSchema } from '@apollo/federation';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import gql from 'graphql-tag';
import 'reflect-metadata';
import { buildSchemaSync, createResolversMap } from 'type-graphql';
import { createConnections } from 'typeorm';
import { dbHost, dbName, dbPassword, dbPort, dbUser } from '../config';
import { DocumentType } from '../graphql/models/DocumentType';
import { Email } from '../graphql/models/Email';
import { Gender } from '../graphql/models/Gender';
import { GeneralAcademicArea } from '../graphql/models/GeneralAcademicArea';
import { Inbox } from '../graphql/models/Inbox';
import { Menu } from '../graphql/models/Menu';
import { Module } from '../graphql/models/Module';
import { Notification } from '../graphql/models/Notification';
import { Role } from '../graphql/models/Role';
import { RoleMenu } from '../graphql/models/RoleMenu';
import { User } from '../graphql/models/User';
import { GenderResolver } from '../graphql/resolvers/GenderResolver';
import { GeneralAcademicAsignatureResolver } from '../graphql/resolvers/GeneralAcademicAsignatureResolver';
import { AuditLogin } from './../graphql/models/AuditLogin';
import { Campus } from './../graphql/models/Campus';
import { GeneralAcademicAsignature } from './../graphql/models/GeneralAcademicAsignature';
import { GeneralAcademicCycle } from './../graphql/models/GeneralAcademicCycle';
import { GeneralAcademicGrade } from './../graphql/models/GeneralAcademicGrade';
import { GeneralAcademicStandard } from './../graphql/models/GeneralAcademicStandard';
import { GeneralPerformanceLevel } from './../graphql/models/GeneralPerformanceLevel';
import { MenuItem } from './../graphql/models/MenuItem';
import { Municipality } from './../graphql/models/Municipality';
import { School } from './../graphql/models/School';
import { SchoolAdministrator } from './../graphql/models/SchoolAdministrator';
import { Student } from './../graphql/models/Student';
import { AuditLoginResolver } from './../graphql/resolvers/AuditLoginResolver';
import { CampusResolver } from './../graphql/resolvers/CampusResolver';
import { DocumentTypeResolver } from './../graphql/resolvers/DocumentTypeResolver';
import { EmailResolver } from './../graphql/resolvers/EmailResolver';
import { GeneralAcademicAreaResolver } from './../graphql/resolvers/GeneralAcademicAreaResolver';
import { GeneralAcademicCycleResolver } from './../graphql/resolvers/GeneralAcademicCycleResolver';
import { GeneralAcademicGradeResolver } from './../graphql/resolvers/GeneralAcademicGradeResolver';
import { GeneralAcademicStandardResolver } from './../graphql/resolvers/GeneralAcademicStandardResolver';
import { GeneralPerformanceLevelResolver } from './../graphql/resolvers/GeneralPerformanceLevelResolver';
import { InboxResolver } from './../graphql/resolvers/InboxResolver';
import { MenuItemResolver } from './../graphql/resolvers/MenuItemResolver';
import { MenuResolver } from './../graphql/resolvers/MenuResolver';
import { ModuleResolver } from './../graphql/resolvers/ModuleResolver';
import { MunicipalityResolver } from './../graphql/resolvers/MunicipalityResolver';
import { NotificationResolver } from './../graphql/resolvers/NotificationResolver';
import { RoleMenuResolver } from './../graphql/resolvers/RoleMenuResolver';
import { RoleResolver } from './../graphql/resolvers/RoleResolver';
import { SchoolAdministratorResolver } from './../graphql/resolvers/SchoolAdministratorResolver';
import { SchoolResolver } from './../graphql/resolvers/SchoolResolver';
import { StudentResolver } from './../graphql/resolvers/StudentResolver';
import { UserResolver } from './../graphql/resolvers/UserResolver';

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
    RoleMenuResolver,
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
      RoleMenu,
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

const federatedSchema = buildFederatedSchema({
  typeDefs: gql(printSchema(schema)),
  resolvers: createResolversMap(schema) as any,
});

const server = new ApolloServer({
  //schema: applyMiddleware(federatedSchema, permissions),
  schema: applyMiddleware(federatedSchema),
  context: ({ req }: any) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user };
  },
  introspection: true,
  playground: {
    endpoint: '/graphql',
  },
  uploads: false,
});

const app = express();

//app.use(graphqlUploadExpress({max}))

server.applyMiddleware({ app });

app.listen({ port }, () => {
  console.log('Server service ready -V2');
});
