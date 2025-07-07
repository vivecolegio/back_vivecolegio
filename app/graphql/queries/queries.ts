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

// Queries para entidades generales requeridas en primer login
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
    data: getAllPerformanceLevel(schoolId: $schoolId, orderCreated: true, allData: true, schoolYearId: $schoolYearId) {
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

export const QUERT_GET_TOTAL_COUNT_CAMPUS = gql`
  query getAllCampusTotalCount($schoolId: String!) {
    data: getAllCampusSyncOffline(schoolId: $schoolId) {
      totalCount
    }
  }
`;

export const QUERY_GET_ALL_CAMPUS = gql`
  query getAllCampus($schoolId: String!) {
    data: getAllCampus(schoolId: $schoolId, orderCreated: true, allData: true) {
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
          daneCodeCampus
          consecutive
          schoolId
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

export const QUERY_GET_ALL_TEACHER = gql`
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

export const QUERY_GET_ALL_STUDENT = gql`
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

export const QUERY_GET_ALL_EDUCATION_LEVEL = gql`
  query getAllEducationLevelSyncOffline($schoolId: String!, $schoolYearId: String) {
    data: getAllEducationLevelSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
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
        }
      }
    }
  }
`;

export const QUERY_GET_EDUCATION_LEVEL = gql`
  query getEducationLevel($id: String!) {
    data: getEducationLevel(id: $id) {
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
  }
`;

export const QUERY_GET_ALL_COURSE = gql`
  query getAllCourseSyncOffline($schoolId: String!, $schoolYearId: String) {
    data: getAllCourseSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
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
        }
      }
    }
  }
`;

export const QUERY_GET_COURSE = gql`
  query getCourse($id: String!) {
    data: getCourse(id: $id) {
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
  }
`;

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

export const QUERY_GET_ALL_PERFORMANCE_LEVEL = gql`
  query getAllPerformanceLevel($schoolId: String!, $schoolYearId: String!) {
    data: getAllPerformanceLevel(schoolId: $schoolId, orderCreated: true, allData: true, schoolYearId: $schoolYearId) {
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
        }
      }
    }
  }
`;

export const QUERY_GET_PERFORMANCE_LEVEL = gql`
  query getPerformanceLevel($id: String!) {
    data: getPerformanceLevel(id: $id) {
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
`;

// ===== SYNC OFFLINE QUERIES FOR HEAVY ENTITIES =====

// Query to get all AcademicArea for sync offline - based on provided schema
export const QUERY_GET_ALL_ACADEMIC_AREA_SYNC_OFFLINE = gql`
  query GetAllAcademicAreaSyncOffline($schoolId: String!, $schoolYearId: String!) {
    getAllAcademicAreaSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
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

// Query to get all AcademicAsignature for sync offline - based on provided schema
export const QUERY_GET_ALL_ACADEMIC_ASIGNATURE_SYNC_OFFLINE = gql`
  query GetAllAcademicAsignatureSyncOffline($schoolId: String!, $schoolYearId: String!) {
    getAllAcademicAsignatureSyncOffline(schoolYearId: $schoolYearId, schoolId: $schoolId) {
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

// Query to get all AcademicGrade for sync offline - based on provided schema
export const QUERY_GET_ALL_ACADEMIC_GRADE_SYNC_OFFLINE = gql`
  query GetAllAcademicGradeSyncOffline($schoolId: String!, $schoolYearId: String!) {
    getAllAcademicGradeSyncOffline(schoolId: $schoolId, schoolYearId: $schoolYearId) {
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

// Query to get all EvaluativeComponent for sync offline - based on provided schema
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