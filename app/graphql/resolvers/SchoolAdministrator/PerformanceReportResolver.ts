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
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      console.log(data)
      const content = await this.compile('index', data);
      console.log(content)
      await page.setContent(content);
      await page.pdf({
        path: 'output.pdf',
        format: 'A4',
        printBackground: true
      })
      console.log("done creating pdf");
      await browser.close();
      //process.exit();
    } catch (e) {
      console.log(e);
    }
    return true;
  }

  async compile(templateName: any, data: any) {
    const path = require("path");
    const fs = require("fs-extra");
    const hbs = require("handlebars");
    const filePath = path.join(process.cwd(), 'app', 'reports', 'performanceReport', `${templateName}.hbs`);
    const html = await fs.readFile(filePath, 'utf8');
    console.log(html)
    return hbs.compile(html)(data);
  };

}