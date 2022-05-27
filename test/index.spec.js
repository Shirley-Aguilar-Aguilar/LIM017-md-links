// jest.mock('../utils.js')
const {
  mdLinks,
  getExistOption,
  cliFunction,
} = require("../src/index");

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

describe("mdLinks", () => {
  it("Return a array object (href,text,file,statusCode, status)", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const validate = ["--validate", "--stats"];
    const result = [{
      file: "C:\\Users\\ruben\\Desktop\\md-link\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md",
      href: "https://docs.npmjs.com/cli/install/shirley",
      text: "docs oficiales de npm install (más de 50 caractere",
      statusCode: 404,
      status: "Fail",
    }, {
      file: "C:\\Users\\ruben\\Desktop\\md-link\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md",
      href: "https://github.com/Laboratoria/course-parser",
      text: "`course-parser`",
      statusCode: 301,
      status: "Ok",
    }];
    mdLinks(route, { validate: validate.includes("--validate") }).then((arrayObject) => {
      expect(arrayObject).toEqual(result);
    });
  });
  it("Return a array object (href,text,file)", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = { validate: false };
    const result = [{
      file: "C:\\Users\\ruben\\Desktop\\md-link\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md",
      href: "https://docs.npmjs.com/cli/install/shirley",
      text: "docs oficiales de npm install (más de 50 caractere",
    }, {
      file: "C:\\Users\\ruben\\Desktop\\md-link\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md",
      href: "https://github.com/Laboratoria/course-parser",
      text: "`course-parser`",
    }];
    mdLinks(route, option).then((arrayObject) => {
      expect(arrayObject).toEqual(result);
    });
  });
});

describe("cliFunction", () => {
  it("Return a message if the option is not valid", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = ["--sta", undefined];
    expect(cliFunction(route, option)).toBe("Sorry, this option does not exist.");
  });
  it("Return a message if the route is not valid", () => {
    const route = "./examples/folder/directory1/readme";
    const option = ["--stats", undefined];
    expect(cliFunction(route, option)).toBe("Sorry, this route does not exist.");
  });
  it("Return route processed if stats were displayed", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = [undefined];
    expect(cliFunction(route, option)).toBe("route processed");
  });
  it("Return route processed if stats were displayed", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = ["--stats", undefined];
    expect(cliFunction(route, option)).toBe("route processed");
  });
  it("Return route processed if stats were displayed", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = ["--validate", undefined];
    expect(cliFunction(route, option)).toBe("route processed");
  });
  it("Return route processed if stats were displayed", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = ["--validate", "--stats"];
    expect(cliFunction(route, option)).toBe("route processed");
  });
  it("Return route processed if stats were displayed", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const option = ["--validate", undefined];
    expect(cliFunction(route, option)).toBe("route processed");
  });
});

describe("getExistOption", () => {
  it("Return true if comand exist", () => {
    const input = ["--validate", undefined];
    expect(getExistOption(input)).toBe(true);
  });
  it("Return true if comand exist", () => {
    const input = ["--validate", "--stats"];
    expect(getExistOption(input)).toBe(true);
  });
  it("Return false if comand exist", () => {
    const input = ["--stats", undefined];
    expect(getExistOption(input)).toBe(false);
  });
  it("Return false if comand exist", () => {
    const input = [undefined];
    expect(getExistOption(input)).toBe(false);
  });
  it("Return inexistente if comand is not exist", () => {
    const input = ["-stat", undefined];
    expect(getExistOption(input)).toBe("inexistente");
  });
  it("Return inexistente if comand is not exist", () => {
    const input = ["-cmdno", "noexist"];
    expect(getExistOption(input)).toBe("inexistente");
  });
});
