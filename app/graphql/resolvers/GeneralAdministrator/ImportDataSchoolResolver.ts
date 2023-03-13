import { ObjectId } from 'mongodb';
import { Arg, Mutation, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { AcademicAreaRepository, AcademicAsignatureRepository, AcademicDayRepository, AcademicGradeRepository, AcademicPeriodRepository, CampusAdministratorRepository, CampusRepository, CourseRepository, EducationLevelRepository, EvaluativeComponentRepository, ModalityRepository, PerformanceLevelRepository, SchoolAdministratorRepository, SchoolRepository, SchoolYearRepository, SpecialtyRepository, TeacherRepository, UserRepository } from '../../../servers/DataSource';
import { AcademicDay } from '../../models/CampusAdministrator/AcademicDay';
import { Course } from '../../models/CampusAdministrator/Course';
import { Teacher } from '../../models/CampusAdministrator/Teacher';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { School } from '../../models/GeneralAdministrator/School';
import { SchoolAdministrator } from '../../models/GeneralAdministrator/SchoolAdministrator';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicArea } from '../../models/SchoolAdministrator/AcademicArea';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../../models/SchoolAdministrator/AcademicGrade';
import { AcademicPeriod } from '../../models/SchoolAdministrator/AcademicPeriod';
import { CampusAdministrator } from '../../models/SchoolAdministrator/CampusAdministrator';
import { EducationLevel } from '../../models/SchoolAdministrator/EducationLevel';
import { EvaluativeComponent } from '../../models/SchoolAdministrator/EvaluativeComponent';
import { Modality } from '../../models/SchoolAdministrator/Modality';
import { PerformanceLevel } from '../../models/SchoolAdministrator/PerformanceLevel';
import { SchoolYear } from '../../models/SchoolAdministrator/SchoolYear';
import { Specialty } from '../../models/SchoolAdministrator/Specialty';
import { AcademicDayResolver } from '../CampusAdministrator/AcademicDayResolver';
import { CourseResolver } from '../CampusAdministrator/CourseResolver';
import { StudentResolver } from './StudentResolver';

@Resolver(School)
export class ImportDataSchoolResolver {
  @InjectRepository(Specialty)
  private repository = SpecialtyRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(SchoolYear)
  private repositorySchoolYear = SchoolYearRepository;

  @InjectRepository(AcademicPeriod)
  private repositoryAcademicPeriod = AcademicPeriodRepository;

  @InjectRepository(Campus)
  private repositoryCampus = CampusRepository;

  @InjectRepository(AcademicDay)
  private repositoryAcademicDay = AcademicDayRepository

  @InjectRepository(EducationLevel)
  private repositoryEducationLevel = EducationLevelRepository

  @InjectRepository(PerformanceLevel)
  private repositoryPerformanceLevel = PerformanceLevelRepository

  @InjectRepository(EvaluativeComponent)
  private repositoryEvaluativeComponent = EvaluativeComponentRepository

  @InjectRepository(Modality)
  private repositoryModality = ModalityRepository

  @InjectRepository(Specialty)
  private repositorySpecialty = SpecialtyRepository

  @InjectRepository(AcademicArea)
  private repositoryAcademicArea = AcademicAreaRepository

  @InjectRepository(AcademicAsignature)
  private repositoryAcademicAsignature = AcademicAsignatureRepository

  @InjectRepository(AcademicGrade)
  private repositoryAcademicGrade = AcademicGradeRepository

  @InjectRepository(Course)
  private repositoryCourse = CourseRepository

  @InjectRepository(SchoolAdministrator)
  private repositorySchoolAdministrator = SchoolAdministratorRepository

  @InjectRepository(CampusAdministrator)
  private repositoryCampusAdministrator = CampusAdministratorRepository

  @InjectRepository(Teacher)
  private repositoryTeacher = TeacherRepository;

  private academicDayResolver = new AcademicDayResolver();

  private courseResolver = new CourseResolver();

  private studentResolver = new StudentResolver();


