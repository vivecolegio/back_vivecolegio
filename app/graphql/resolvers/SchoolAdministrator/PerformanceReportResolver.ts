import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';

import { IContext } from '../../interfaces/IContext';
import { SchoolConfiguration } from '../../models/SchoolAdministrator/SchoolConfiguration';

@Resolver(SchoolConfiguration)
export class PerformanceReportResolver {

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

}