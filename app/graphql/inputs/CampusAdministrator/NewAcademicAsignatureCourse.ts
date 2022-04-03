import { Field, InputType } from 'type-graphql';
import { AcademicAsignatureCourse } from '../../models/CampusAdministrator/AcademicAsignatureCourse';

@InputType()
export class NewAcademicAsignatureCourse implements Partial<AcademicAsignatureCourse> {
    @Field({ nullable: true })
    campusId?: string;

    @Field({ nullable: true })
    academicAsignatureId?: string;

    @Field({ nullable: true })
    courseId?: string;

    @Field({ nullable: true })
    weight?: number;

    @Field({ nullable: true })
    teacherId?: string;
}