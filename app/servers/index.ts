import { buildSubgraphSchema } from '@apollo/federation';
import { printSubgraphSchema } from '@apollo/subgraph';
import {
  ApolloServerPluginLandingPageLocalDefault,
  ApolloServerPluginLandingPageProductionDefault
} from 'apollo-server-core';
import { ApolloServer } from 'apollo-server-express';
import Cors from 'cors';
import express from 'express';
import gql from 'graphql-tag';
import { graphqlUploadExpress } from 'graphql-upload';
import { express as voyagerMiddleware } from 'graphql-voyager/middleware';
import Morgan from 'morgan';
import 'reflect-metadata';
import { buildSchemaSync, createResolversMap } from 'type-graphql';
import { SERVER_NAME_APP, SERVER_PORT_APP } from '../config';
import { AcademicAsignatureCourseResolver } from '../graphql/resolvers/CampusAdministrator/AcademicAsignatureCourseResolver';
import { AcademicHourResolver } from '../graphql/resolvers/CampusAdministrator/AcademicHourResolver';
import { AcademicScheduleResolver } from '../graphql/resolvers/CampusAdministrator/AcademicScheduleResolver';
import { ExperienceLearningCoEvaluationResolver } from '../graphql/resolvers/CampusAdministrator/ExperienceLearningCoEvaluationResolver';
import { ExperienceLearningCoEvaluationValuationResolver } from '../graphql/resolvers/CampusAdministrator/ExperienceLearningCoEvaluationValuationResolver';
import { ExperienceLearningResolver } from '../graphql/resolvers/CampusAdministrator/ExperienceLearningResolver';
import { ExperienceLearningRubricCriteriaPerformanceLevelResolver } from '../graphql/resolvers/CampusAdministrator/ExperienceLearningRubricCriteriaPerformanceLevelResolver';
import { ExperienceLearningRubricCriteriaResolver } from '../graphql/resolvers/CampusAdministrator/ExperienceLearningRubricCriteriaResolver';
import { ExperienceLearningRubricCriteriaValuationResolver } from '../graphql/resolvers/CampusAdministrator/ExperienceLearningRubricCriteriaValuationResolver';
import { ExperienceLearningRubricValuationResolver } from '../graphql/resolvers/CampusAdministrator/ExperienceLearningRubricValuationResolver';
import { ExperienceLearningSelfAssessmentValuationResolver } from '../graphql/resolvers/CampusAdministrator/ExperienceLearningSelfAssessmentValuationResolver';
import { ExperienceLearningTraditionalValuationResolver } from '../graphql/resolvers/CampusAdministrator/ExperienceLearningTraditionalValuationResolver';
import { AuditLoginResolver } from '../graphql/resolvers/GeneralAdministrator/AuditLoginResolver';
import { GenderResolver } from '../graphql/resolvers/GeneralAdministrator/GenderResolver';
import { GeneralAcademicAsignatureResolver } from '../graphql/resolvers/GeneralAdministrator/GeneralAcademicAsignatureResolver';
import { GeneralBasicLearningRightResolver } from '../graphql/resolvers/GeneralAdministrator/GeneralBasicLearningRightResolver';
import { EvidenceLearningResolver } from '../graphql/resolvers/SchoolAdministrator/EvidenceLearningResolver';
import { ForumInteractionResolver } from '../graphql/resolvers/SchoolAdministrator/ForumInteractionResolver';
import { ForumResolver } from '../graphql/resolvers/SchoolAdministrator/ForumResolver';
import { LearningResolver } from '../graphql/resolvers/SchoolAdministrator/LearningResolver';
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
import { dataSource } from './DataSource';

const PORT = SERVER_PORT_APP;
const SERVER_NAME = SERVER_NAME_APP;

async function app() {
  try {
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
        ForumResolver,
        ForumInteractionResolver,
        AcademicAsignatureCourseResolver,
        AcademicScheduleResolver,
        LearningResolver,
        EvidenceLearningResolver,
        GeneralBasicLearningRightResolver,
        ExperienceLearningResolver,
        ExperienceLearningTraditionalValuationResolver,
        ExperienceLearningSelfAssessmentValuationResolver,
        ExperienceLearningCoEvaluationValuationResolver,
        ExperienceLearningCoEvaluationResolver,
        ExperienceLearningRubricCriteriaPerformanceLevelResolver,
        ExperienceLearningRubricCriteriaResolver,
        ExperienceLearningRubricValuationResolver,
        ExperienceLearningRubricCriteriaValuationResolver
      ],
      emitSchemaFile: true,
      validate: false,
    });

    const federatedSchema = buildSubgraphSchema({
      typeDefs: gql(printSubgraphSchema(schema)),
      resolvers: createResolversMap(schema) as any,
    });

    await dataSource
      .initialize()
      .then((connection) => {
        console.log('TypeORM with mongodb: ' + SERVER_NAME);
        // console.log(connection.options);
        // console.log(connection.driver.options);
      })
      .catch((error) => {
        console.error(error);
      });

    const server = new ApolloServer({
      //schema: applyMiddleware(federatedSchema, permissions),
      schema: federatedSchema,
      context: ({ req }: any) => {
        const user = req?.headers?.user ? JSON.parse(req?.headers?.user) : null;
        return { user };
      },
      introspection: true,
      plugins: [
        process.env.NODE_ENV === 'production'
          ? ApolloServerPluginLandingPageProductionDefault({ footer: false })
          : ApolloServerPluginLandingPageLocalDefault({ footer: false }),
      ],
      formatError: (err) => {
        const errorReport = {
          message: err.message,
          locations: err.locations,
          path: err.path,
          stacktrace: err.extensions?.exception?.stacktrace || [],
          code: err.extensions?.code,
        };
        console.error('GraphQL Error', errorReport);
        if (errorReport.code == 'INTERNAL_SERVER_ERROR') {
          return {
            message: 'Oops! Something went wrong! :(',
            code: errorReport.code,
          };
        }
        return errorReport;
      },
    });

    const app = express();
    // Middlewares
    app.use(`/healthcheck-${SERVER_NAME}`, require('express-healthcheck')());
    app.use(Morgan('common'));
    // app.use(Helmet());
    app.use(Cors());
    app.use('/voyager', voyagerMiddleware({ endpointUrl: '/graphql' }));

    // const openApi = OpenAPI({
    //   schema,
    //   info: {
    //     title: 'Example API',
    //     version: '3.0.0',
    //   },
    // });

    // app.use('/api', useSofa({ basePath:'/api', schema, onRoute(info) {
    //   openApi.addRoute(info, {
    //     basePath: '/api',
    //   });
    // }, }));

    // // writes every recorder route
    // openApi.save('./swagger.yml');

    // const swaggerDocument = require('../../../swagger.json');

    // app.use(
    //   '/api-docs',
    //   swaggerUi.serve,
    //   swaggerUi.setup(swaggerDocument)
    // );

    // app.use(swStats.getMiddleware({swaggerSpec:apiSpec}));

    app.use(graphqlUploadExpress({ maxFileSize: 1000000000, maxFiles: 10 }));

    server.start().then(() => {
      server.applyMiddleware({ app });
    });

    app.listen({ port: PORT }, () => {
      console.log(
        `🚀 Server ${SERVER_NAME} Ready and Listening at ==> http://localhost:${PORT}${server.graphqlPath}`
      );
    });

  } catch (err) {
    console.error(err);
  }
}

app();
