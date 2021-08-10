import { buildFederatedSchema, printSchema } from '@apollo/federation';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { applyMiddleware } from 'graphql-middleware';
import gql from 'graphql-tag';
import 'reflect-metadata';
import { buildSchemaSync, createResolversMap } from 'type-graphql';
import { createConnections } from 'typeorm';
import { dbHost, dbName, dbPassword, dbPort, dbUser } from '../config';
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
import { RoleMenu } from '../graphql/models/GeneralAdministrator/RoleMenu';
import { User } from '../graphql/models/GeneralAdministrator/User';
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
import { RoleMenuResolver } from './../graphql/resolvers/GeneralAdministrator/RoleMenuResolver';
import { RoleResolver } from './../graphql/resolvers/GeneralAdministrator/RoleResolver';
import { SchoolAdministratorResolver } from './../graphql/resolvers/GeneralAdministrator/SchoolAdministratorResolver';
import { SchoolResolver } from './../graphql/resolvers/GeneralAdministrator/SchoolResolver';
import { StudentResolver } from './../graphql/resolvers/GeneralAdministrator/StudentResolver';
import { UserResolver } from './../graphql/resolvers/GeneralAdministrator/UserResolver';

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
  plugins: [
    // ApolloServerPluginLandingPageGraphQLPlayground(),
    // ApolloServerPluginUsageReporting({
    //   sendVariableValues: { all: true },
    // }),
    ApolloServerPluginInlineTraceDisabled(),
  ],
});

const app = express();

//app.use(graphqlUploadExpress({max}))
server.start().then(() => {
  server.applyMiddleware({ app });
});

app.listen({ port }, () => {
  console.log('Server service ready -V2');
});
