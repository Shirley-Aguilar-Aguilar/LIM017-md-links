// jest.mock('../utils.js')

const {
    printObject,
    printObjectFalse,
    printObjectStats,
    printStatAndValidate,
  } = require("../utils");
  const chalk = require("chalk");


  describe("printObject", () => {
    it("Return a number of status code", () => {
        const arrayObject = [
            {
              file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
              href: 'https://docs.npmjs.com/cli/install/shirley',
              text: 'docs oficiales de npm install acá más de 50 line',
              statusCode: 404,
              status: 'Fail'
            },
          ];
          const result = `*File:${chalk.green("C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md")} Href:${chalk.yellow("https://docs.npmjs.com/cli/install/shirley")} Text:${chalk.blue("docs oficiales de npm install acá más de 50 line")} Status:${chalk.bold.redBright("Fail")} StatusCode:${chalk.yellowBright(404)}\n`;
          expect(printObject(arrayObject)).toStrictEqual(result);
      });
      it("Return a number of status code", () => {
        const arrayObject = [
          {
            file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
            href: 'https://github.com/Laboratoria/course-parser',
            text: '`course-parser`',
            statusCode: 301,
            status: 'Ok'
          }
          ];
          const result = `*File:${chalk.green("C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md")} Href:${chalk.yellow("https://github.com/Laboratoria/course-parser")} Text:${chalk.blue("`course-parser`")} Status:${chalk.bold.magenta("Ok")} StatusCode:${chalk.yellowBright(301)}\n`;
          expect(printObject(arrayObject)).toStrictEqual(result);
      });
  });

/*   describe("printStatAndValidate", () => {
    it("Return a number of status code", () => {
        const arrayObject = [
            {
              file: "C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md",
              href: "https://docs.npmjs.com/cli/install/shirley",
              text: "docs oficiales de npm install acá más de 50 line",
              statusCode: 404,
              status: "Fail"
            },
          ];
        const properties = [`
    --------------------
       ${chalk.bgRed('**Total   ')} : ${chalk.yellowBright(1)} 
       ${chalk.bgRed('**Unique  ')} : ${ chalk.yellowBright(1)}
       ${chalk.bgRed('**Broquen ')} : ${ chalk.yellowBright(1)}
    --------------------
        `];
          expect(printStatAndValidate(arrayObject)).toStrictEqual(properties.join(""));
      });
  }) */



/*   describe("printObject", () => {
    it("Return a number of status code", () => {
        const arrayObject = [
            {
              file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
              href: 'https://docs.npmjs.com/cli/install/shirley',
              text: 'docs oficiales de npm install acá más de 50 line',
              statusCode: 404,
              status: 'Fail'
            },
          ];
          const result = `*File:C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md Href:https://docs.npmjs.com/cli/install/shirley Text:docs oficiales de npm install acá más de 50 line Status:${"Fail"} StatusCode:${404}`;
          expect(printObject(arrayObject)).toEqual(result);
      });
  })

  describe("printObjectFalse", () => {
    it("Return a number of status code", () => {
        const arrayObject = [
            {
              file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
              href: 'https://docs.npmjs.com/cli/install/shirley',
              text: 'docs oficiales de `npm install` acá más de 50 line',
              statusCode: 404,
              status: 'Fail'
            },
          ];
          expect(printObjectFalse(arrayObject)).toBe(true);
      });
  })


  describe("printObjectStats", () => {
    it("Return a number of status code", () => {
        const arrayObject = [
            {
              file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
              href: 'https://docs.npmjs.com/cli/install/shirley',
              text: 'docs oficiales de `npm install` acá más de 50 line',
            },
          ];
          expect(printObjectStats(arrayObject)).toBe(true);
      });
  })

  describe("printStatAndValidate", () => {
    it("Return a number of status code", () => {
        const arrayObject = [
            {
              Total: 1,
              Unique: 1,
              Broquen: 1,
            },
          ];
          expect(printStatAndValidate(arrayObject)).toBe(true);
      });
  })
 */