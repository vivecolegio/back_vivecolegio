import PDFMerger from 'pdf-merger-js/browser';
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { AcademicAreaCoursePeriodValuationRepository, AcademicAreaRepository, AcademicAsignatureCoursePeriodValuationRepository, AcademicAsignatureCourseRepository, AcademicAsignatureRepository, AcademicDayRepository, AcademicGradeRepository, AcademicPeriodRepository, AverageAcademicPeriodCourseRepository, AverageAcademicPeriodStudentRepository, CampusRepository, CourseRepository, PerformanceLevelRepository, SchoolRepository, StudentRepository, TeacherRepository, UserRepository } from '../../../servers/DataSource';
import { IContext } from '../../interfaces/IContext';
import { AcademicAreaCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAreaCoursePeriodValuation';
import { AcademicAsignatureCourse } from '../../models/CampusAdministrator/AcademicAsignatureCourse';
import { AcademicAsignatureCoursePeriodValuation } from '../../models/CampusAdministrator/AcademicAsignatureCoursePeriodValuation';
import { AcademicDay } from '../../models/CampusAdministrator/AcademicDay';
import { AverageAcademicPeriodCourse } from '../../models/CampusAdministrator/AverageAcademicPeriodCourse';
import { AverageAcademicPeriodStudent } from '../../models/CampusAdministrator/AverageAcademicPeriodStudent';
import { Course } from '../../models/CampusAdministrator/Course';
import { Teacher } from '../../models/CampusAdministrator/Teacher';
import { Campus } from '../../models/GeneralAdministrator/Campus';
import { School } from '../../models/GeneralAdministrator/School';
import { Student } from '../../models/GeneralAdministrator/Student';
import { User } from '../../models/GeneralAdministrator/User';
import { AcademicArea } from '../../models/SchoolAdministrator/AcademicArea';
import { AcademicAsignature } from '../../models/SchoolAdministrator/AcademicAsignature';
import { AcademicGrade } from '../../models/SchoolAdministrator/AcademicGrade';
import { AcademicPeriod } from '../../models/SchoolAdministrator/AcademicPeriod';
import { PerformanceLevel } from '../../models/SchoolAdministrator/PerformanceLevel';
import { SchoolConfiguration } from '../../models/SchoolAdministrator/SchoolConfiguration';

@Resolver(SchoolConfiguration)
export class PerformanceReportResolver {

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(Campus)
  private repositoryCampus = CampusRepository;

  @InjectRepository(AcademicGrade)
  private repositoryAcademicGrade = AcademicGradeRepository;

  @InjectRepository(AcademicAsignatureCourse)
  private repositoryAcademicAsignatureCourse = AcademicAsignatureCourseRepository;

  @InjectRepository(Course)
  private repositoryCourse = CourseRepository;

  @InjectRepository(Teacher)
  private repositoryTeacher = TeacherRepository;

  @InjectRepository(Student)
  private repositoryStudent = StudentRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(AcademicDay)
  private repositoryAcademicDay = AcademicDayRepository;

  @InjectRepository(AcademicPeriod)
  private repositoryAcademicPeriod = AcademicPeriodRepository;

  @InjectRepository(AcademicAsignature)
  private repositoryAcademicAsignature = AcademicAsignatureRepository;

  @InjectRepository(AcademicArea)
  private repositoryAcademicArea = AcademicAreaRepository;

  @InjectRepository(AcademicAsignatureCoursePeriodValuation)
  private repositoryAcademicAsignatureCoursePeriodValuation = AcademicAsignatureCoursePeriodValuationRepository;

  @InjectRepository(AcademicAreaCoursePeriodValuation)
  private repositoryAcademicAreaCoursePeriodValuation = AcademicAreaCoursePeriodValuationRepository;

  @InjectRepository(PerformanceLevel)
  private repositoryPerformanceLevel = PerformanceLevelRepository;

  @InjectRepository(AverageAcademicPeriodStudent)
  private repositoryAverageAcademicPeriodStudent = AverageAcademicPeriodStudentRepository;

  @InjectRepository(AverageAcademicPeriodCourse)
  private repositoryAverageAcademicPeriodCourse = AverageAcademicPeriodCourseRepository;

  @Mutation(() => Boolean)
  async generatePerformanceLevelExample(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    var fs = require('fs');
    var pdf = require('html-pdf');
    var html = fs.readFileSync('./app/reports/performanceReport/PerformanceReport.html', 'utf8');
    var options = {
      format: 'Letter', border: {
        top: "5mm",
        right: "5mm",
        bottom: "5mm",
        left: "5mm"
      },
    };
    pdf.create(html, options).toFile('./businesscard.pdf', function (err: any, res: any) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });
    return true;
  }


  @Mutation(() => String)
  async generatePerformanceReportCourse(
    @Arg('id', () => String) id: string,
    @Arg('schoolId', () => String) schoolId: string,
    @Arg('schoolYearId', () => String) schoolYearId: string,
    @Arg('academicPeriodId', () => String) academicPeriodId: string,
    @Arg('studentId', () => String, { nullable: true }) studentId: String,
    @Arg('format', () => String) format: String,
    @Ctx() context: IContext
  ): Promise<String | undefined> {
    // id = "6298c6ede686a07d17a79e2c";
    const merger = new PDFMerger();
    let data = {};
    let course = await this.repositoryCourse.findOneBy(id);
    if (course) {
      let campus = await this.repositoryCampus.findOneBy(course?.campusId);
      let school = await this.repositorySchool.findOneBy(schoolId);
      let academicGrade = await this.repositoryAcademicGrade.findOneBy(course?.academicGradeId);
      let titular = await this.repositoryTeacher.findOneBy(course?.teacherId);
      let titularUser = await this.repositoryUser.findOneBy(titular?.userId);
      let academicDay = await this.repositoryAcademicDay.findOneBy(course?.academicDayId);
      let academicPeriods = await this.repositoryAcademicPeriod.findBy({
        where: {
          schoolYearId: schoolYearId,
          schoolId: schoolId,
          active: true,
        },
        order: { order: 1 },
      });
      let academicPeriod = await this.repositoryAcademicPeriod.findOneBy(academicPeriodId);
      let academicAsignaturesCourse = await this.repositoryAcademicAsignatureCourse.findBy({ where: { courseId: course?.id?.toString() } });
      if (academicAsignaturesCourse?.length > 0) {
        data = { ...data, "schoolName": school?.name };
        data = { ...data, "schoolResolution": school?.textResolution };
        data = { ...data, "schoolAddress": school?.textAddress };
        data = { ...data, "schoolDaneNit": school?.textDaneNit };
        data = { ...data, "schoolLogo": school?.logo };
        data = { ...data, "studentAcademicGradeName": academicGrade?.name };
        data = { ...data, "studentAcademicCourseName": course?.name };
        data = { ...data, "campusName": campus?.name };
        data = { ...data, "titular": titularUser?.name + " " + titularUser?.lastName };
        data = { ...data, "studentAcademicDayName": academicDay?.name };
        data = { ...data, "academicPeriodName": academicPeriod?.name };
        data = { ...data, "academicPeriodId": academicPeriod?.id?.toString() };
        let areasAux: any[] = []
        let asignaturesAux: any[] = []
        for (let asignatureCourse of academicAsignaturesCourse) {
          let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse?.academicAsignatureId);
          let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature?.academicAreaId);
          if (academicArea !== null) {
            asignaturesAux.push(academicAsignature);
            areasAux.push(academicArea);
          }
        }
        const ids = areasAux.map(o => o.id?.toString())
        const count: any = {};
        ids.forEach(element => {
          count[element] = (count[element] || 0) + 1;
        });
        const filtered = areasAux.filter(({ id }, index) => !ids.includes(id?.toString(), index + 1))
        for (let filter of filtered) {
          filter.count = count[filter?.id];
        }
        let academicPeriodsData: any[] = [];
        academicPeriods.map((academicPeriod) => {
          let academicPeriodData = { "name": academicPeriod?.name, "id": academicPeriod?.id?.toString(), "order": academicPeriod?.order }
          academicPeriodsData.push(academicPeriodData);
        })
        let academicPeriodData = { "name": "FINAL", "id": "FINAL", "order": 99 }
        academicPeriodsData.push(academicPeriodData);
        data = { ...data, "academicPeriods": academicPeriodsData };
        let studentsId = course?.studentsId;
        if (studentId !== null && studentId?.length > 0) {
          studentsId = [studentId]
        }
        areasAux = filtered.sort(this.compareOrderAcademicArea)
        let areas: any[] = [];
        areasAux.map((area) => {
          let asignaturesAreaData: any[] = [];
          for (let asignature of asignaturesAux) {
            if (asignature?.academicAreaId === area?.id?.toString()) {
              let asignaturesData = { "name": asignature?.name, "id": asignature?.id?.toString(), "academicPeriods": academicPeriodsData }
              asignaturesAreaData.push(asignaturesData)
            }
          }
          let areaData = { "name": area?.name, "id": area?.id?.toString(), "asignatures": asignaturesAreaData, "academicPeriods": academicPeriodsData }
          areas.push(areaData);
        })
        data = { ...data, "areas": areas };
        let averageAcademicPeriodCourseList = await this.repositoryAverageAcademicPeriodCourse.findBy({
          where:
          {
            courseId: id,
            academicPeriodId,
          }
        });
        data = { ...data, "promCourse": averageAcademicPeriodCourseList[0]?.assessment?.toFixed(2) };
        //console.log("aca vamos bien", academicAsignaturesCourse);
        let urls: any[] = [];
        if (studentsId) {
          let promisesGeneratePDF: any[] = [];
          // for (let studentId of [studentsId[0]]) {
          for (let studentId of studentsId) {
            let dataPDF = { ...data };
            let student = await this.repositoryStudent.findOneBy(studentId + "");
            let studentUser = await this.repositoryUser.findOneBy(student?.userId);
            dataPDF = { ...dataPDF, "studentName": studentUser?.name + " " + studentUser?.lastName };
            dataPDF = { ...dataPDF, "studentDocumentNumber": studentUser?.documentNumber };
            let averageAcademicPeriodStudentList = await this.repositoryAverageAcademicPeriodStudent.findBy({
              where:
              {
                courseId: id,
                academicPeriodId,
                studentId,
              }
            });
            data = { ...data, "promStudent": averageAcademicPeriodStudentList[0]?.assessment?.toFixed(2) };
            data = { ...data, "puestoEstudiante": averageAcademicPeriodStudentList[0]?.score };
            let notesAsignatures = [];
            for (let asignatureCourse of academicAsignaturesCourse) {
              let academicAsignature = await this.repositoryAcademicAsignature.findOneBy(asignatureCourse?.academicAsignatureId);
              let academicArea = await this.repositoryAcademicArea.findOneBy(academicAsignature?.academicAreaId);
              let teacherAsignatureCourse = await this.repositoryTeacher.findOneBy(asignatureCourse?.teacherId);
              let teacherUserAsignatureCourse = await this.repositoryUser.findOneBy(teacherAsignatureCourse?.userId);
              for (let period of academicPeriods) {
                if (period?.order && academicPeriod?.order) {
                  if (period?.order <= academicPeriod?.order) {
                    let notesAsignature = await this.repositoryAcademicAsignatureCoursePeriodValuation.findBy({
                      academicAsignatureCourseId: asignatureCourse?.id?.toString(),
                      academicPeriodId: period?.id?.toString(),
                      studentId
                    });
                    if (notesAsignature?.length == 1) {
                      let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(notesAsignature[0]?.performanceLevelId);
                      notesAsignatures.push({ assessment: notesAsignature[0]?.assessment?.toFixed(2), academicPeriodId: notesAsignature[0]?.academicPeriodId, performanceLevel: performanceLevel?.name, "asignatureId": academicAsignature?.id?.toString(), "areaId": academicArea?.id?.toString(), "teacher": teacherUserAsignatureCourse?.name + " " + teacherUserAsignatureCourse?.lastName })
                    } else {
                      notesAsignatures.push({ assessment: "-", academicPeriodId: period?.id?.toString(), performanceLevel: "-", "asignatureId": academicAsignature?.id?.toString(), "areaId": academicArea?.id?.toString(), "teacher": teacherUserAsignatureCourse?.name + " " + teacherUserAsignatureCourse?.lastName })
                    }
                  } else {
                    notesAsignatures.push({ assessment: "-", academicPeriodId: period?.id?.toString(), performanceLevel: "-", "asignatureId": academicAsignature?.id?.toString(), "areaId": academicArea?.id?.toString(), "teacher": teacherUserAsignatureCourse?.name + " " + teacherUserAsignatureCourse?.lastName })
                  }
                }
              }
              notesAsignatures.push({ assessment: "-", academicPeriodId: "FINAL", performanceLevel: "-", "asignatureId": academicAsignature?.id?.toString(), "areaId": academicArea?.id?.toString(), "teacher": teacherUserAsignatureCourse?.name + " " + teacherUserAsignatureCourse?.lastName })
            }
            let notesAreas = [];
            for (let area of areas) {
              for (let period of academicPeriods) {
                if (period?.order && academicPeriod?.order) {
                  if (period?.order <= academicPeriod?.order) {
                    let notesArea = await this.repositoryAcademicAreaCoursePeriodValuation.findBy({
                      academicAreaId: area?.id?.toString(),
                      academicPeriodId: period?.id?.toString(),
                      studentId
                    });
                    if (notesArea?.length == 1) {
                      let performanceLevel = await this.repositoryPerformanceLevel.findOneBy(notesArea[0]?.performanceLevelId);
                      notesAreas.push({ assessment: notesArea[0]?.assessment?.toFixed(2), academicPeriodId: notesArea[0]?.academicPeriodId, performanceLevel: performanceLevel?.name, "areaId": area?.id?.toString() })
                    } else {
                      notesAreas.push({ assessment: "-", academicPeriodId: period?.id?.toString(), performanceLevel: "-", "areaId": area?.id?.toString() })
                    }
                  } else {
                    notesAreas.push({ assessment: "-", academicPeriodId: period?.id?.toString(), performanceLevel: "-", "areaId": area?.id?.toString() })
                  }
                }
              }
              notesAreas.push({ assessment: "-", academicPeriodId: "FINAL", performanceLevel: "-", "areaId": area?.id?.toString() })
            }
            //console.log(notesAreas)
            dataPDF = { ...dataPDF, "notesAsignatures": notesAsignatures };
            dataPDF = { ...dataPDF, "notesAreas": notesAreas };
            promisesGeneratePDF.push(
              this.generatePerformanceReportStudent(dataPDF, studentId, format).then((dataUrl) => {
                urls.push(dataUrl);
              })
            );
          }
          let urlsReturn = await Promise.all(promisesGeneratePDF).then(() => {
            if (urls?.length > 1) {
              const merge = require('easy-pdf-merge');
              const opts = {
                maxBuffer: 1024 * 5096, // 500kb
                maxHeap: '2g' // for setting JVM heap limits to 2GB
              };
              //console.log(urls);
              var dir = './public/downloads/reports/courses/' + id;
              const fs = require("fs-extra");
              if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
              }
              merge(urls, dir + '/' + id + '.pdf', opts, function (err: any) {
                if (err) {
                  return console.log(err)
                }
                console.log('Successfully merged!')
                return dir + '/' + id + '.pdf';
              });

            } else {
              return urls[0];
            }
          });
          return urlsReturn + "";
        }
      }
    }
  }

  async generatePerformanceReportStudent(data: any, id: any, format: any) {
    const puppeteer = require("puppeteer");
    const fs = require("fs-extra");
    const hbs = require("handlebars");
    const path = require("path");
    try {
      hbs.registerHelper(`iff`, (a: number, operator: any, b: number, opts: { fn: (arg0: any) => any; inverse: (arg0: any) => any; }) => {
        let bool = false;
        a?.toString();
        b?.toString();
        //console.log(a, b)
        switch (operator) {
          case `===`:
            bool = a === b;
            break;
          case `>`:
            bool = a > b;
            break;
          case `<`:
            bool = a < b;
            break;
          default:
            bool = a === b;
        }

        if (bool) {
          return opts.fn(this);
        }
        return opts.inverse(this);
      });
      const browser = await puppeteer.launch({
        args: ['--no-sandbox']
      });
      const page = await browser.newPage();
      //console.log(data)
      const content = await this.compile('index', data);
      //console.log(content)
      await page.setContent(content);
      var dir = './public/downloads/reports/students/' + id;
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      await page.pdf({
        path: dir + '/' + id + '.pdf',
        format: format,
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
          bottom: "0",
          left: "0",
          right: "0",
          top: "0",
        },
        //displayHeaderFooter: true,
        //footerTemplate: '<style>@font-face{font-family:Mina;src:url(/mina/Mina-Regular.woff2) format("woff2"),url(/mina/Mina-Regular.woff) format("woff"),url(/mina/Mina-Regular.ttf) format("truetype");font-weight:400;font-style:normal}@font-face{font-family:Mina;src:url(/mina/Mina-Bold.woff2) format("woff2"),url(/mina/Mina-Bold.woff) format("woff"),url(/mina/Mina-Bold.ttf) format("truetype");font-weight:700;font-style:normal}h1,h2,h3,h4,h5,h6,p,span{font-family:Mina,sans-serif}</style><div style="font-size:10px!important;color:grey!important;padding-left:400px;" class="pdfheader"><span>Pagina: </span><span class="pageNumber"></span>/<span class="totalPages"></span></div>',
      });
      //console.log("done creating pdf");
      await browser.close();
      return dir + '/' + id + '.pdf';
      //process.exit();
    } catch (e) {
      console.log(e);
      return "";
    }
  }



  @Mutation(() => Boolean)
  async generatePerformanceLevelExample2(
    @Arg('id', () => String) id: string,
    @Ctx() context: IContext
  ): Promise<Boolean | null> {
    const puppeteer = require("puppeteer");
    const fs = require("fs-extra");
    const hbs = require("handlebars");
    const path = require("path");
    const data = require('../../../reports/performanceReport/data.json');
    try {
      const browser = await puppeteer.launch({
        args: ['--no-sandbox']
      });
      const page = await browser.newPage();
      //console.log(data)
      const content = await this.compile('index', data);
      //console.log(content)
      await page.setContent(content);
      await page.pdf({
        path: 'output.pdf',
        format: 'A4',
        printBackground: true,
        margin: {
          bottom: "10mm",
          left: "10mm",
          right: "10mm",
          top: "10mm",
        },
      })
      //console.log("done creating pdf");
      await browser.close();
      //process.exit();
    } catch (e) {
      console.log(e);
    }
    return true;
  }

  async compile(templateName: any, data: any) {
    //console.log(data)
    const path = require("path");
    const fs = require("fs-extra");
    const hbs = require("handlebars");
    const filePath = path.join(process.cwd(), 'app', 'reports', 'performanceReport', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf8');
    //console.log(html)
    return hbs.compile(html)(data);
  };

  compareOrderAcademicArea(a: any, b: any) {
    if (a?.order > b?.order) {
      return -1;
    }
    if (a?.order < b?.order) {
      return 1;
    }
    return 0;
  }

}