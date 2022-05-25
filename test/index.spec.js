// jest.mock('../utils.js')
const {
    mdLinks,
    validateRoute,
    getExistOption,
    cliFunction,
  } = require("../index");

  const {
    getPropertiesOfObject,
  } = require("../methods");
  const {
    getStatsUniqueBroken,
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
describe("mdLinks", () => {
  it("G", () => {
    const route = "./examples/folder/directory1/readme6.md"
    const option = { validate : true};
    const result = [
      {
        file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
        href: 'https://docs.npmjs.com/cli/install/shirley',
        text: 'docs oficiales de npm install (más de 50 caractere',
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
   mdLinks(route, option).then((arrayObject) =>
   expect(arrayObject).toEqual(result)
   )
  })
  it("G", () => {
    const route = "./examples/folder/directory1/readme6.md"
    const option = { validate : false}
    const result = [
      {
        file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
        href: 'https://docs.npmjs.com/cli/install/shirley',
        text: 'docs oficiales de npm install (más de 50 caractere',
      },
      {
        file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
        href: 'https://github.com/Laboratoria/course-parser',
        text: '`course-parser`',
      }
    ];
    mdLinks(route, option).then((arrayObject) =>
    expect(arrayObject).toEqual(result)
    )

  })
});

describe("cliFunction", () => {
  it("return a message if the option is not valid", () => {
    const route = "./examples/folder/directory1/readme6.md"
    const option = ["--sta", undefined]
    expect(cliFunction(route, option)).toBe("Sorry, this option does not exist.");
  });
  it("return a message if the route is not valid", () => {
    const route = "./examples/folder/directory1/readme"
    const option = ["--stats", undefined]
    expect(cliFunction(route, option)).toBe("Sorry, this route does not exist.");
  });
  it("oh2", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = [undefined];
    expect(cliFunction(route, option)).toBe("route processed");
  })
  it("oh2", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = ["--stats", undefined];
    expect(cliFunction(route, option)).toBe("route processed");
  })
  it("oh2", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = ["--validate", undefined];
    expect(cliFunction(route, option)).toBe("route processed");
  })
  it("oh2", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = ["--validate", "--stats"];
    expect(cliFunction(route, option)).toBe("route processed");
  })
  it("oh2", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = ["--validate", undefined];
    expect(cliFunction(route, option)).toBe("route processed");
  })
})

describe("getExistOption", () => {
    it("Return a booleano true if comand exist", () => {
        const input = ["--validate", undefined];
          expect(getExistOption(input)).toBe(true);
      });
      it("Return a booleano true if comand exist", () => {
        const input = ["--validate", "--stats" ];
          expect(getExistOption(input)).toBe(true);
      })
      it("Return a booleano false if comand exist", () => {
        const input = ["--stats", undefined];
          expect(getExistOption(input)).toBe(false);
      });
      it("Return a booleano false if comand exist", () => {
        const input = [undefined];
          expect(getExistOption(input)).toBe(false);
      });
      it("Return inexistente if comand is not exist", () => {
        const input = ["-stat",undefined];
          expect(getExistOption(input)).toBe("inexistente");
      });
      it("Return inexistente if comand is not exist", () => {
        const input = ["-cmdno", "noexist"];
          expect(getExistOption(input)).toBe("inexistente");
      });
  })

/* describe("mdLinks", () => {
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

    it("fffvvv", () => {
        const route = "./examples/folder/directory1/readme6";
        const option = true;
        const input = ["--validate", "--stats" ]
    expect( mdLinks(route, option, input)).reject.toEqual(console.error("Sorry, this route does not exist."));
});
});
 */