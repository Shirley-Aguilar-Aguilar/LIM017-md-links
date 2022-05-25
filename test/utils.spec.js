// jest.mock('../utils.js')

const {
    printObject,
    printStatAndValidate,
  } = require("../utils");

  jest.mock("chalk", () => ({
    green: jest.fn(( ) => "green") ,
    yellow:jest.fn(( ) => "yellow"),
    red: jest.fn(( ) => "red"),
    yellowBright: jest.fn(( ) => "yellowBright"),
    blue: jest.fn(( ) => "blue"),
    bgRed: jest.fn(( ) => "bgRed"),
    bold: {
      redBright: jest.fn(( ) => "redBright") ,
      magenta:jest.fn(( ) => "magenta") ,
  }
  }));

  describe("printObject", () => {
    it("Return a number of status code", () => {
        const arrayObject = [
            {
              file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md\n',
              href: 'https://docs.npmjs.com/cli/install/shirley',
              text: 'docs oficiales de npm install acá más de 50 line',
              statusCode: 404,
              status: 'Fail'
            },
          ];
          const result = `*File:green Href:yellow Text:blue Status:redBright StatusCode:yellowBright\n`;
          expect(printObject(arrayObject)).toBe(result);
      });
      it("Return a number of status code", () => {
        const arrayObject = [
          {
            file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
            href: 'https://github.com/Laboratoria/course-parser',
            text: 'course-parser',
            statusCode: 301,
            status: 'Ok'
          }
          ];
          const result = `*File:green Href:yellow Text:blue Status:magenta StatusCode:yellowBright\n`;
          expect(printObject(arrayObject)).toBe(result);
      });
  });

  describe("printStatAndValidate", () => {
    it("hhh", () => {
      const arrayObject = [
        {
          file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
          href: 'https://github.com/Laboratoria/course-parser',
          text: 'course-parser',
          statusCode: 301,
          status: 'Ok'
        }
        ];
        const result = `
    --------------------
       bgRed : yellowBright 
       bgRed : yellowBright
       bgRed : yellowBright
    --------------------
    `;
        expect(printStatAndValidate(arrayObject)).toBe(result);
    })
  })
