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
    // var html_to_pdf = require('html-pdf-node');
    // let options = { format: 'A4' };
    // // Example of options with args //
    // // let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] }
    // let file = { content: "<h1>Welcome to html-pdf-node</h1>" };
    // // or //
    // // let file = { url: "https://example.com" };
    // html_to_pdf.generatePdf(file, options).then((pdfBuffer: any) => {
    //   console.log("PDF Buffer:-", pdfBuffer);
    // });

    var fs = require('fs');
    var pdf = require('html-pdf');
    var html = fs.readFileSync('./app/reports/performanceReport/PerformanceReport.html', 'utf8');
    var options = { format: 'Letter' };

    pdf.create(html, options).toFile('./businesscard.pdf', function (err: any, res: any) {
      if (err) return console.log(err);
      console.log(res); // { filename: '/app/businesscard.pdf' }
    });

    return true;
  }

}