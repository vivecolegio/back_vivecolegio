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

export const QUERT_GET_SCHOOL_ADMINISTRATOR_USER_ID = gql`
  query getSchoolAdministratorUserId($userId: String!) {
    data: getSchoolAdministratorUserId(userId: $userId) {
      active
      campusId
      createdAt
      createdByUserId
      id
      schoolId
      support
      updatedAt
      updatedByUserId
      userId
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

export const QUERY_GET_ALL_MODULE = gql`
  query getAllModule {
    data: getAllModule(orderCreated: true, allData: true) {
      edges {
        node {
          active
          createdAt
          createdByUserId
          id
          name
          updatedAt
          updatedByUserId
          url
          version
        }
        cursor
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_MENU = gql`
  query getAllMenu {
    data: getAllMenu(orderCreated: true, allData: true) {
      edges {
        node {
          activateAction
          active
          createAction
          createdAt
          createdByUserId
          deleteAction
          fullAccess
          icon
          id
          inactiveAction
          isHidden
          moduleId
          name
          order
          readAction
          rolesId
          updateAction
          updatedAt
          updatedByUserId
          version
        }
        cursor
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_MENU_ITEM = gql`
  query getAllMenuItem {
    data: getAllMenuItem(orderCreated: true, allData: true) {
      edges {
        node {
          activateAction
          active
          createAction
          createdAt
          createdByUserId
          deleteAction
          fullAccess
          icon
          id
          inactiveAction
          isHidden
          menuId
          moduleId
          name
          order
          readAction
          rolesId
          updateAction
          updatedAt
          updatedByUserId
          version
        }
        cursor
      }
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_SCHOOL = gql`
  query getAllSchool {
    data: getAllSchool(orderCreated: true, allData: true) {
      edges {
        node {
          active
          createdAt
          createdByUserId
          curricularComponent
          daneCode
          educationalModel
          id
          imgPrincipalSignature
          imgSecretarySignature
          logo
          name
          pedagogicalModel
          textAddress
          textDaneNit
          textPrincipalSignature
          textResolution
          textSecretarySignature
          updatedAt
          updatedByUserId
          version
        }
        cursor
      }
      totalCount
    }
  }
`;

export const QUERT_GET_ALL_SCHOOL_YEAR = gql`
  query getAllSchoolYear($schoolId: String!) {
    data: getAllSchoolYear(schoolId: $schoolId, orderCreated: true, allData: true) {
      edges {
        node {
          id
          schoolId
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          schoolYear
          startDate
          endDate
          folioNumber
          schoolYearImportId
        }
      }
      totalCount
    }
  }
`;

export const QUERT_GET_ACADEMIC_PERIOD_SCHOOL_YEAR = gql`
  query getAcademicPeriodSchoolYear($schoolId: String!, $schoolYearId: String!) {
    data: getAcademicPeriodSchoolYear(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      edges {
        node {
          id
          schoolId
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          name
          schoolYearId
          startDate
          endDate
          startDateRecovery
          endDateRecovery
          weight
          order
          entityBaseId
        }
      }
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_EDUCATION_LEVEL = gql`
  query getAllEducationLevelTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllEducationLevelSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_PERFORMANCE_LEVEL = gql`
  query getAllPerformanceLevelTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllPerformanceLevelSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_EVALUATIVE_COMPONENT = gql`
  query getAllEvaluativeComponentTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllEvaluativeComponentSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_MODALITY = gql`
  query getAllModalityTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllModalitySyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_SPECIALITY = gql`
  query getAllSpecialtyTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllSpecialtySyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA = gql`
  query getAllAcademicAreaTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllAcademicAreaSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE = gql`
  query getAllAcademicAsignatureTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllAcademicAsignatureSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_GRADE = gql`
  query getAllAcademicGradeTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllAcademicGradeSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_COURSE = gql`
  query getAllCourseTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllCourseSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_TEACHER = gql`
  query getAllTeacherTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllTeacherSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_STUDENT = gql`
  query getAllStudentTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllStudentSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`;
