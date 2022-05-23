const {
    printObject,
    printObjectFalse,
    printObjectStats,
  } = require("../utils");

  describe("printObject", () => {
    it("Return a number of status code", () => {
        const arrayObject = [
            {
              file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
              href: 'https://docs.npmjs.com/cli/install/shirley',
              text: 'docs oficiales de `npm install` acá más de 50 line',
              statusCode: 404,
              status: 'Fail'
            },
            {
              file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
              href: 'https://github.com/Laboratoria/course-parser',
              text: '`course-parser`',
              statusCode: 301,
              status: 'Ok'
            }
          ];
          expect(printObject(arrayObject)).toBe(undefined);
      });

  })

/*   describe("getTrueOrFalse", () => {
    it("Return a number of status code", () => {
        const input = ["--validate", undefined];
          expect(getTrueOrFalse(input)).toBe(true);
      });

  })
 */