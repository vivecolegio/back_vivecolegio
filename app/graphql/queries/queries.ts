import { gql } from 'graphql-request';

export const QUERT_GET_USER = gql`
  query getUser($id: String!) {
    data: getUser(id: $id) {
      active
      birthdate
      createdAt
      createdByUserId
      documentNumber
      documentTypeId
      email
      genderId
      id
      lastName
      name
      password
      phone
      profilePhoto
      roleId
      schoolId
      signaturePhoto
      updatedAt
      updatedByUserId
      username
      version
    }
  }
`;

export const QUERY_GET_ALL_ROLE = gql`
  query getAllRole {
    data: getAllRole(orderCreated: true, allData: true) {
      edges {
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          name
          isSchoolAdministrator
          isSchoolAdministrative
          isCampusAdministrator
          isCampusCoordinator
          isStudent
          isTeacher
          isGuardian
        }
        cursor
      }
      totalCount
    }
  }
`;
