import { env } from 'process';
import { DataSource } from 'typeorm';
import { AcademicDay } from '../graphql/models/CampusAdministrator/AcademicDay';
import { AcademicHour } from '../graphql/models/CampusAdministrator/AcademicHour';
import { Course } from '../graphql/models/CampusAdministrator/Course';
import { Guardian } from '../graphql/models/CampusAdministrator/Guardian';
import { Teacher } from '../graphql/models/CampusAdministrator/Teacher';
import { AuditLogin } from '../graphql/models/GeneralAdministrator/AuditLogin';
import { Campus } from '../graphql/models/GeneralAdministrator/Campus';
import { DocumentType } from '../graphql/models/GeneralAdministrator/DocumentType';
import { Email } from '../graphql/models/GeneralAdministrator/Email';
import { Gender } from '../graphql/models/GeneralAdministrator/Gender';
import { GeneralAcademicArea } from '../graphql/models/GeneralAdministrator/GeneralAcademicArea';
import { GeneralAcademicAsignature } from '../graphql/models/GeneralAdministrator/GeneralAcademicAsignature';
import { GeneralAcademicCycle } from '../graphql/models/GeneralAdministrator/GeneralAcademicCycle';
import { GeneralAcademicGrade } from '../graphql/models/GeneralAdministrator/GeneralAcademicGrade';
import { GeneralAcademicStandard } from '../graphql/models/GeneralAdministrator/GeneralAcademicStandard';
import { GeneralPerformanceLevel } from '../graphql/models/GeneralAdministrator/GeneralPerformanceLevel';
import { Inbox } from '../graphql/models/GeneralAdministrator/Inbox';
import { Menu } from '../graphql/models/GeneralAdministrator/Menu';
import { MenuItem } from '../graphql/models/GeneralAdministrator/MenuItem';
import { Module } from '../graphql/models/GeneralAdministrator/Module';
import { Municipality } from '../graphql/models/GeneralAdministrator/Municipality';
import { Notification } from '../graphql/models/GeneralAdministrator/Notification';
import { Role } from '../graphql/models/GeneralAdministrator/Role';
import { School } from '../graphql/models/GeneralAdministrator/School';
import { SchoolAdministrator } from '../graphql/models/GeneralAdministrator/SchoolAdministrator';
import { Student } from '../graphql/models/GeneralAdministrator/Student';
import { User } from '../graphql/models/GeneralAdministrator/User';
import { AcademicArea } from '../graphql/models/SchoolAdministrator/AcademicArea';
import { AcademicAsignature } from '../graphql/models/SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../graphql/models/SchoolAdministrator/AcademicGrade';
import { AcademicIndicator } from '../graphql/models/SchoolAdministrator/AcademicIndicator';
import { AcademicPeriod } from '../graphql/models/SchoolAdministrator/AcademicPeriod';
import { AcademicStandard } from '../graphql/models/SchoolAdministrator/AcademicStandard';
import { CampusAdministrator } from '../graphql/models/SchoolAdministrator/CampusAdministrator';
import { CampusCoordinator } from '../graphql/models/SchoolAdministrator/CampusCoordinator';
import { EducationLevel } from '../graphql/models/SchoolAdministrator/EducationLevel';
import { EvaluativeComponent } from '../graphql/models/SchoolAdministrator/EvaluativeComponent';
import { Forum } from '../graphql/models/SchoolAdministrator/Forum';
import { ForumInteraction } from '../graphql/models/SchoolAdministrator/ForumInteraction';
import { GradeAssignment } from '../graphql/models/SchoolAdministrator/GradeAssignment';
import { Modality } from '../graphql/models/SchoolAdministrator/Modality';
import { PerformanceLevel } from '../graphql/models/SchoolAdministrator/PerformanceLevel';
import { SchoolYear } from '../graphql/models/SchoolAdministrator/SchoolYear';
import { Specialty } from '../graphql/models/SchoolAdministrator/Specialty';


