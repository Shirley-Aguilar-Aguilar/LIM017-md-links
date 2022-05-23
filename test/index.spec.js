const {
    mdLinks,
    validateRoute,
    getTrueOrFalse,
  } = require("../index");

  const {
    getPropertiesOfObject,
  } = require("../methods");

  describe("getTrueOrFalse", () => {
    it("Return a number of status code", () => {
        const input = ["--validate", undefined];
          expect(getTrueOrFalse(input)).toBe(true);
      });
      it("Return a number of status code", () => {
        const input = ["--validate", "--stats" ];
          expect(getTrueOrFalse(input)).toBe(true);
      });
      it("Return a number of status code", () => {
        const input = ["{validate:true}"];
          expect(getTrueOrFalse(input)).toBe(true);
      });
      it("Return a number of status code", () => {
        const input = ["--stats", undefined];
          expect(getTrueOrFalse(input)).toBe(false);
      });
      it("Return a number of status code", () => {
        const input = [undefined];
          expect(getTrueOrFalse(input)).toBe(false);
      });
      it("Return a number of status code", () => {
        const input = ["-stat",undefined];
          expect(getTrueOrFalse(input)).toBe("inexistente");
      });
      it("Return a number of status code", () => {
        const input = ["-cmdno", "noexist"];
          expect(getTrueOrFalse(input)).toBe("inexistente");
      });
  })

describe("mdLinks", () => {
    it("fff", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const option = true;
        const input = ["--validate", undefined]
    expect( mdLinks(route, option, input)).resolves.toEqual([
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
      ]);
    })
    it("fffvvv", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const option = true;
        const input = ["--validate", "--stats" ]
    expect( mdLinks(route, option, input)).resolves.toEqual([
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
      ]);
    })
    it("fffvvv", () => {
        const route = "./examples/folder/directory1/readme6.md";
        const option = true;
        const input = ["--validate", "--stats" ]
    expect( mdLinks(route, option, input)).resolves.toEqual(
    [
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
    ]  
    )});
});
