import { Arg, Mutation, Resolver } from 'type-graphql';
import { InjectRepository } from 'typeorm-typedi-extensions';

import { ModalityRepository, SchoolRepository, SchoolYearRepository, SpecialtyRepository, UserRepository } from '../../../servers/DataSource';
import { School } from '../../models/GeneralAdministrator/School';
import { User } from '../../models/GeneralAdministrator/User';
import { Modality } from '../../models/SchoolAdministrator/Modality';
import { SchoolYear } from '../../models/SchoolAdministrator/SchoolYear';
import { Specialty } from '../../models/SchoolAdministrator/Specialty';

@Resolver(School)
export class ImportDataSchoolResolver {
  @InjectRepository(Specialty)
  private repository = SpecialtyRepository;

  @InjectRepository(User)
  private repositoryUser = UserRepository;

  @InjectRepository(Modality)
  private repositoryModality = ModalityRepository;

  @InjectRepository(School)
  private repositorySchool = SchoolRepository;

  @InjectRepository(SchoolYear)
  private repositorySchoolYear = SchoolYearRepository;


  @Mutation(() => Boolean)
  async importDataSchoolInactive(
    @Arg('schoolId', () => String) schoolId: String
  ) {
    let dataSchoolYear = await this.repositorySchoolYear.findBy({ where: { schoolId: schoolId } })

    return true;
  }

}
