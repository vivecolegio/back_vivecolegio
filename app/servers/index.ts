
import { applyMiddleware } from 'graphql-middleware';
import gql from 'graphql-tag';
import { printSchema, buildFederatedSchema } from '@apollo/federation';
import 'reflect-metadata';
import { buildSchema, buildSchemaSync, createResolversMap } from 'type-graphql';
import { dbUser, dbPassword, dbName, dbHost, dbPort } from '../config';
import * as TypeORM from 'typeorm';

const port = 4001;

import { UserResolver } from '../graphql/administration/resolvers/UserResolver';
import { AuditLoginResolver } from '../graphql/administration/resolvers/AuditLoginResolver';
import { CategoryEmailResolver } from '../graphql/administration/resolvers/CategoryEmailResolver';
import { CategoryNotificationResolver } from '../graphql/administration/resolvers/CategoryNotificationResolver';
import { EmailResolver } from '../graphql/administration/resolvers/EmailResolver';
import { InboxResolver } from '../graphql/administration/resolvers/InboxResolver';
import { MenuResolver } from '../graphql/administration/resolvers/MenuResolver';
import { ModuleResolver } from '../graphql/administration/resolvers/ModuleResolver';
import { NotificationResolver } from '../graphql/administration/resolvers/NotificationResolver';
import { RoleMenuResolver } from '../graphql/administration/resolvers/RoleMenuResolver';
import { RoleResolver } from '../graphql/administration/resolvers/RoleResolver';
import { SettingEmailResolver } from '../graphql/administration/resolvers/SettingEmailResolver';
import { SettingNotificationResolver } from '../graphql/administration/resolvers/SettingNotificationResolver';
import { VersionResolver } from '../graphql/administration/resolvers/VersionResolver';

import { User } from '../graphql/administration/models/User';
import { AuditLogin } from '../graphql/administration/models/AuditLogin';
import { CategoryEmail } from '../graphql/administration/models/CategoryEmail';
import { CategoryNotification } from '../graphql/administration/models/CategoryNotification';
import { Email } from '../graphql/administration/models/Email';
import { Inbox } from '../graphql/administration/models/Inbox';
import { Menu } from '../graphql/administration/models/Menu';
import { Module } from '../graphql/administration/models/Module';
import { Notification } from '../graphql/administration/models/Notification';
import { RoleMenu } from '../graphql/administration/models/RoleMenu';
import { Role } from '../graphql/administration/models/Role';
import { SettingEmail } from '../graphql/administration/models/SettingEmail';
import { SettingNotification } from '../graphql/administration/models/SettingNotification';
import { Version } from '../graphql/administration/models/Version';

import { permissions } from './permissions';
import { createConnection, createConnections } from 'typeorm';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

const USER = encodeURIComponent(dbUser as string);
const PASSWORD = encodeURIComponent(dbPassword as string);
const DB_NAME = dbName;

const schema = buildSchemaSync({
  resolvers: [VersionResolver],
  emitSchemaFile: true,
  validate: false,
});

createConnections([
  {
  type: 'mongodb',
  url: `mongodb+srv://${USER}:${PASSWORD}@${dbHost as string}:${dbPort}`,
  authSource: 'admin',
  database:`${DB_NAME}`,
  entities: [Version],
  synchronize: true,
  logger: 'advanced-console',
  logging: 'all',
  dropSchema: false,
  cache: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
]).catch(error =>{
  console.log(error);
});

const federatedSchema = buildFederatedSchema({
  typeDefs: gql(printSchema(schema)),
  resolvers: createResolversMap(schema) as any,
});

const server = new ApolloServer({
  schema: applyMiddleware(federatedSchema, permissions),
  context: ({ req }: any) => {
    const user = req.headers.user ? JSON.parse(req.headers.user) : null;
    return { user };
  },
  introspection: true,
  playground: {
    endpoint: '/graphql'
  },
  uploads: false,
});

const app = express();

//app.use(graphqlUploadExpress({max}))

server.applyMiddleware({app});

app.listen({ port }, () => {
  console.log('Server service ready -V2')
});
