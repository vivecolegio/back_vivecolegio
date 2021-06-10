import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import 'reflect-metadata';
import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { port } from './config/index';
import Helmet from 'helmet';
import Cors from 'cors';
import expressJwt from 'express-jwt';

async function app() {
  try {
    const gateway = new ApolloGateway({
      serviceList: [{ name: 'servers', url: 'http://backendcolegio.vhmsoluciones.com:4001/graphql' }],
      buildService({ url }: any) {
        return new RemoteGraphQLDataSource({
          url,
          willSendRequest({ request, context }: any) {
            request.http.headers.set('user', context.user ? JSON.stringify(context.user) : null);
          },
        });
      },
    });
    const server = new ApolloServer({
      gateway,
      subscriptions: false,
      playground: true,
      introspection: true,
      context: ({ req }: any) => {
        const user = req.user || null;
        return { user };
      },
    });
    const app = Express();
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
    server.applyMiddleware({ app });
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