  @Mutation(() => Boolean)
  async importDataSchoolInactive(
    @Arg('schoolId', () => String) schoolId: String
  ) {
    let dataSchoolYear = await this.repositorySchoolYear.findBy({ where: { schoolId: schoolId } });
    if (dataSchoolYear.length == 1) {
      let dataCampus = await this.repositoryCampus.findBy({ where: { schoolId: schoolId } });
      for (let schoolYear of dataSchoolYear) {
        console.log("Step: Initial")
        console.log("Update Year")
        let resultSchoolYear = await this.repositorySchoolYear.save({
          _id: new ObjectId(schoolYear.id.toString()),
          ...schoolYear,
          name: "2023",
          version: (schoolYear?.version as number) + 1,
        });
        let dataAcademicPeriods = await this.repositoryAcademicPeriod.findBy({ where: { schoolId: schoolId } });
        console.log("Academic Periods: ", dataAcademicPeriods?.length)
        for (let academicPeriod of dataAcademicPeriods) {
          let resultAcademicPeriod = await this.repositoryAcademicPeriod.save({
            _id: new ObjectId(academicPeriod.id.toString()),
            ...academicPeriod,
            version: (academicPeriod?.version as number) + 1,
            schoolId: schoolId.toString(),
            schoolYearId: schoolYear.id.toString()
          });
        }
        for (let campus of dataCampus) {
          let dataAcademicDays = await this.repositoryAcademicDay.findBy({ where: { campusId: campus.id.toString() } });;
          console.log("Academic Days Campus: ", dataAcademicDays?.length)
          console.log("Campus: ", campus?.name)
          for (let academicDay of dataAcademicDays) {
            let resultAcademicDay = await this.repositoryAcademicDay.save({
              _id: new ObjectId(academicDay.id.toString()),
              ...academicDay,
              version: (academicDay?.version as number) + 1,
              schoolId: schoolId.toString(),
              schoolYearId: schoolYear.id.toString()
            });
          }
        }
        let dataEducationLevel = await this.repositoryEducationLevel.findBy({ where: { schoolId: schoolId } });
        console.log("Education Level: ", dataEducationLevel?.length)
        for (let educationLevel of dataEducationLevel) {
          let resultEducationLevel = await this.repositoryEducationLevel.save({
            _id: new ObjectId(educationLevel.id.toString()),
            ...educationLevel,
            version: (educationLevel?.version as number) + 1,
            schoolId: schoolId.toString(),
            schoolYearId: schoolYear.id.toString()
          });
        }
        let dataPerformanceLevel = await this.repositoryPerformanceLevel.findBy({ where: { schoolId: schoolId } });
        console.log("Performance Level: ", dataPerformanceLevel?.length)
        for (let performanceLevel of dataPerformanceLevel) {
          let resultEducationLevel = await this.repositoryPerformanceLevel.save({
            _id: new ObjectId(performanceLevel.id.toString()),
            ...performanceLevel,
            version: (performanceLevel?.version as number) + 1,
            schoolId: schoolId.toString(),
            schoolYearId: schoolYear.id.toString()
          });
        }
        let dataEvaluativeComponent = await this.repositoryEvaluativeComponent.findBy({ where: { schoolId: schoolId } });
        console.log("Evaluative Component: ", dataEvaluativeComponent?.length)
        for (let evaluativeComponent of dataEvaluativeComponent) {
          let resultEducationLevel = await this.repositoryEvaluativeComponent.save({
            _id: new ObjectId(evaluativeComponent.id.toString()),
            ...evaluativeComponent,
            version: (evaluativeComponent?.version as number) + 1,
            schoolId: schoolId.toString(),
            schoolYearId: schoolYear.id.toString()
          });
        }
        let dataModality = await this.repositoryModality.findBy({ where: { schoolId: schoolId } });
        console.log("Modality: ", dataEvaluativeComponent?.length)
        for (let modality of dataModality) {
          let resultModality = await this.repositoryModality.save({
            _id: new ObjectId(modality.id.toString()),
            ...modality,
            version: (modality?.version as number) + 1,
            schoolId: schoolId.toString(),
            schoolYearId: schoolYear.id.toString()
          });
          let dataSpeciality = await this.repositorySpecialty.findBy({ where: { modalityId: modality.id.toString() } });
          console.log("Speciality: ", dataSpeciality?.length)
          for (let speciality of dataSpeciality) {
            let resultSpeciality = await this.repositorySpecialty.save({
              _id: new ObjectId(speciality.id.toString()),
              ...speciality,
              version: (speciality?.version as number) + 1,
              schoolId: schoolId.toString(),
              schoolYearId: schoolYear.id.toString()
            });
          }
        }
        let dataAcademicArea = await this.repositoryAcademicArea.findBy({ where: { schoolId: schoolId } });
        console.log("Academic Area: ", dataAcademicArea?.length)
        for (let academicArea of dataAcademicArea) {
          let resultAcademicArea = await this.repositoryAcademicArea.save({
            _id: new ObjectId(academicArea.id.toString()),
            ...academicArea,
            version: (academicArea?.version as number) + 1,
            schoolId: schoolId.toString(),
            schoolYearId: schoolYear.id.toString()
          });
          let dataAcademicAsignature = await this.repositoryAcademicAsignature.findBy({ where: { academicAreaId: academicArea.id.toString() } });
          console.log("Academic Asignature: ", dataAcademicAsignature?.length)
          for (let academicAsignature of dataAcademicAsignature) {
            let resultAcademicAsignature = await this.repositoryAcademicAsignature.save({
              _id: new ObjectId(academicAsignature.id.toString()),
              ...academicAsignature,
              version: (academicAsignature?.version as number) + 1,
              schoolId: schoolId.toString(),
              schoolYearId: schoolYear.id.toString()
            });
          }
        }
        let dataAcademicGrade = await this.repositoryAcademicGrade.findBy({ where: { schoolId: schoolId } });
        console.log("Academic Grade: ", dataAcademicGrade?.length)
        for (let academicGrade of dataAcademicGrade) {
          let resultAcademicGrade = await this.repositoryAcademicGrade.save({
            _id: new ObjectId(academicGrade.id.toString()),
            ...academicGrade,
            version: (academicGrade?.version as number) + 1,
            schoolId: schoolId.toString(),
            schoolYearId: schoolYear.id.toString()
          });
          let dataCourse = await this.repositoryCourse.findBy({ where: { academicGradeId: academicGrade.id.toString() } });
          console.log("Course: ", dataCourse?.length)
          for (let course of dataCourse) {
            let resultCourse = await this.repositoryCourse.save({
              _id: new ObjectId(course.id.toString()),
              ...course,
              version: (course?.version as number) + 1,
              studentsId: [],
              schoolId: schoolId.toString(),
              schoolYearId: schoolYear.id.toString()
            });
          }
        }
        console.log("Step: SIMAT ")
        await this.academicDayResolver.createAllInitialsAcademicDay(schoolId, schoolYear.id.toString());
        console.log("Step: SIMAT - Academic Days")
        await this.courseResolver.createAllInitialsCourse(schoolId, schoolYear.id.toString());
        console.log("Step: SIMAT - Courses")
        await this.courseResolver.updateGradeAllInitialsCourse(schoolId, schoolYear.id.toString());
        console.log("Step: SIMAT - Update Grade Courses")
        await this.courseResolver.updateGradeAcademicDayAllInitialsCourse(schoolId, schoolYear.id.toString());
        console.log("Step: SIMAT - Update Academic Day Courses")
        await this.studentResolver.createAllInitialsStudents(schoolId, schoolYear.id.toString());
        console.log("Step: SIMAT - Update Students")
        console.log("Step: Final")
        console.log("Activate Administrator IE")
        let dataSchoolAdministrator = await this.repositorySchoolAdministrator.findBy({ where: { schoolId: { $in: [schoolId] } } });
        console.log("School Administrator: ", dataSchoolAdministrator?.length)
        for (let schoolAdministrator of dataSchoolAdministrator) {
          let resultUser = await this.repositoryUser.findOneBy(schoolAdministrator?.userId?.toString());
          resultUser = await this.repositoryUser.save({
            _id: new ObjectId(resultUser?.id?.toString()),
            ...resultUser,
            active: true,
            version: (resultUser?.version as number) + 1,
          });
        }
        console.log("Activate Administrator Campus")
        let dataCampusAdministrator = await this.repositoryCampusAdministrator.findBy({ where: { schoolId: { $in: [schoolId] } } });
        console.log("Campus Administrator: ", dataCampusAdministrator?.length)
        for (let campusAdministrator of dataSchoolAdministrator) {
          let resultUser = await this.repositoryUser.findOneBy(campusAdministrator?.userId?.toString());
          resultUser = await this.repositoryUser.save({
            _id: new ObjectId(resultUser?.id?.toString()),
            ...resultUser,
            active: true,
            version: (resultUser?.version as number) + 1,
          });
        }
        console.log("Activate Teachers")
        let dataTeacher = await this.repositoryTeacher.findBy({ where: { schoolId: { $in: [schoolId] } } });
        console.log("Teacher: ", dataTeacher?.length)
        for (let teacher of dataTeacher) {
          let resultUser = await this.repositoryUser.findOneBy(teacher?.userId?.toString());
          resultUser = await this.repositoryUser.save({
            _id: new ObjectId(resultUser?.id?.toString()),
            ...resultUser,
            active: true,
            version: (resultUser?.version as number) + 1,
          });
        }
      }
    } else {
      console.log("Step Fail: School Years ", dataSchoolYear?.length)
    }
    return true;
  }

  //buscar en todos los academic day y actualizar el schoolID segun el campusiD
  // falta limpiar la base de datos de los registros de asignaturas que no tengan un area vinculada


}