export const dataSource = new DataSource({
  type: 'mongodb',
  url: env.DATABASE_URL_TYPE_ORM,
  authSource: 'admin',
  entities: [
    AuditLogin,
    DocumentType,
    Email,
    Gender,
    Inbox,
    Menu,
    Module,
    Notification,
    Role,
    User,
    MenuItem,
    Campus,
    GeneralAcademicArea,
    GeneralAcademicAsignature,
    GeneralAcademicCycle,
    GeneralAcademicGrade,
    GeneralAcademicStandard,
    GeneralPerformanceLevel,
    Municipality,
    School,
    SchoolAdministrator,
    Student,
    AcademicArea,
    AcademicAsignature,
    AcademicGrade,
    AcademicIndicator,
    AcademicPeriod,
    AcademicStandard,
    CampusAdministrator,
    CampusCoordinator,
    EducationLevel,
    EvaluativeComponent,
    GradeAssignment,
    Modality,
    PerformanceLevel,
    SchoolYear,
    Specialty,
    AcademicDay,
    AcademicHour,
    Course,
    Guardian,
    Teacher,
    Forum,
    ForumInteraction
  ],
  synchronize: true,
  logger: 'advanced-console',
  logging: 'all',
  dropSchema: false,
  cache: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const AuditLoginRepository = dataSource.getMongoRepository(AuditLogin);
export const DocumentTypeRepository = dataSource.getMongoRepository(DocumentType);
export const EmailRepository = dataSource.getMongoRepository(Email);
export const GenderRepository = dataSource.getMongoRepository(Gender);
export const InboxRepository = dataSource.getMongoRepository(Inbox);
export const MenuRepository = dataSource.getMongoRepository(Menu);
export const ModuleRepository = dataSource.getMongoRepository(Module);
export const NotificationRepository = dataSource.getMongoRepository(Notification);
export const RoleRepository = dataSource.getMongoRepository(Role);
export const UserRepository = dataSource.getMongoRepository(User);
export const MenuItemRepository = dataSource.getMongoRepository(MenuItem);
export const CampusRepository = dataSource.getMongoRepository(Campus);
export const GeneralAcademicAreaRepository = dataSource.getMongoRepository(GeneralAcademicArea);
export const GeneralAcademicAsignatureRepository = dataSource.getMongoRepository(GeneralAcademicAsignature);
export const GeneralAcademicCycleRepository = dataSource.getMongoRepository(GeneralAcademicCycle);
export const GeneralAcademicGradeRepository = dataSource.getMongoRepository(GeneralAcademicGrade);
export const GeneralAcademicStandardRepository = dataSource.getMongoRepository(GeneralAcademicStandard);
export const GeneralPerformanceLevelRepository = dataSource.getMongoRepository(GeneralPerformanceLevel);
export const MunicipalityRepository = dataSource.getMongoRepository(Municipality);
export const SchoolRepository = dataSource.getMongoRepository(School);
export const SchoolAdministratorRepository = dataSource.getMongoRepository(SchoolAdministrator);
export const StudentRepository = dataSource.getMongoRepository(Student);
export const AcademicAreaRepository = dataSource.getMongoRepository(AcademicArea);
export const AcademicAsignatureRepository = dataSource.getMongoRepository(AcademicAsignature);
export const AcademicGradeRepository = dataSource.getMongoRepository(AcademicGrade);
export const AcademicIndicatorRepository = dataSource.getMongoRepository(AcademicIndicator);
export const AcademicPeriodRepository = dataSource.getMongoRepository(AcademicPeriod);
export const AcademicStandardRepository = dataSource.getMongoRepository(AcademicStandard);
export const CampusAdministratorRepository = dataSource.getMongoRepository(CampusAdministrator);
export const CampusCoordinatorRepository = dataSource.getMongoRepository(CampusCoordinator);
export const EducationLevelRepository = dataSource.getMongoRepository(EducationLevel);
export const EvaluativeComponentRepository = dataSource.getMongoRepository(EvaluativeComponent);
export const GradeAssignmentRepository = dataSource.getMongoRepository(GradeAssignment);
export const ModalityRepository = dataSource.getMongoRepository(Modality);
export const PerformanceLevelRepository = dataSource.getMongoRepository(PerformanceLevel);
export const SchoolYearRepository = dataSource.getMongoRepository(SchoolYear);
export const SpecialtyRepository = dataSource.getMongoRepository(Specialty);
export const AcademicDayRepository = dataSource.getMongoRepository(AcademicDay);
export const AcademicHourRepository = dataSource.getMongoRepository(AcademicHour);
export const CourseRepository = dataSource.getMongoRepository(Course);
export const GuardianRepository = dataSource.getMongoRepository(Guardian);
export const TeacherRepository = dataSource.getMongoRepository(Teacher);
export const ForumRepository = dataSource.getMongoRepository(Forum);
export const ForumInteractionRepository = dataSource.getMongoRepository(ForumInteraction);
