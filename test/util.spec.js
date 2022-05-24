const {
    printObject,
    printObjectFalse,
    printObjectStats,
    printStatAndValidate,
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
          ];
          expect(printObject(arrayObject)).toBe(true);
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
