const {
  /* processUserInput, getFilesIfRouteExistOrExit, searchFilesOrDirectory, */
} = require("../index");



/* describe("searchFilesOrDirectory", () => {
  it("función retorna en un array el archivo", () => {
    const pathUser = "C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\readme1.md";
    expect(searchFilesOrDirectory(pathUser, [])).toEqual(["C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\readme1.md"]);
  });
  it("función retorna un array de una carpeta", () => {
    const pathUser = "C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1";
    expect(searchFilesOrDirectory(pathUser, [])[0]).toBe("C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme5.md");
  });
  it("función retorna un array de una carpeta anidada", () => {
    const pathUser = "C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder";
    expect(searchFilesOrDirectory(pathUser, [])[0]).toBe("C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme5.md");
  });
});

describe("getFilesIfRouteExistOrExit", () => {
  it("función retorna un array de los archivos con extensión md", () => {
    const pathUser = "./examples/readme1.md";
    expect(getFilesIfRouteExistOrExit(pathUser)).toEqual(["C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\readme1.md"]);
  });
  it("función retorna un array vacio si la ruta no existe", () => {
    const pathUser = "./examples/readm.md";
    expect(getFilesIfRouteExistOrExit(pathUser)).toEqual([]);
  });
});

describe("processUserInput", () => {
  it("función retorna un mensaje de error cuando la opción es inválida", () => {
    const routeUser = "./examples/readme1.md";
    const optionUser = "--validat";
    expect(processUserInput(routeUser, optionUser)).toBe("Sorry, this option does not exist.");
  });
/*   it("función retorna un array vacio si la ruta no existe", () => {
    const pathUser = "./examples/readm.md";
    expect(processUserInput(routeUser, optionUser)).toEqual([]);
  }); */
});
 */