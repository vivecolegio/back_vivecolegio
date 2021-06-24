import { ApolloGateway, RemoteGraphQLDataSource } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server-express';
import Cors from 'cors';
import Express from 'express';
import expressJwt from 'express-jwt';
import Helmet from 'helmet';
import 'reflect-metadata';
import { port } from './config/index';

async function app() {
  try {
    const gateway = new ApolloGateway({
      serviceList: [{ name: 'servers', url: 'http://localhost:4001/graphql' }],
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
        `🚀 Server ready and listening at ==> http://localhost:${port}${server.graphqlPath}`
      )
    );
  } catch (err) {
    console.error(err);
  }
}

app();
