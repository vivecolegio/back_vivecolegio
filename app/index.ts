import { ApolloGateway } from '@apollo/gateway';
import FileUploadDataSource from '@profusion/apollo-federation-upload';
import { ApolloServerPluginInlineTraceDisabled } from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import Cors from 'cors';
import Express from 'express';
import expressJwt from 'express-jwt';
import { graphqlUploadExpress } from 'graphql-upload';
import Helmet from 'helmet';
import 'reflect-metadata';
import { port } from './config/index';

const expressHealthApi = require('express-health-api');

async function app() {
  try {
    const gateway = new ApolloGateway({
      serviceList: [
        { name: 'servers', url: 'http://backendcolegio.vhmsoluciones.com:4001/graphql' },
      ],
      buildService({ url }: any) {
        return new FileUploadDataSource({
          url,
          willSendRequest({ request, context }: any) {
            request.http.headers.set('user', context.user ? JSON.stringify(context.user) : null);
          },
        });
      },
    });
    const server = new ApolloServer({
      gateway,
      // playground: true,
      plugins: [
        // ApolloServerPluginLandingPageGraphQLPlayground(),
        // ApolloServerPluginUsageReporting({
        //   sendVariableValues: { all: true },
        // }),
        ApolloServerPluginInlineTraceDisabled(),
      ],
      introspection: true,
      context: ({ req }: any) => {
        const user = req.user || null;
        return { user };
      },
    });
    const app = Express();
    app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }))
    app.use(expressHealthApi({ apiPath: '/health' }))
    app.use(
      Helmet({
        contentSecurityPolicy: false,
      })
    );
    app.use(Express.json());
    app.use(Cors());
    app.use(
      expressJwt({
        secret: 'f1BtnWgD3VKY',
        algorithms: ['HS256'],
        credentialsRequired: false,
      })
    );
    server.start().then(() => {
      server.applyMiddleware({ app });
    });
    app.listen({ port: port }, () =>
      console.log(
        `🚀 Server ready and listening at ==> http://backendcolegio.vhmsoluciones.com:${port}${server.graphqlPath}`
      )
    );
  } catch (err) {
    console.error(err);
  }
}

app();
