/* import { gql } from 'graphql-request';

export const QUERY_GET_ALL_GRADE_ASSIGNMENT = gql`
  query getAllGradeAssignment(
    $schoolId: String!
    $academicGradeId: String
    $academicAsignatureId: String
    $orderCreated: Boolean!
    $allData: Boolean!
  ) {
    data: getAllGradeAssignment(
      schoolId: $schoolId
      academicGradeId: $academicGradeId
      academicAsignatureId: $academicAsignatureId
      orderCreated: $orderCreated
      allData: $allData
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          schoolId
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          minHourlyIntensity
          maxHourlyIntensity
          academicGradeId
          academicAsignatureId
          schoolYearId
          entityBaseId
          school {
            id
            active
            version
            name
            daneCode
          }
          academicGrade {
            id
            schoolId
            active
            name
            schoolYearId
          }
          academicAsignature {
            id
            schoolId
            active
            name
            abbreviation
            schoolYearId
          }
          schoolYear {
            id
            schoolId
            active
            schoolYear
          }
        }
      }
    }
  }
`;

export const QUERY_GET_TOTAL_COUNT_GRADE_ASSIGNMENT = gql`
  query getTotalCountGradeAssignment($schoolId: String!, $schoolYearId: String) {
    data: getAllGradeAssignment(
      schoolId: $schoolId
      schoolYearId: $schoolYearId
      first: 0
      orderCreated: false
      allData: true
    ) {
      totalCount
    }
  }
`;
 */