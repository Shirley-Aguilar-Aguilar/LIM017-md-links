const {
  getStatusCode,
  getTextFileHref, searchFilesOrDirectory, getPropertiesOfObject,
  validityStatusCode, getLinks,
  getStatsUniqueBroken, getStatsUnique,
} = require("../src/methods");
const path = require("path");

jest.mock("chalk", () => ({
  green: jest.fn(() => "green"),
  yellow: jest.fn(() => "yellow"),
  red: jest.fn(() => "red"),
  yellowBright: jest.fn(() => "yellowBright"),
  blue: jest.fn(() => "blue"),
  bgRed: jest.fn(() => "bgRed"),
  bold: {
    redBright: jest.fn(() => "redBright"),
    magenta: jest.fn(() => "magenta"),
  },
}));

describe("searchFilesOrDirectory", () => {
  it("if pathUser is a file return a file markdown", () => {
    const rutaAbsoluta = path.resolve("examples/readme1.md");
    expect(searchFilesOrDirectory(rutaAbsoluta, [])).toEqual([rutaAbsoluta]);
  });
  it("if pathUSer is a folder return a array's file markdown", () => {
    const rutaAbsoluta = path.resolve("examples");
    expect(searchFilesOrDirectory(rutaAbsoluta, [])[0]).toBe(rutaAbsoluta+"\\folder\\directory1\\readme5.md");
  });
});

describe("getTextFileHref", () => {
  it("Return an object array with file, href and text(text with less a 50 characters)", () => {
    const rutaAbsoluta = path.resolve("./examples/folder/directory1/readme6.md");
    const arrayFiles = [
      rutaAbsoluta,
    ];
    expect(getTextFileHref(arrayFiles)).toEqual([{
      file: rutaAbsoluta,
      href: "https://docs.npmjs.com/cli/install/shirley",
      text: "docs oficiales de npm install (más de 50 caractere",
    }, {
      file: rutaAbsoluta,
      href: "https://github.com/Laboratoria/course-parser",
      text: "`course-parser`",
    }]);
  });
});

describe("getStatusCode", () => {
  it("Return a number of status code", () => {
    const link = "https://es.wikipedia.org/wiki/Markdown";
    getStatusCode(link).then((n) => {
      expect(n).toBe(200);
    });
  });
  it("Return status code (https's protocol)", () => {
    const link = "https://es.wikipedia.org/wiki/Markdown";
    return expect(getStatusCode(link)).resolves.toBe(200);
  });
  it("Return status code(http's protocol)", () => {
    const link = "http://es.wikipedia.org/wiki";
    return expect(getStatusCode(link)).resolves.toBe(301);
  });
  it("Return a message when request fail (https's protocol)", () => {
    const link = "https://fakecccaa1.com";
    return expect(getStatusCode(link)).resolves.toBe("problem with request: getaddrinfo ENOTFOUND fakecccaa1.com on the link (https://fakecccaa1.com)");
  });
  it("Return a message when request fail (http's protocol)", () => {
    const link = "http://fakecccaa1.com";
    return expect(getStatusCode(link)).resolves.toBe("problem with request: getaddrinfo ENOTFOUND fakecccaa1.com on the link(http://fakecccaa1.com)");
  });
  it("Return a message when protocol is not http or https", () => {
    const link = "ftp://fakecccaa1.com";
    return expect(getStatusCode(link)).resolves.toBe("problem with request: this protocol's link ftp://fakecccaa1.com is not http or https");
  });
});

describe("validityStatusCode", () => {
  it("Return Ok due to a valid number", () => {
    expect(validityStatusCode(200)).toBe("Ok");
    expect(validityStatusCode(301)).toBe("Ok");
    expect(validityStatusCode(302)).toBe("Ok");
  });
  it("Return Fail due to a invalid number", () => {
    expect(validityStatusCode(404)).toBe("Fail");
  });
});

describe("getPropertiesOfObject", () => {
  it("Return an object array (file,href,text) when option is false", () => {
    const rutaAbsoluta = path.resolve("./examples/folder/directory1/readme6.md");
    const optionTrueFalse = { validate: false };
    return expect(getPropertiesOfObject(rutaAbsoluta, optionTrueFalse)).resolves.toEqual([{
      file: rutaAbsoluta,
      href: "https://docs.npmjs.com/cli/install/shirley",
      text: "docs oficiales de npm install (más de 50 caractere",
    }, {
      file: rutaAbsoluta,
      href: "https://github.com/Laboratoria/course-parser",
      text: "`course-parser`",
    }]);
  });
  it("Return an object array (file,href,text,statusCode,status) when option is true", () => {
    const rutaAbsoluta = path.resolve("./examples/folder/directory1/readme6.md");
    const optionTrueFalse = { validate: true };
    return expect(getPropertiesOfObject(rutaAbsoluta, optionTrueFalse)).resolves.toEqual([{
      file: rutaAbsoluta,
      href: "https://docs.npmjs.com/cli/install/shirley",
      text: "docs oficiales de npm install (más de 50 caractere",
      statusCode: 404,
      status: "Fail",
    }, {
      file: rutaAbsoluta,
      href: "https://github.com/Laboratoria/course-parser",
      text: "`course-parser`",
      statusCode: 301,
      status: "Ok",
    }]);
  });
});

describe("getLinks", () => {
  it("Return a number of unique link", () => {
    const arrayObject = [
      { href: "https://developers.google.com/v8/" },
      { href: "https://developers.google.com/v8/" },
      { href: "https://docs.npmjs.com/cli/install/" }];
    expect(getLinks(arrayObject)).toBe(2);
  });
});

describe("getStatsUniqueBroken", () => {
  it("Return an object array with data total and unique and broken", () => {
    const arrayObject = [{
      file: "C:\\Users\\shirl\\Desktop\\md-link\\LIM017-md-links\\examples\\folder/directory1/readme6.md",
      href: "https://docs.npmjs.com/cli/install/shirley",
      text: "docs oficiales de `npm install` acá",
      status: "Fail",
    }, {
      file: "C:\\Users\\shirl\\Desktop\\md-link\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md",
      href: "https://github.com/Laboratoria/course-parser",
      text: "`course-parser`",
      statusCode: 301,
      status: "Ok",
    }];
    expect(getStatsUniqueBroken(arrayObject)).toEqual([{ Unique: 2, total: 2, Broquen: 1 }]);
  });
});

describe("getStatsUnique", () => {
  it("Return an object array with data total and unique", () => {
    const arrayObject = [{
      file: "C:\\Users\\shirl\\Desktop\\md-link\\LIM017-md-links\\examples\\folder/readme4.md",
      href: "https://developers.google.com/v8/",
      text: "motor de JavaScript V8 de Chrome",
    }];
    expect(getStatsUnique(arrayObject)).toEqual([{ Unique: 1, total: 1 }]);
  });
});
