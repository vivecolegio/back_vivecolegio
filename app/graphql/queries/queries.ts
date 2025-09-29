import { gql } from 'graphql-request';

export const QUERY_GET_ALL_GENERAL_ACADEMIC_AREA = gql`
  query GetAllGeneralAcademicArea {
    data: getAllGeneralAcademicArea(orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          name
          hasStandard
          hasDba
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_GENERAL_ACADEMIC_CYCLE = gql`
  query GetAllGeneralAcademicCycle {
    data: getAllGeneralAcademicCycle(orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          name
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_GENERAL_PERFORMANCE_LEVEL = gql`
  query getAllGeneralPerformanceLevel {
    data: getAllGeneralPerformanceLevel(orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          name
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_GENERAL_ACADEMIC_ASIGNATURE = gql`
  query GetAllGeneralAcademicAsignature {
    data: getAllGeneralAcademicAsignature(
      orderCreated: true
      allData: true
      generalAcademicAreaId: null
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          name
          generalAcademicAreaId
          hasStandard
          hasDba
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_GENERAL_ACADEMIC_GRADE = gql`
  query GetAllGeneralAcademicGrade {
    data: getAllGeneralAcademicGrade(orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          name
          generalAcademicCycleId
          nextGeneralAcademicGradeId
          previousGeneralAcademicGradeId
          generalAcademicCycle {
            id
            active
            version
            createdAt
            updatedAt
            name
          }
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_GENERAL_ACADEMIC_STANDARD = gql`
  query GetAllGeneralAcademicStandard($generalAcademicCycleId: String, $generalAcademicAsignatureId: String) {
    data: getAllGeneralAcademicStandard(
      orderCreated: true
      allData: true
      generalAcademicCycleId: $generalAcademicCycleId
      generalAcademicAsignatureId: $generalAcademicAsignatureId
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          standard
          type
          subtype
          generalAcademicAsignatureId
          generalAcademicCycleId
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_GENERAL_BASIC_LEARNING_RIGHT = gql`
  query GetAllGeneralBasicLearningRight($generalAcademicGradeId: String, $generalAcademicAsignatureId: String) {
    data: getAllGeneralBasicLearningRight(
      orderCreated: true
      allData: true
      generalAcademicGradeId: $generalAcademicGradeId
      generalAcademicAsignatureId: $generalAcademicAsignatureId
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          dba
          category
          generalAcademicAsignatureId
          generalAcademicGradeId
        }
      }
    }
  }
`;
//-------------------

//-------------------
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
//-------------------

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

export const QUERY_GET_ALL_GENDER = gql`
  query getAllGender {
    data: getAllGender(orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          code
          name
          description
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_DOCUMENT_TYPE = gql`
  query getAllDocumentType {
    data: getAllDocumentType(orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          code
          name
          description
        }
      }
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

export const QUERY_GET_ALL_MUNICIPALITY = gql`
  query GetAllMunicipality {
    data: getAllMunicipality(orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          name
        }
      }
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

export const QUERY_GET_ALL_OBSERVER_ANNOTATION_TYPE = gql`
  query GetAllObserverAnnotationType($schoolId: String!) {
    data: getAllObserverAnnotationType(schoolId: $schoolId, orderCreated: true, allData: true) {
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
          code
          name
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_VIDEO_TUTORIAL = gql`
  query GetAllVideoTutorial {
    data: getAllVideoTutorial(orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          name
          description
          image
          miniumResolutionFileUrl
          mediumResolutionFileUrl
          maxResolutionFileUrl
          order
          rolesId
        }
      }
    }
  }
`;

//-------------------
export const QUERY_GET_ALL_STUDENT_IDS = gql`
  query GetAllStudent($schoolId: String!, $schoolYearId: String!) {
    data: getAllStudent(
      orderCreated: true
      allData: true
      schoolYearId: $schoolYearId
      campusId: null
      schoolId: $schoolId
    ) {
      totalCount
      edges {
        cursor
        node {
          id
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_AREA_IDS = gql`
  query GetAllAcademicArea($schoolId: String!, $schoolYearId: String!) {
    data: getAllAcademicArea(
      schoolId: $schoolId
      orderCreated: true
      allData: true
      schoolYearId: $schoolYearId
    ) {
      totalCount
      edges {
        node {
          id
        }
      }
    }
  }
`;
//-------------------

export const QUERY_GET_ALL_MODALITY = gql`
  query getAllModalitySyncOffline($schoolId: String!, $schoolYearId: String) {
    data: getAllModalitySyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
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
          code
          name
          schoolYearId
          entityBaseId
        }
      }
    }
  }
`;

export const QUERY_GET_MODALITY = gql`
  query getModality($id: String!) {
    data: getModality(id: $id) {
      id
      schoolId
      active
      version
      createdAt
      updatedAt
      createdByUserId
      updatedByUserId
      code
      name
      schoolYearId
      entityBaseId
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

export const QUERY_GET_ALL_SPECIALTY = gql`
  query getAllSpecialtySyncOffline($schoolId: String!, $schoolYearId: String) {
    data: getAllSpecialtySyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
      edges {
        cursor
        node {
          id
          schoolId
          active
          version
          createdAt
          updatedByUserId
          code
          name
          modalityId
          schoolYearId
          entityBaseId
        }
      }
    }
  }
`;

export const QUERY_GET_SPECIALTY = gql`
  query getSpecialty($id: String!) {
    data: getSpecialty(id: $id) {
      id
      schoolId
      active
      version
      createdAt
      updatedAt
      createdByUserId
      updatedByUserId
      code
      name
      modalityId
      schoolYearId
      entityBaseId
    }
  }
`;

export const QUERY_GET_INBOX = gql`
  query getInbox($id: String!) {
    data: getInbox(id: $id) {
      id
      active
      version
      createdAt
      updatedAt
      createdByUserId
      updatedByUserId
      userId
      fromId
      title
      message
      dateSend
      dateRead
      user {
        id
        active
        version
        createdAt
        updatedAt
        createdByUserId
        updatedByUserId
        name
        lastName
        username
        genderId
        documentTypeId
        documentNumber
        birthdate
        phone
        email
        password
        profilePhoto
        signaturePhoto
        roleId
        schoolId
      }
      from {
        id
        active
        version
        createdAt
        updatedAt
        createdByUserId
        updatedByUserId
        name
        lastName
        username
        genderId
        documentTypeId
        documentNumber
        birthdate
        phone
        email
        password
        profilePhoto
        signaturePhoto
        roleId
        schoolId
      }
    }
  }
`;

export const QUERY_GET_ALL_INBOX = gql`
  query getAllInbox($userId: String!, $orderCreated: Boolean!, $allData: Boolean!) {
    data: getAllInbox(userId: $userId, orderCreated: $orderCreated, allData: $allData) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          userId
          fromId
          title
          message
          dateSend
          dateRead
          user {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
          from {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_INBOX_FOR_SYNC = gql`
  query getAllInboxForSync($userId: String!) {
    data: getAllInbox(userId: $userId, orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          userId
          fromId
          title
          message
          dateSend
          dateRead
          user {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
          from {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
        }
      }
    }
  }
`;

export const QUERY_GET_TOTAL_COUNT_INBOX = gql`
  query getAllInboxTotalCount($userId: String!) {
    data: getAllInbox(userId: $userId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_NOTIFICATION = gql`
  query getNotification($id: String!) {
    data: getNotification(id: $id) {
      id
      active
      version
      createdAt
      updatedAt
      createdByUserId
      updatedByUserId
      userId
      title
      message
      dateSend
      dateRead
      user {
        id
        active
        version
        createdAt
        updatedAt
        createdByUserId
        updatedByUserId
        name
        lastName
        username
        genderId
        documentTypeId
        documentNumber
        birthdate
        phone
        email
        password
        profilePhoto
        signaturePhoto
        roleId
        schoolId
      }
    }
  }
`;

export const QUERY_GET_ALL_NOTIFICATION = gql`
  query getAllNotification($userId: String, $orderCreated: Boolean!, $allData: Boolean!) {
    data: getAllNotification(userId: $userId, orderCreated: $orderCreated, allData: $allData) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          userId
          title
          message
          dateSend
          dateRead
          user {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
        }
      }
    }
  }
`;

export const QUERY_GET_ALL_NOTIFICATION_FOR_SYNC = gql`
  query getAllNotificationForSync($userId: String!) {
    data: getAllNotification(userId: $userId, orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          userId
          title
          message
          dateSend
          dateRead
          user {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
        }
      }
    }
  }
`;

export const QUERY_GET_TOTAL_COUNT_NOTIFICATION = gql`
  query getAllNotificationTotalCount($userId: String!) {
    data: getAllNotification(userId: $userId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_CAMPUS = gql`
  query getCampus($id: String!) {
    data: getCampus(id: $id) {
      id
      active
      version
      createdAt
      updatedAt
      createdByUserId
      updatedByUserId
      name
      daneCodeCampus
      consecutive
      schoolId
    }
  }
`;

export const QUERY_GET_ALL_CAMPUS = gql`
  query getAllCampus($schoolId: String!) {
    data: getAllCampus(schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                name
                daneCodeCampus
                consecutive
                schoolId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_CAMPUS = gql`
  query getAllCampusTotalCount($schoolId: String!) {
    data: getAllCampus(schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }  
  }
`;

export const QUERY_GET_ALL_EDUCATION_LEVEL = gql`
  query getAllEducationLevel($schoolYearId: String, $schoolId: String!) {
    data: getAllEducationLevel(schoolYearId: $schoolYearId, schoolId: $schoolId, orderCreated: true, allData: true) {
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
                name
                description
                schoolYearId
                entityBaseId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                schoolYear {
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
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_EDUCATION_LEVEL = gql`
  query getAllEducationLevelTotalCount($schoolYearId: String, $schoolId: String!) {
    data: getAllEducationLevel(schoolYearId: $schoolYearId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_GRADE = gql`
  query getAllAcademicGrade($schoolYearId: String, $schoolId: String!) {
    data: getAllAcademicGrade (schoolYearId: $schoolYearId, schoolId: $schoolId, orderCreated: true, allData: true) {
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
                name
                educationLevelId
                specialtyId
                generalAcademicCycleId
                generalAcademicGradeId
                countStudent
                schoolYearId
                entityBaseId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                educationLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    description
                    schoolYearId
                    entityBaseId
                }
                specialty {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    code
                    name
                    modalityId
                    schoolYearId
                    entityBaseId
                }
                generalAcademicCycle {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                }
                generalAcademicGrade {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    generalAcademicCycleId
                    nextGeneralAcademicGradeId
                    previousGeneralAcademicGradeId
                }
                schoolYear {
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
        }
    }  
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_GRADE = gql`
  query getAllAcademicGradeTotalCount($schoolYearId: String, $schoolId: String!) {
    data: getAllAcademicGrade (schoolYearId: $schoolYearId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_COURSE = gql`
  query getAllCourse ($academicGradeId: String, $schoolId: String, $campusId: String!) {
    data: getAllCourse (academicGradeId: $academicGradeId, schoolId: $schoolId, campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                academicGradeId
                academicDayId
                name
                order
                studentsId
                teacherId
                jornadaSIMAT
                gradoCodSIMAT
                grupoSIMAT
                countStudent
                schoolYearId
                entityBaseId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicGrade {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    educationLevelId
                    specialtyId
                    generalAcademicCycleId
                    generalAcademicGradeId
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                academicDay {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    nameSIMAT
                    day
                    schoolYearId
                    entityBaseId
                }
                teacher {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    userId
                    academicAsignatureId
                    attentionSchedule
                    schoolYearId
                    entityBaseId
                }
                schoolYear {
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
                students {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }  
  }
`;

export const QUERT_GET_TOTAL_COUNT_COURSE = gql`
  query getAllCourseTotalCount($academicGradeId: String, $schoolId: String, $campusId: String!) {
    data: getAllCourse (academicGradeId: $academicGradeId, schoolId: $schoolId, campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ACADEMIC_DAY = gql`
  query getAcademicDay($id: String!) {
    data: getAcademicDay(id: $id) {
      id
      campusId
      schoolId
      active
      version
      createdAt
      updatedAt
      createdByUserId
      updatedByUserId
      name
      nameSIMAT
      day
      schoolYearId
      entityBaseId
      campus {
        id
        active
        version
        createdAt
        updatedAt
        createdByUserId
        updatedByUserId
        name
        daneCodeCampus
        consecutive
        schoolId
      }
      school {
        id
        active
        version
        createdAt
        updatedAt
        createdByUserId
        updatedByUserId
        name
        daneCode
        pedagogicalModel
        educationalModel
        curricularComponent
        textResolution
        textAddress
        textDaneNit
        logo
        textPrincipalSignature
        textSecretarySignature
        imgPrincipalSignature
        imgSecretarySignature
      }
      schoolYear {
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
  }
`;

export const QUERY_GET_ALL_ACADEMIC_DAY = gql`
  query getAllAcademicDay($campusId: String!, $schoolId: String, $schoolYearId: String, $orderCreated: Boolean!, $allData: Boolean!) {
    data: getAllAcademicDay(
      campusId: $campusId
      schoolId: $schoolId
      schoolYearId: $schoolYearId
      orderCreated: $orderCreated
      allData: $allData
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          campusId
          schoolId
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          name
          nameSIMAT
          day
          schoolYearId
          entityBaseId
          campus {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCodeCampus
            consecutive
            schoolId
          }
          school {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCode
            pedagogicalModel
            educationalModel
            curricularComponent
            textResolution
            textAddress
            textDaneNit
            logo
            textPrincipalSignature
            textSecretarySignature
            imgPrincipalSignature
            imgSecretarySignature
          }
          schoolYear {
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
      }
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_DAY_FOR_SYNC = gql`
  query getAllAcademicDayForSync($campusId: String!, $schoolId: String, $schoolYearId: String) {
    data: getAllAcademicDay(
      campusId: $campusId
      schoolId: $schoolId
      schoolYearId: $schoolYearId
      orderCreated: true
      allData: true
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          campusId
          schoolId
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          name
          nameSIMAT
          day
          schoolYearId
          entityBaseId
          campus {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCodeCampus
            consecutive
            schoolId
          }
          school {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCode
            pedagogicalModel
            educationalModel
            curricularComponent
            textResolution
            textAddress
            textDaneNit
            logo
            textPrincipalSignature
            textSecretarySignature
            imgPrincipalSignature
            imgSecretarySignature
          }
          schoolYear {
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
      }
    }
  }
`;

export const QUERY_GET_TOTAL_COUNT_ACADEMIC_DAY = gql`
  query getAllAcademicDayTotalCount($campusId: String!, $schoolId: String, $schoolYearId: String) {
    data: getAllAcademicDay(
      campusId: $campusId
      schoolId: $schoolId
      schoolYearId: $schoolYearId
      orderCreated: true
      allData: true
    ) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_AREA = gql`
  query getAllAcademicArea($schoolYearId: String, $schoolId: String!) {
    data: getAllAcademicArea (schoolYearId: $schoolYearId, schoolId: $schoolId, orderCreated: true, allData: true) {
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
                name
                abbreviation
                generalAcademicAreaId
                academicGradeId
                order
                isAverage
                schoolYearId
                entityBaseId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                generalAcademicArea {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    hasStandard
                    hasDba
                }
                academicGrade {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    educationLevelId
                    specialtyId
                    generalAcademicCycleId
                    generalAcademicGradeId
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                schoolYear {
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
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA = gql`
  query getAllAcademicAreaTotalCount($schoolYearId: String, $schoolId: String!) {
    data: getAllAcademicArea (schoolYearId: $schoolYearId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_PERIOD = gql`
  query getAllAcademicPeriod($schoolYearId: String, $orderCustom: Boolean, $schoolId: String!) {
    data: getAllAcademicPeriod (schoolYearId: $schoolYearId, orderCustom: $orderCustom, schoolId: $schoolId, orderCreated: true, allData: true) {
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
                name
                schoolYearId
                startDate
                endDate
                startDateRecovery
                endDateRecovery
                weight
                order
                entityBaseId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                schoolYear {
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
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_PERIOD = gql`
  query getAllAcademicPeriodTotalCount ($schoolYearId: String, $orderCustom: Boolean, $schoolId: String!) {
    data: getAllAcademicPeriod (schoolYearId: $schoolYearId, orderCustom: $orderCustom, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_STUDENT = gql`
  query getStudent($id: String!) {
    data: getStudent(id: $id) {
      id
      active
      version
      createdAt
      updatedAt
      createdByUserId
      updatedByUserId
      schoolId
      campusId
      userId
      guardianId
      academicGradeId
      courseId
      schoolYearId
      entityBaseId
      user {
        id
        active
        version
        createdAt
        updatedAt
        createdByUserId
        updatedByUserId
        name
        lastName
        username
        genderId
        documentTypeId
        documentNumber
        birthdate
        phone
        email
        password
        profilePhoto
        signaturePhoto
        roleId
        schoolId
      }
    }
  }
`;

/* export const QUERY_GET_ALL_STUDENT = gql`
  query getAllStudentSyncOffline($schoolId: String!, $schoolYearId: String) {
    data: getAllStudentSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          schoolId
          campusId
          userId
          academicGradeId
          courseId
          schoolYearId
          entityBaseId
          user {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
        }
      }
    }
  }
`; */

/* export const QUERT_GET_TOTAL_COUNT_STUDENT = gql`
  query getAllStudentTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllStudentSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
    }
  }
`; */

export const QUERY_GET_ALL_STUDENT = gql`
  query getAllStudent($schoolYearId: String, $campusId: String, $schoolId: String) {
    data: getAllStudent(schoolYearId: $schoolYearId, campusId: $campusId, schoolId: $schoolId, orderCreated: true, allData: true){
      totalCount
      edges {
            cursor
            node {
                id
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                schoolId
                campusId
                academicGradeId
                courseId
                userId
                code
                schoolYearId
                entityBaseId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                academicGrade {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    educationLevelId
                    specialtyId
                    generalAcademicCycleId
                    generalAcademicGradeId
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                course {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    academicGradeId
                    academicDayId
                    name
                    order
                    studentsId
                    teacherId
                    jornadaSIMAT
                    gradoCodSIMAT
                    grupoSIMAT
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                user {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    lastName
                    username
                    genderId
                    documentTypeId
                    documentNumber
                    birthdate
                    phone
                    email
                    password
                    profilePhoto
                    signaturePhoto
                    roleId
                    schoolId
                }
                schoolYear {
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
        }
    }  
  }
`;

export const QUERT_GET_TOTAL_COUNT_STUDENT = gql`
  query getAllStudentTotalCount($schoolYearId: String, $campusId: String, $schoolId: String){
    data: getAllStudent(schoolYearId: $schoolYearId, campusId: $campusId, schoolId: $schoolId, orderCreated: true, allData: true){
      totalCount
    }
  }
`;


export const QUERY_GET_ALL_PERFORMANCE_LEVEL = gql`
  query getAllPerformanceLevel($schoolYearId: String, $schoolId: String!) {
    data: getAllPerformanceLevel (schoolYearId: $schoolYearId, schoolId: $schoolId, orderCreated: true, allData: true) {
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
                name
                minimumScore
                topScore
                abbreviation
                colorHex
                isFinal
                isRecovery
                type
                category
                categoryGrade
                generalPerformanceLevelId
                campusId
                academicGradesId
                order
                schoolYearId
                entityBaseId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                generalPerformanceLevel {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                }
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                academicGrades {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    educationLevelId
                    specialtyId
                    generalAcademicCycleId
                    generalAcademicGradeId
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                schoolYear {
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
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_PERFORMANCE_LEVEL = gql`
  query getAllPerformanceLevelTotalCount($schoolYearId: String, $schoolId: String!) {
    data: getAllPerformanceLevel (schoolYearId: $schoolYearId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_HOUR = gql`
  query getAllAcademicHour($academicDayId: String!) {
    data: getAllAcademicHour(
      orderCreated: true
      allData: true
      academicDayId: $academicDayId
    ) {
      totalCount
      edges {
        cursor
        node {
          id
          campusId
          schoolId
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          academicDayId
          startTime
          endTime
          order
          schoolYearId
          entityBaseId
          campus {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCodeCampus
            consecutive
            schoolId
          }
          school {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCode
            pedagogicalModel
            educationalModel
            curricularComponent
            textResolution
            textAddress
            textDaneNit
            logo
            textPrincipalSignature
            textSecretarySignature
            imgPrincipalSignature
            imgSecretarySignature
          }
          academicDay {
            id
            campusId
            schoolId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            nameSIMAT
            day
            schoolYearId
            entityBaseId
          }
          schoolYear {
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
      }
    }
  }
`;

export const QUERY_GET_ALL_CAMPUS_ADMINISTRATOR = gql`
  query getAllCampusAdministrator($schoolId: String!) {
    data: getAllCampusAdministrator(schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          campusId
          schoolId
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          userId
          campus {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCodeCampus
            consecutive
            schoolId
          }
          school {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCode
            pedagogicalModel
            educationalModel
            curricularComponent
            textResolution
            textAddress
            textDaneNit
            logo
            textPrincipalSignature
            textSecretarySignature
            imgPrincipalSignature
            imgSecretarySignature
          }
          user {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
        }
      }
    }
  }
`;

export const QUERY_GET_TOTAL_COUNT_CAMPUS_ADMINISTRATOR = gql`
  query getAllCampusAdministratorTotalCount($schoolId: String!) {
    data: getAllCampusAdministrator(schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_CAMPUS_COORDINATOR = gql`
  query getAllCampusCoordinator($schoolId: String!) {
    data: getAllCampusCoordinator(schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
      edges {
        cursor
        node {
          id
          campusId
          schoolId
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          userId
          campus {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCodeCampus
            consecutive
            schoolId
          }
          school {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCode
            pedagogicalModel
            educationalModel
            curricularComponent
            textResolution
            textAddress
            textDaneNit
            logo
            textPrincipalSignature
            textSecretarySignature
            imgPrincipalSignature
            imgSecretarySignature
          }
          user {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
        }
      }
    }
  }
`;

export const QUERY_GET_TOTAL_COUNT_CAMPUS_COORDINATOR = gql`
  query getAllCampusCoordinatorTotalCount($schoolId: String!) {
    data: getAllCampusCoordinator(schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_SCHOOL_ADMINISTRATIVE = gql`
  query getAllSchoolAdministrative($schoolId: String!) {
    data: getAllSchoolAdministrative(schoolId: $schoolId, orderCreated: true, allData: true) {
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
          userId
          school {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCode
            pedagogicalModel
            educationalModel
            curricularComponent
            textResolution
            textAddress
            textDaneNit
            logo
            textPrincipalSignature
            textSecretarySignature
            imgPrincipalSignature
            imgSecretarySignature
          }
          user {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
        }
      }
    }
  }
`;

export const QUERY_GET_TOTAL_COUNT_SCHOOL_ADMINISTRATIVE = gql`
  query getAllSchoolAdministrativeTotalCount($schoolId: String!) {
    data: getAllSchoolAdministrative(schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_SCHOOL_ADMINISTRATOR = gql`
  query getAllSchoolAdministrator($schoolId: String!) {
    data: getAllSchoolAdministrator(schoolId: $schoolId, orderCreated: true, allData: true) {
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
          userId
          school {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCode
            pedagogicalModel
            educationalModel
            curricularComponent
            textResolution
            textAddress
            textDaneNit
            logo
            textPrincipalSignature
            textSecretarySignature
            imgPrincipalSignature
            imgSecretarySignature
          }
          user {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
        }
      }
    }
  }
`;

export const QUERY_GET_TOTAL_COUNT_SCHOOL_ADMINISTRATOR = gql`
  query getAllSchoolAdministratorTotalCount($schoolId: String!) {
    data: getAllSchoolAdministrator(schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_SCHOOL_CONFIGURATION = gql`
  query getAllSchoolConfiguration($schoolId: String!) {
    data: getAllSchoolConfiguration(schoolId: $schoolId, orderCreated: true, allData: true) {
      edges {
        node {
          active
          code
          createdAt
          createdByUserId
          entityBaseId
          id
          schoolId
          schoolYearId
          updatedAt
          updatedByUserId
          valueNumber
          valueString
          version
        }
        cursor
      }
      totalCount
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_SCHOOL_CONFIGURATION = gql`
  query getAllSchoolConfigurationTotalCount($schoolId: String!) {
    data: getAllSchoolConfigurationSyncOffline(schoolId: $schoolId) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_ASIGNATURE = gql`
  query getAllAcademicAsignature($schoolYearId: String, $academicAreaId: String, $schoolId: String!) {
    data: getAllAcademicAsignature (schoolYearId: $schoolYearId, academicAreaId: $academicAreaId, schoolId: $schoolId, orderCreated: true, allData: true) {
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
                name
                abbreviation
                code
                minWeight
                maxWeight
                academicAreaId
                academicGradeId
                generalAcademicAsignatureId
                order
                schoolYearId
                entityBaseId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicArea {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    generalAcademicAreaId
                    academicGradeId
                    order
                    isAverage
                    schoolYearId
                    entityBaseId
                }
                academicGrade {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    educationLevelId
                    specialtyId
                    generalAcademicCycleId
                    generalAcademicGradeId
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                generalAcademicAsignature {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    generalAcademicAreaId
                    hasStandard
                    hasDba
                }
                schoolYear {
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
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE = gql`
  query getTotalCountAcademicAsignature($schoolYearId: String, $academicAreaId: String, $schoolId: String!) {
    data: getAllAcademicAsignature(schoolYearId: $schoolYearId, academicAreaId: $academicAreaId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_AVERAGE_ACADEMIC_PERIOD_STUDENT = gql`
  query getAllAverageAcademicPeriodStudent ($courseId: String, $academicPeriodId: String, $orderCreated: Boolean!, $allData: Boolean!) {
    data: getAllAverageAcademicPeriodStudent (courseId: $courseId, academicPeriodId: $academicPeriodId, orderCreated: $orderCreated, allData: $allData) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                academicPeriodId
                courseId
                studentId
                assessment
                performanceLevelId
                score
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicPeriod {
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
                course {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    academicGradeId
                    academicDayId
                    name
                    order
                    studentsId
                    teacherId
                    jornadaSIMAT
                    gradoCodSIMAT
                    grupoSIMAT
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_PERIOD_STUDENT = gql`
  query getAllAverageAcademicPeriodStudentTotalCount($courseId: String, $academicPeriodId: String, $orderCreated: Boolean!, $allData: Boolean!) {
    data: getAllAverageAcademicPeriodStudent (courseId: $courseId, academicPeriodId: $academicPeriodId, orderCreated: $orderCreated, allData: $allData) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_AVERAGE_ACADEMIC_YEAR_COURSE = gql`
  query getAllAverageAcademicYearCourse($schoolYearId: String, $campusId: String, $orderCreated: Boolean!, $allData: Boolean!) {
    data: getAllAverageAcademicYearCourse(schoolYearId: $schoolYearId, campusId: $campusId, orderCreated: $orderCreated, allData: $allData) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                schoolYearId
                courseId
                assessment
                performanceLevelId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                schoolYear {
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
                course {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    academicGradeId
                    academicDayId
                    name
                    order
                    studentsId
                    teacherId
                    jornadaSIMAT
                    gradoCodSIMAT
                    grupoSIMAT
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }  
  }
`;

export const QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_YEAR_COURSE = gql`
  query getAllAverageAcademicYearCourseTotalCount($schoolYearId: String, $campusId: String, $orderCreated: Boolean!, $allData: Boolean!) {
    data: getAllAverageAcademicYearCourse(schoolYearId: $schoolYearId, campusId: $campusId, orderCreated: $orderCreated, allData: $allData) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_AVERAGE_ACADEMIC_YEAR_STUDENT = gql`
  query getAllAverageAcademicYearStudent($courseId: String, $schoolYearId: String, $orderCreated: Boolean!, $allData: Boolean!) {
    data: getAllAverageAcademicYearStudent(courseId: $courseId, schoolYearId: $schoolYearId, orderCreated: $orderCreated, allData: $allData) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                schoolYearId
                courseId
                studentId
                assessment
                performanceLevelId
                score
                promoted
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                schoolYear {
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
                course {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    academicGradeId
                    academicDayId
                    name
                    order
                    studentsId
                    teacherId
                    jornadaSIMAT
                    gradoCodSIMAT
                    grupoSIMAT
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_AVERAGE_ACADEMIC_YEAR_STUDENT = gql`
  query getAllAverageAcademicYearStudentTotalCount($courseId: String, $schoolYearId: String) {
    data: getAllAverageAcademicYearStudent(courseId: $courseId, schoolYearId: $schoolYearId, orderCreated: $orderCreated, allData: $allData) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_STUDENT_BEHAVIOUR = gql`
  query getAllStudentBehaviour($studentId: String, $academicPeriodId: String!, $courseId: String!) {
    data: getAllStudentBehaviour(studentId: $studentId, academicPeriodId: $academicPeriodId, courseId: $courseId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                courseId
                academicPeriodId
                studentId
                assessment
                performanceLevelId
                observation
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                course {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    academicGradeId
                    academicDayId
                    name
                    order
                    studentsId
                    teacherId
                    jornadaSIMAT
                    gradoCodSIMAT
                    grupoSIMAT
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                academicPeriod {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_STUDENT_BEHAVIOUR = gql`
  query getAllStudentBehaviourTotalCount($studentId: String, $academicPeriodId: String!, $courseId: String!) {
    data: getAllStudentBehaviour(studentId: $studentId, academicPeriodId: $academicPeriodId, courseId: $courseId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_STUDENT_YEAR_BEHAVIOUR = gql`
  query getAllStudentYearBehaviour($studentId: String, $schoolYearId: String!, $courseId: String!) {
    data: getAllStudentYearBehaviour(studentId: $studentId, schoolYearId: $schoolYearId, courseId: $courseId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                courseId
                schoolYearId
                studentId
                assessment
                performanceLevelId
                observation
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                course {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    academicGradeId
                    academicDayId
                    name
                    order
                    studentsId
                    teacherId
                    jornadaSIMAT
                    gradoCodSIMAT
                    grupoSIMAT
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                schoolYear {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_STUDENT_YEAR_BEHAVIOUR = gql`
  query getAllStudentYearBehaviourTotalCount($studentId: String, $schoolYearId: String!, $courseId: String!) {
    data: getAllStudentYearBehaviour(studentId: $studentId, schoolYearId: $schoolYearId, courseId: $courseId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_STUDENT_OBSERVER_ANNOTATION = gql`
  query getAllStudentObserverAnnotation($courseId: String, $studentId: String!) {
    data: getAllStudentObserverAnnotation(courseId: $courseId, studentId: $studentId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                courseId
                academicPeriodId
                studentId
                observerAnnotationTypeId
                observation
                commitment
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                course {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    academicGradeId
                    academicDayId
                    name
                    order
                    studentsId
                    teacherId
                    jornadaSIMAT
                    gradoCodSIMAT
                    grupoSIMAT
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                academicPeriod {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                observerAnnotationType {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    code
                    name
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_STUDENT_OBSERVER_ANNOTATION = gql`
  query getAllStudentObserverAnnotationTotalCount($courseId: String, $studentId: String!) {
    data: getAllStudentObserverAnnotation(courseId: $courseId, studentId: $studentId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_AREA_COURSE_PERIOD_VALUATION = gql`
  query getAllAcademicAreaCoursePeriodValuation($studentId: String, $academicPeriodId: String!, $academicAreaId: String!) {
    data: getAllAcademicAreaCoursePeriodValuation(studentId: $studentId, academicPeriodId: $academicPeriodId, academicAreaId: $academicAreaId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                academicAreaId
                academicPeriodId
                studentId
                assessment
                performanceLevelId
                valuationType
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicArea {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    generalAcademicAreaId
                    academicGradeId
                    order
                    isAverage
                    schoolYearId
                    entityBaseId
                }
                academicPeriod {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
                academicAsignatureCourse {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    generalAcademicAreaId
                    academicGradeId
                    order
                    isAverage
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_PERIOD_VALUATION = gql`
  query getAllAcademicAreaCoursePeriodValuationTotalCount($studentId: String, $academicPeriodId: String!, $academicAreaId: String!){
    data: getAllAcademicAreaCoursePeriodValuation(studentId: $studentId, academicPeriodId: $academicPeriodId, academicAreaId: $academicAreaId, orderCreated: true, allData: true){
      totalCount
    }
  }
`;

/* export const QUERY_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_PERIOD_VALUATION = gql`
  query getAllAcademicAreaCoursePeriodValuationTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllAcademicAreaCoursePeriodValuation(orderCreated: true, allData: true, academicPeriodId: null, academicAreaId: null, studentId: null) {
      totalCount
    }
  }
`; */

export const QUERY_GET_ALL_ACADEMIC_AREA_COURSE_YEAR_VALUATION = gql`
  query getAllAcademicAreaCourseYearValuation($studentId: String, $schoolYearId: String!, $academicAreaId: String!) {
    data: getAllAcademicAreaCourseYearValuation(studentId: $studentId, schoolYearId: $schoolYearId, academicAreaId: $academicAreaId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                academicAreaId
                schoolYearId
                studentId
                assessment
                performanceLevelId
                valuationType
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicArea {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    generalAcademicAreaId
                    academicGradeId
                    order
                    isAverage
                    schoolYearId
                    entityBaseId
                }
                schoolYear {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
                academicAsignatureCourse {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    generalAcademicAreaId
                    academicGradeId
                    order
                    isAverage
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_YEAR_VALUATION = gql`
  query getAllAcademicAreaCourseYearValuationTotalCount($studentId: String, $schoolYearId: String!, $academicAreaId: String!) {
    data: getAllAcademicAreaCourseYearValuation(studentId: $studentId, schoolYearId: $schoolYearId, academicAreaId: $academicAreaId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

/* export const QUERY_GET_TOTAL_COUNT_ACADEMIC_AREA_COURSE_YEAR_VALUATION = gql`
  query getAllAcademicAreaCourseYearValuationTotalCount($schoolId: String!, $schoolYearId: String!) {
    data: getAllAcademicAreaCourseYearValuation(orderCreated: true, allData: true, schoolYearId: null, academicAreaId: null, studentId: null) {
      totalCount
    }
  }
`; */

export const QUERY_GET_ALL_GRADE_ASSIGNMENT = gql`
  query getAllGradeAssignment($academicGradeId: String, $academicAsignatureId: String, $schoolId: String!) {
    data: getAllGradeAssignment(academicGradeId: $academicGradeId, academicAsignatureId: $academicAsignatureId, schoolId: $schoolId, orderCreated: true, allData: true) {
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
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicGrade {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    educationLevelId
                    specialtyId
                    generalAcademicCycleId
                    generalAcademicGradeId
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                academicAsignature {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    code
                    minWeight
                    maxWeight
                    academicAreaId
                    academicGradeId
                    generalAcademicAsignatureId
                    order
                    schoolYearId
                    entityBaseId
                }
                schoolYear {
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
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_GRADE_ASSIGNMENT = gql`
  query getAllGradeAssignmentTotalCount($academicGradeId: String, $academicAsignatureId: String, $schoolId: String!) {
    data: getAllGradeAssignment(academicGradeId: $academicGradeId, academicAsignatureId: $academicAsignatureId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_TEACHER = gql`
  query getTeacher($id: String!) {
    data: getTeacher(id: $id) {
      id
      active
      version
      createdAt
      updatedAt
      createdByUserId
      updatedByUserId
      schoolId
      campusId
      userId
      academicAsignatureId
      attentionSchedule
      schoolYearId
      entityBaseId
      user {
        id
        active
        version
        createdAt
        updatedAt
        createdByUserId
        updatedByUserId
        name
        lastName
        username
        genderId
        documentTypeId
        documentNumber
        birthdate
        phone
        email
        password
        profilePhoto
        signaturePhoto
        roleId
        schoolId
      }
    }
  }
`;

/* export const QUERY_GET_ALL_TEACHER = gql`
  query getAllTeacherSyncOffline($schoolId: String!, $schoolYearId: String) {
    data: getAllTeacherSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
      totalCount
      edges {
        cursor
        node {
          id
          active
          version
          createdAt
          updatedAt
          createdByUserId
          updatedByUserId
          schoolId
          campusId
          userId
          academicAsignatureId
          attentionSchedule
          schoolYearId
          entityBaseId
          user {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            lastName
            username
            genderId
            documentTypeId
            documentNumber
            birthdate
            phone
            email
            password
            profilePhoto
            signaturePhoto
            roleId
            schoolId
          }
        }
      }
    }
  }
`; */

export const QUERY_GET_ALL_TEACHER = gql`
  query getAllTeacher($schoolYearId: String, $campusId: [String!], $schoolId: [String!]!){
    data: getAllTeacher(schoolYearId: $schoolYearId, campusId: $campusId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount  
      edges {
            cursor
            node {
                id
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                schoolId
                campusId
                userId
                academicAsignatureId
                attentionSchedule
                schoolYearId
                entityBaseId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                user {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    lastName
                    username
                    genderId
                    documentTypeId
                    documentNumber
                    birthdate
                    phone
                    email
                    password
                    profilePhoto
                    signaturePhoto
                    roleId
                    schoolId
                }
                academicAsignature {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    code
                    minWeight
                    maxWeight
                    academicAreaId
                    academicGradeId
                    generalAcademicAsignatureId
                    order
                    schoolYearId
                    entityBaseId
                }
                schoolYear {
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
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_TEACHER = gql`
  query getAllTeacherTotalCount($schoolYearId: String, $campusId: [String!], $schoolId: [String!]!) {
    data: getAllTeacher(schoolYearId: $schoolYearId, campusId: $campusId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE = gql`
  query getAllAcademicAsignatureCourse($courseId: String, $campusId: String) {
    data: getAllAcademicAsignatureCourse(courseId: $courseId, campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                hourlyIntensity
                academicAsignatureId
                courseId
                weight
                teacherId
                gradeAssignmentId
                schoolYearId
                entityBaseId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicAsignature {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    code
                    minWeight
                    maxWeight
                    academicAreaId
                    academicGradeId
                    generalAcademicAsignatureId
                    order
                    schoolYearId
                    entityBaseId
                }
                course {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    academicGradeId
                    academicDayId
                    name
                    order
                    studentsId
                    teacherId
                    jornadaSIMAT
                    gradoCodSIMAT
                    grupoSIMAT
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                teacher {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    userId
                    academicAsignatureId
                    attentionSchedule
                    schoolYearId
                    entityBaseId
                }
                gradeAssignment {
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
                }
                schoolYear {
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
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE_COURSE = gql`
  query getAllAcademicAsignatureCourseTotalCount($courseId: String, $campusId: String) {
    data: getAllAcademicAsignatureCourse(courseId: $courseId, campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_STANDARD = gql`
  query getAllAcademicStandard($academicGradeId: String!, $academicAsignatureId: String!, $schoolId: String!) {
    data: getAllAcademicStandard(academicGradeId: $academicGradeId, academicAsignatureId: $academicAsignatureId, schoolId: $schoolId, orderCreated: true, allData: true) {
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
                standard
                generalAcademicStandardId
                academicAsignatureId
                academicGradeId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                generalAcademicStandard {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    standard
                    type
                    subtype
                    generalAcademicAsignatureId
                    generalAcademicCycleId
                }
                academicAsignature {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    code
                    minWeight
                    maxWeight
                    academicAreaId
                    academicGradeId
                    generalAcademicAsignatureId
                    order
                    schoolYearId
                    entityBaseId
                }
                academicGrade {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    educationLevelId
                    specialtyId
                    generalAcademicCycleId
                    generalAcademicGradeId
                    countStudent
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_STANDARD = gql`
  query getAllAcademicStandardTotalCount($academicGradeId: String!, $academicAsignatureId: String!, $schoolId: String!) {
    data: getAllAcademicStandard(academicGradeId: $academicGradeId, academicAsignatureId: $academicAsignatureId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_QUESTION_BANK_TEST_ONLINE = gql`
  query getAllQuestionBankTestOnline($campusId: String!) {
    data: getAllQuestionBankTestOnline(campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                academicAsignatureId
                academicGradeId
                teacherId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicAsignature {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    code
                    minWeight
                    maxWeight
                    academicAreaId
                    academicGradeId
                    generalAcademicAsignatureId
                    order
                    schoolYearId
                    entityBaseId
                }
                academicGrade {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    educationLevelId
                    specialtyId
                    generalAcademicCycleId
                    generalAcademicGradeId
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                teacher {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    userId
                    academicAsignatureId
                    attentionSchedule
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_QUESTION_BANK_TEST_ONLINE = gql`
  query getAllQuestionBankTestOnlineTotalCount($campusId: String!) {
    data: getAllQuestionBankTestOnline(campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_LEARNING = gql`
  query getAllLearning($academicGradeId: String, $academicAsignatureId: String, $academicPeriodsId: [String!], $schoolId: String!) {
    data: getAllLearning(academicGradeId: $academicGradeId, academicAsignatureId: $academicAsignatureId, academicPeriodsId: $academicPeriodsId, schoolId: $schoolId, orderCreated: true, allData: true) {
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
                statement
                academicAsignatureId
                generalBasicLearningRightId
                academicStandardId
                academicGradeId
                academicPeriodsId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicAsignature {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    code
                    minWeight
                    maxWeight
                    academicAreaId
                    academicGradeId
                    generalAcademicAsignatureId
                    order
                    schoolYearId
                    entityBaseId
                }
                generalBasicLearningRight {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    dba
                    category
                    generalAcademicAsignatureId
                    generalAcademicGradeId
                }
                academicStandard {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    standard
                    generalAcademicStandardId
                    academicAsignatureId
                    academicGradeId
                }
                academicGrade {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    educationLevelId
                    specialtyId
                    generalAcademicCycleId
                    generalAcademicGradeId
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                academicPeriods {
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
                evidenceLearnings {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    statement
                    learningId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_LEARNING = gql`
  query getAllLearningTotalCount($academicGradeId: String, $academicAsignatureId: String, $academicPeriodsId: [String!], $schoolId: String!) {
    data: getAllLearning(academicGradeId: $academicGradeId, academicAsignatureId: $academicAsignatureId, academicPeriodsId: $academicPeriodsId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION = gql`
  query getAllAcademicAsignatureCoursePeriodValuation($studentId: String!, $academicPeriodId: String!, $academicAsignatureCourseId: String!){
    data: getAllAcademicAsignatureCoursePeriodValuation(studentId: $studentId, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId, orderCreated: true, allData: true){
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                academicAsignatureCourseId
                academicPeriodId
                studentId
                assessment
                performanceLevelId
                valuationType
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicAsignatureCourse {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    hourlyIntensity
                    academicAsignatureId
                    courseId
                    weight
                    teacherId
                    gradeAssignmentId
                    schoolYearId
                    entityBaseId
                }
                academicPeriod {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION = gql`
  query getAllAcademicAsignatureCoursePeriodValuationTotalCount($studentId: String!, $academicPeriodId: String!, $academicAsignatureCourseId: String!) {
    data: getAllAcademicAsignatureCoursePeriodValuation(studentId: $studentId, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId, orderCreated: true, allData: true){
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_PERIOD_VALUATION_OPTIONAL_STUDENT = gql`
  query getAllAcademicAsignatureCoursePeriodValuationOptionalStudent($academicPeriodId: String!, $academicAsignatureCourseId: String!, $studentId: String){
    data: getAllAcademicAsignatureCoursePeriodValuation(academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId, studentId: $studentId, orderCreated: true, allData: true){
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                academicAsignatureCourseId
                academicPeriodId
                studentId
                assessment
                performanceLevelId
                valuationType
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicAsignatureCourse {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    hourlyIntensity
                    academicAsignatureId
                    courseId
                    weight
                    teacherId
                    gradeAssignmentId
                    schoolYearId
                    entityBaseId
                }
                academicPeriod {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION = gql`
  query getAllAcademicAsignatureCourseYearValuation($studentId: String, $schoolYearId: String!, $academicAsignatureCourseId: String!) {
    data: getAllAcademicAsignatureCourseYearValuation(studentId: $studentId, schoolYearId: $schoolYearId, academicAsignatureCourseId: $academicAsignatureCourseId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                academicAsignatureCourseId
                schoolYearId
                studentId
                assessment
                performanceLevelId
                valuationType
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicAsignatureCourse {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    hourlyIntensity
                    academicAsignatureId
                    courseId
                    weight
                    teacherId
                    gradeAssignmentId
                    schoolYearId
                    entityBaseId
                }
                schoolYear {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
                academicPeriod {
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
        }
    }
  }
`;

export const QUERT_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_YEAR_VALUATION = gql`
  query getAllAcademicAsignatureCourseYearValuationTotalCount($studentId: String, $schoolYearId: String!, $academicAsignatureCourseId: String!){
    data: getAllAcademicAsignatureCourseYearValuation(studentId: $studentId, schoolYearId: $schoolYearId, academicAsignatureCourseId: $academicAsignatureCourseId, orderCreated: true, allData: true){
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_STUDENT_ATTENDANCE = gql`
  query getAllStudentAttendance($studentId: String, $academicPeriodId: String!, $academicAsignatureCourseId: String!) {
    data: getAllStudentAttendance(studentId: $studentId, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                academicAsignatureCourseId
                academicPeriodId
                studentId
                day
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicAsignatureCourse {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    hourlyIntensity
                    academicAsignatureId
                    courseId
                    weight
                    teacherId
                    gradeAssignmentId
                    schoolYearId
                    entityBaseId
                }
                academicPeriod {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_STUDENT_ATTENDANCE = gql`
  query getAllStudentAttendanceTotalCount($studentId: String, $academicPeriodId: String!, $academicAsignatureCourseId: String!) {
    data: getAllStudentAttendance(studentId: $studentId, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_FORUM = gql`
  query getAllForum ($schoolId: String!){
    data: getAllForum(schoolId: $schoolId, orderCreated: true, allData: true){
    totalCount
        edges {
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                name
                description
                details
                academicAsignatureCourseId
                schoolYearId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicAsignatureCourse {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    hourlyIntensity
                    academicAsignatureId
                    courseId
                    weight
                    teacherId
                    gradeAssignmentId
                    schoolYearId
                    entityBaseId
                }
                schoolYear {
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
            cursor
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_FORUM = gql`
  query getAllForumTotalCount($schoolId: String!) {
    data: getAllForum(schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_QUESTION_CATEGORY_TEST_ONLINE = gql`
  query getAllQuestionCategoryTestOnline($campusId: String!) {
    data: getAllQuestionCategoryTestOnline(campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                questionBankTestOnlineId
                name
                description
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                questionBankTestOnline {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    academicAsignatureId
                    academicGradeId
                    teacherId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_QUESTION_CATEGORY_TEST_ONLINE = gql`
  query getAllQuestionCategoryTestOnlineTotalCount($campusId: String!) {
    data: getAllQuestionCategoryTestOnline(campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EVIDENCE_LEARNING = gql`
  query getAllEvidenceLearning($learningId: String, $schoolId: String!) {
    data: getAllEvidenceLearning(learningId: $learningId, schoolId: $schoolId, orderCreated: true, allData: true) {
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
                statement
                learningId
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                learning {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    statement
                    academicAsignatureId
                    generalBasicLearningRightId
                    academicStandardId
                    academicGradeId
                    academicPeriodsId
                }
                academicStandard {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    statement
                    academicAsignatureId
                    generalBasicLearningRightId
                    academicStandardId
                    academicGradeId
                    academicPeriodsId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_EVIDENCE_LEARNING = gql`
  query getAllEvidenceLearningTotalCount($learningId: String, $schoolId: String!) {
    data: getAllEvidenceLearning(learningId: $learningId, schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EVALUATIVE_COMPONENT_SYNC_OFFLINE = gql`
  query GetAllEvaluativeComponentSyncOffline($schoolId: String!, $schoolYearId: String!) {
    getAllEvaluativeComponentSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
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
          name
          weight
          type
          academicAsignaturesId
          academicAreasId
          schoolYearId
          entityBaseId
          school {
            id
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            daneCode
            pedagogicalModel
            educationalModel
            curricularComponent
            textResolution
            textAddress
            textDaneNit
            logo
            textPrincipalSignature
            textSecretarySignature
            imgPrincipalSignature
            imgSecretarySignature
          }
          academicAsignatures {
            id
            schoolId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            abbreviation
            code
            minWeight
            maxWeight
            academicAreaId
            academicGradeId
            generalAcademicAsignatureId
            order
            schoolYearId
            entityBaseId
            generalAcademicAsignature {
              id
              active
              version
              createdAt
              updatedAt
              createdByUserId
              updatedByUserId
              name
              generalAcademicAreaId
              hasStandard
              hasDba
            }
            academicArea {
              id
              schoolId
              active
              version
              createdAt
              updatedAt
              createdByUserId
              updatedByUserId
              name
              abbreviation
              generalAcademicAreaId
              academicGradeId
              order
              isAverage
              schoolYearId
              entityBaseId
            }
          }
          academicAreas {
            id
            schoolId
            active
            version
            createdAt
            updatedAt
            createdByUserId
            updatedByUserId
            name
            abbreviation
            generalAcademicAreaId
            academicGradeId
            order
            isAverage
            schoolYearId
            entityBaseId
            academicGrade {
              id
              schoolId
              active
              version
              createdAt
              updatedAt
              createdByUserId
              updatedByUserId
              name
              educationLevelId
              specialtyId
              generalAcademicCycleId
              generalAcademicGradeId
              countStudent
              schoolYearId
              entityBaseId
            }
            generalAcademicArea {
              id
              active
              version
              createdAt
              updatedAt
              createdByUserId
              updatedByUserId
              name
              hasStandard
              hasDba
            }
            school {
              id
              active
              version
              createdAt
              updatedAt
              createdByUserId
              updatedByUserId
              name
              daneCode
              pedagogicalModel
              educationalModel
              curricularComponent
              textResolution
              textAddress
              textDaneNit
              logo
              textPrincipalSignature
              textSecretarySignature
              imgPrincipalSignature
              imgSecretarySignature
            }
          }
          schoolYear {
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
      }
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

export const QUERY_GET_ALL_CLASSROOM_PLAN = gql`
  query getAllClassroomPlan($academicAsignatureCourseId: String!) {
    data: getAllClassroomPlan(academicAsignatureCourseId: $academicAsignatureCourseId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                startDate
                endDate
                academicPeriodId
                academicAsignatureId
                academicGradeId
                academicAsignatureCourseId
                learningsId
                academicStandardsId
                generalBasicLearningRightsId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicPeriod {
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
                academicAsignature {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    abbreviation
                    code
                    minWeight
                    maxWeight
                    academicAreaId
                    academicGradeId
                    generalAcademicAsignatureId
                    order
                    schoolYearId
                    entityBaseId
                }
                academicGrade {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    educationLevelId
                    specialtyId
                    generalAcademicCycleId
                    generalAcademicGradeId
                    countStudent
                    schoolYearId
                    entityBaseId
                }
                academicAsignatureCourse {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    hourlyIntensity
                    academicAsignatureId
                    courseId
                    weight
                    teacherId
                    gradeAssignmentId
                    schoolYearId
                    entityBaseId
                }
                learnigs {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    statement
                    academicAsignatureId
                    generalBasicLearningRightId
                    academicStandardId
                    academicGradeId
                    academicPeriodsId
                }
                academicStandards {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    standard
                    generalAcademicStandardId
                    academicAsignatureId
                    academicGradeId
                }
                generalBasicLearningRights {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    dba
                    category
                    generalAcademicAsignatureId
                    generalAcademicGradeId
                }
                classroomPlanExpectedPerformances {
                    evaluativeComponentId
                    evidenceLearningsId
                }
                classroomPlanPerformanceAppraisalStrategies {
                    evaluativeComponentId
                    description
                }
                classroomPlanMethodologicalRoutes {
                    name
                    description
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_CLASSROOM_PLAN = gql`
  query getAllClassroomPlanTotalCount($academicAsignatureCourseId: String!){
    data: getAllClassroomPlan(academicAsignatureCourseId: $academicAsignatureCourseId, orderCreated: true, allData: true) {
      totalCount
    }
  }
}
`;

export const QUERY_GET_ALL_FORUM_QUESTION = gql`
  query getAllForumQuestion($schoolId: String!){
    data: getAllForumQuestion(schoolId: $schoolId, orderCreated: true, allData: true){
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                name
                description
                details
                forumId
                schoolYearId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                forum {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    description
                    details
                    academicAsignatureCourseId
                    schoolYearId
                }
                schoolYear {
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
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_FORUM_QUESTION = gql`
  query getAllForumQuestionTotalCount($schoolId: String!){
    data: getAllForumQuestion(schoolId: $schoolId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_QUESTION_TEST_ONLINE = gql`
  query getAllQuestionTestOnline($campusId: String!) {
    data: getAllQuestionTestOnline(campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                questionCategoryTestOnlineId
                questionType
                name
                statement
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                questionCategoryTestOnline {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    questionBankTestOnlineId
                    name
                    description
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_QUESTION_TEST_ONLINE = gql`
  query getAllQuestionTestOnlineTotalCount($campusId: String!) {
    data: getAllQuestionTestOnline(campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION = gql`
  query getAllAcademicAsignatureCoursePeriodEvidenceLearningValuation($campusId: String!) {
    data: getAllAcademicAsignatureCoursePeriodEvidenceLearningValuation(campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                evidenceLearningId
                academicAsignatureCourseId
                academicPeriodId
                studentId
                assessment
                performanceLevelId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                evidenceLearning {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    statement
                    learningId
                }
                academicAsignatureCourse {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    hourlyIntensity
                    academicAsignatureId
                    courseId
                    weight
                    teacherId
                    gradeAssignmentId
                    schoolYearId
                    entityBaseId
                }
                academicPeriod {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }  
  }
`;

export const QUERT_GET_TOTAL_COUNT_ACADEMIC_ASIGNATURE_COURSE_PERIOD_EVIDENCE_LEARNING_VALUATION = gql`
  query getAllAcademicAsignatureCoursePeriodEvidenceLearningValuationTotalCount($campusId: String!) {
    data: getAllAcademicAsignatureCoursePeriodEvidenceLearningValuation(campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EXPERIENCE_LEARNING = gql`
  query getAllExperienceLearning($academicAsignatureCourseId: String, $academicPeriodId: String, $campusId: String!, $experienceLearningType: ExperienceLearningType!) {
    data: getAllExperienceLearning(academicAsignatureCourseId: $academicAsignatureCourseId, academicPeriodId: $academicPeriodId, campusId: $campusId, experienceLearningType: $experienceLearningType, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                title
                academicAsignatureCourseId
                description
                experienceType
                experienceLearningType
                experienceRecoveryPlanType
                dateDelivery
                learningsId
                evidenceLearningsId
                academicPeriodId
                evaluativeComponentsId
                onlineDelivery
                criteria
                openTestDate
                closeTestDate
                navigationMethod
                shuffleQuestions
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicAsignatureCourse {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    hourlyIntensity
                    academicAsignatureId
                    courseId
                    weight
                    teacherId
                    gradeAssignmentId
                    schoolYearId
                    entityBaseId
                }
                learnigs {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    statement
                    academicAsignatureId
                    generalBasicLearningRightId
                    academicStandardId
                    academicGradeId
                    academicPeriodsId
                }
                evidenceLearnings {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    statement
                    learningId
                }
                academicPeriod {
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
                evaluativeComponents {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    weight
                    type
                    academicAsignaturesId
                    academicAreasId
                    schoolYearId
                    entityBaseId
                }
                experienceLearningPerformanceLevel {
                    criteria
                    performanceLevelId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING = gql`
  query getAllExperienceLearningTotalCount($academicAsignatureCourseId: String, $academicPeriodId: String, $campusId: String!, $experienceLearningType: ExperienceLearningType!) {
    data: getAllExperienceLearning(academicAsignatureCourseId: $academicAsignatureCourseId, academicPeriodId: $academicPeriodId, campusId: $campusId, experienceLearningType: $experienceLearningType, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_AVERAGE_VALUATION = gql`
  query getAllExperienceLearningAverageValuation($experienceLearningType: ExperienceLearningType!, $studentId: String, $evaluativeComponentId: String!, $academicPeriodId: String!, $academicAsignatureCourseId: String!) {
    data: getAllExperienceLearningAverageValuation(experienceLearningType: $experienceLearningType, studentId: $studentId, evaluativeComponentId: $evaluativeComponentId, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                academicAsignatureCourseId
                academicPeriodId
                studentId
                average
                experienceLearningType
                evaluativeComponentId
                performanceLevelId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                academicAsignatureCourse {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    hourlyIntensity
                    academicAsignatureId
                    courseId
                    weight
                    teacherId
                    gradeAssignmentId
                    schoolYearId
                    entityBaseId
                }
                academicPeriod {
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
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                evaluativeComponent {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    weight
                    type
                    academicAsignaturesId
                    academicAreasId
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_AVERAGE_VALUATION = gql`
  query getAllExperienceLearningAverageValuationTotalCount($experienceLearningType: ExperienceLearningType!, $studentId: String, $evaluativeComponentId: String!, $academicPeriodId: String!, $academicAsignatureCourseId: String!) {
    data: getAllExperienceLearningAverageValuation(experienceLearningType: $experienceLearningType, studentId: $studentId, evaluativeComponentId: $evaluativeComponentId, academicPeriodId: $academicPeriodId, academicAsignatureCourseId: $academicAsignatureCourseId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_FORUM_INTERACTION = gql`
  query getAllForumInteraction($forumId: String!) {
    data: getAllForumInteraction(forumId: $forumId) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                comment
                forumQuestionId
                schoolYearId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                forumQuestion {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    description
                    details
                    forumId
                    schoolYearId
                }
                schoolYear {
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
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_FORUM_INTERACTION = gql`
  query getAllForumInteractionTotalCount($forumId: String!) {
    data: getAllForumInteraction(forumId: $forumId) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_CO_EVALUATION = gql`
  query getAllExperienceLearningCoEvaluation($coEvaluatorId: String, $studentId: String, $experienceLearningId: String!) {
    data: getAllExperienceLearningCoEvaluation(coEvaluatorId: $coEvaluatorId, studentId: $studentId, experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                experienceLearningId
                coEvaluatorId
                studentId
                assessment
                observations
                performanceLevelId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                experienceLearning {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    title
                    academicAsignatureCourseId
                    description
                    experienceType
                    experienceLearningType
                    experienceRecoveryPlanType
                    dateDelivery
                    learningsId
                    evidenceLearningsId
                    academicPeriodId
                    evaluativeComponentsId
                    onlineDelivery
                    criteria
                    openTestDate
                    closeTestDate
                    navigationMethod
                    shuffleQuestions
                }
                coEvaluator {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }  
  }
`;

export const QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_CO_EVALUATION = gql`
  query getAllExperienceLearningCoEvaluationTotalCount($coEvaluatorId: String, $studentId: String, $experienceLearningId: String!) {
    data: getAllExperienceLearningCoEvaluation(coEvaluatorId: $coEvaluatorId, studentId: $studentId, experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION = gql`
  query getAllExperienceLearningCoEvaluationValuation($studentId: String, $experienceLearningId: String!){
    data: getAllExperienceLearningCoEvaluationValuation(studentId: $studentId, experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                experienceLearningId
                studentId
                assessment
                performanceLevelId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                experienceLearning {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    title
                    academicAsignatureCourseId
                    description
                    experienceType
                    experienceLearningType
                    experienceRecoveryPlanType
                    dateDelivery
                    learningsId
                    evidenceLearningsId
                    academicPeriodId
                    evaluativeComponentsId
                    onlineDelivery
                    criteria
                    openTestDate
                    closeTestDate
                    navigationMethod
                    shuffleQuestions
                }
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_CO_EVALUATION_VALUATION = gql`
  query getAllExperienceLearningCoEvaluationValuationTotalCount($studentId: String, $experienceLearningId: String!) {
    data: getAllExperienceLearningCoEvaluationValuation(studentId: $studentId, experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_RUBRIC_CRITERIA = gql`
  query getAllExperienceLearningRubricCriteria($experienceLearningId: String!){
    data: getAllExperienceLearningRubricCriteria(experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                experienceLearningId
                evidenceLearningId
                weight
                criteria
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                experienceLearning {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    title
                    academicAsignatureCourseId
                    description
                    experienceType
                    experienceLearningType
                    experienceRecoveryPlanType
                    dateDelivery
                    learningsId
                    evidenceLearningsId
                    academicPeriodId
                    evaluativeComponentsId
                    onlineDelivery
                    criteria
                    openTestDate
                    closeTestDate
                    navigationMethod
                    shuffleQuestions
                }
                evidenceLearnig {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    statement
                    learningId
                }
                experienceLearningRubricCriteriaPerformanceLevel {
                    criteria
                    performanceLevelId
                }
            }
        }
    }  
  }
`;

export const QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_RUBRIC_CRITERIA = gql`
  query getAllExperienceLearningRubricCriteriaTotalCount($experienceLearningId: String!) {
    data: getAllExperienceLearningRubricCriteria(experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_RUBRIC_VALUATION = gql`
  query getAllExperienceLearningRubricValuation($experienceLearningId: String!){
    data: getAllExperienceLearningRubricValuation(experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                experienceLearningId
                studentId
                assessment
                observations
                performanceLevelId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                experienceLearning {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    title
                    academicAsignatureCourseId
                    description
                    experienceType
                    experienceLearningType
                    experienceRecoveryPlanType
                    dateDelivery
                    learningsId
                    evidenceLearningsId
                    academicPeriodId
                    evaluativeComponentsId
                    onlineDelivery
                    criteria
                    openTestDate
                    closeTestDate
                    navigationMethod
                    shuffleQuestions
                }
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }  
  }
`;

export const QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_RUBRIC_VALUATION = gql`
  query getAllExperienceLearningRubricValuationTotalCount($experienceLearningId: String!) {
    data: getAllExperienceLearningRubricValuation(experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION = gql`
  query getAllExperienceLearningSelfAssessmentValuation($studentId: String, $experienceLearningId: String!){
    data: getAllExperienceLearningSelfAssessmentValuation(studentId: $studentId, experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                experienceLearningId
                studentId
                assessment
                observations
                performanceLevelId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                experienceLearning {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    title
                    academicAsignatureCourseId
                    description
                    experienceType
                    experienceLearningType
                    experienceRecoveryPlanType
                    dateDelivery
                    learningsId
                    evidenceLearningsId
                    academicPeriodId
                    evaluativeComponentsId
                    onlineDelivery
                    criteria
                    openTestDate
                    closeTestDate
                    navigationMethod
                    shuffleQuestions
                }
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }  
  }
`;

export const QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_SELF_ASSESSMENT_VALUATION = gql`
  query getAllExperienceLearningSelfAssessmentValuationTotalCount($studentId: String, $experienceLearningId: String!) {
    data: getAllExperienceLearningSelfAssessmentValuation(studentId: $studentId, experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_TRADITIONAL_VALUATION = gql`
  query getAllExperienceLearningTraditionalValuation($studentId: String, $experienceLearningId: String!){
    data: getAllExperienceLearningTraditionalValuation(studentId: $studentId, experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                experienceLearningId
                studentId
                assessment
                performanceLevelId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                experienceLearning {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    title
                    academicAsignatureCourseId
                    description
                    experienceType
                    experienceLearningType
                    experienceRecoveryPlanType
                    dateDelivery
                    learningsId
                    evidenceLearningsId
                    academicPeriodId
                    evaluativeComponentsId
                    onlineDelivery
                    criteria
                    openTestDate
                    closeTestDate
                    navigationMethod
                    shuffleQuestions
                }
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_TRADITIONAL_VALUATION = gql`
  query getAllExperienceLearningTraditionalValuationTotalCount($studentId: String, $experienceLearningId: String!){
    data: getAllExperienceLearningTraditionalValuation(studentId: $studentId, experienceLearningId: $experienceLearningId, orderCreated: true, allData: true) {
      totalCount
    }  
  }
`;

export const QUERY_GET_ALL_EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION = gql`
  query getAllExperienceLearningRubricCriteriaValuation($studentId: String, $experienceLearningRubricCriteriaId: String!){
    data: getAllExperienceLearningRubricCriteriaValuation(studentId: $studentId, experienceLearningRubricCriteriaId: $experienceLearningRubricCriteriaId, orderCreated: true, allData: true) {
      totalCount
      edges {
            cursor
            node {
                id
                campusId
                schoolId
                active
                version
                createdAt
                updatedAt
                createdByUserId
                updatedByUserId
                experienceLearningRubricCriteriaId
                studentId
                assessment
                performanceLevelId
                campus {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCodeCampus
                    consecutive
                    schoolId
                }
                school {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    daneCode
                    pedagogicalModel
                    educationalModel
                    curricularComponent
                    textResolution
                    textAddress
                    textDaneNit
                    logo
                    textPrincipalSignature
                    textSecretarySignature
                    imgPrincipalSignature
                    imgSecretarySignature
                }
                experienceLearningRubricCriteria {
                    id
                    campusId
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    experienceLearningId
                    evidenceLearningId
                    weight
                    criteria
                }
                student {
                    id
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    schoolId
                    campusId
                    academicGradeId
                    courseId
                    userId
                    code
                    schoolYearId
                    entityBaseId
                }
                performanceLevel {
                    id
                    schoolId
                    active
                    version
                    createdAt
                    updatedAt
                    createdByUserId
                    updatedByUserId
                    name
                    minimumScore
                    topScore
                    abbreviation
                    colorHex
                    isFinal
                    isRecovery
                    type
                    category
                    categoryGrade
                    generalPerformanceLevelId
                    campusId
                    academicGradesId
                    order
                    schoolYearId
                    entityBaseId
                }
            }
        }
    }
  }
`;

export const QUERT_GET_TOTAL_COUNT_EXPERIENCE_LEARNING_RUBRIC_CRITERIA_VALUATION = gql`
  query getAllExperienceLearningRubricCriteriaValuationTotalCount($studentId: String, $experienceLearningRubricCriteriaId: String!) {
    data: getAllExperienceLearningRubricCriteriaValuation(studentId: $studentId, experienceLearningRubricCriteriaId: $experienceLearningRubricCriteriaId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;


export const QUERT_GET_TOTAL_COUNT_ACADEMIC_HOUR = gql`
  query getAllAcademicHourTotalCount($academicDayId: String, $campusId: String) {
    data: getAllAcademicHour(academicDayId: $academicDayId, campusId: $campusId, orderCreated: true, allData: true) {
      totalCount
    }
  }
`;