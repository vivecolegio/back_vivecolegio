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
