const {
  getStatusCode,
  getTextFileHref, searchFilesOrDirectory,getPropertiesOfObject, 
  validityStatusCode, getLinks, 
  getStatsUniqueBroken, getStatsUnique,
} = require("../methods");





describe("searchFilesOrDirectory", () => {
  it("función retorna en un array el archivo", () => {
    const pathUser = "C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\readme1.md";
    expect(searchFilesOrDirectory(pathUser, [])).toEqual(["C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\readme1.md"]);
  });
  it("función retorna un array de una carpeta", () => {
    const pathUser = "C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples";
    expect(searchFilesOrDirectory(pathUser, [])[0]).toBe("C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples/folder/directory1/readme5.md");
  });
});

/* describe("getFilesIfRouteExistOrExit", () => {
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
  describe("getTextFileHref", () => {
    it("Return a object's array with file, href, text key(text with less a 50 characters)", () => {
      const arrayFiles = [
      'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder/directory1/readme6.md'
      ]
        expect(getTextFileHref(arrayFiles)).toEqual([{
        file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder/directory1/readme6.md',
        href: 'https://docs.npmjs.com/cli/install/shirley',
        text: 'docs oficiales de `npm install` acá más de 50 line'},
        {
        file: "C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder/directory1/readme6.md",  
        href: "https://github.com/Laboratoria/course-parser",
        text: "`course-parser`",}]);
    });
  });

  describe("getStatusCode", () => {
    it("Return a number of status code", () => {
      const link = "https://es.wikipedia.org/wiki/Markdown";
      getStatusCode(link).then((n) =>{
        expect(n).toBe(200);
      })
    });
    it("Return a error message of status code", () => {
      const link = "https://es.wikipedia.org/wiki/Markdown";
      getStatusCode(link).catch((error) =>{
        expect(error).toBe(console.log(error));
      })
    });
      it("Return a number with status code in order to return a resolve with https", () => {
        const link = "https://es.wikipedia.org/wiki/Markdown";
        return expect(getStatusCode(link)).resolves.toBe(200);
      });
      it("Return a number with status code in order to return a resolve with http", () => {
        const link = "http://es.wikipedia.org/wiki";
        return expect(getStatusCode(link)).resolves.toBe(301);
      });
    });
  
  /*   it("función retorna un array de una carpeta", () => {
      const pathUser = "C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1";
      expect(searchFilesOrDirectory(pathUser, [])[0]).toBe("C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme5.md");
    });
    it("función retorna un array de una carpeta anidada", () => {
      const pathUser = "C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder";
      expect(searchFilesOrDirectory(pathUser, [])[0]).toBe("C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme5.md");
    }); */


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
     it("Return a resolve with objects's array  with file,href and text when option is false", () => {
    const route = "./examples/folder/directory1/readme6.md";
    const optionTrueFalse = false;
    return expect(getPropertiesOfObject(route, optionTrueFalse)).resolves.toEqual([
      {
        file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
        href: 'https://docs.npmjs.com/cli/install/shirley',
        text: 'docs oficiales de `npm install` acá más de 50 line'
      },
      {
        file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder\\directory1\\readme6.md',
        href: 'https://github.com/Laboratoria/course-parser',
        text: '`course-parser`'
      }
    ]);
    });
    it("Return a resolve with objects's array  with file,href and text whwn option is true", () => {
      const route = "./examples/folder/directory1/readme6.md";
      const optionTrueFalse = true;
      return expect(getPropertiesOfObject(route, optionTrueFalse)).resolves.toEqual([
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
      });
  });


  describe("getLinks", () => {
    it("Return a number of unique link", () => {
      const arrayObject = [{
        href: 'https://developers.google.com/v8/',
      },
      {
        href: 'https://developers.google.com/v8/',
      },
      {
        href: 'https://docs.npmjs.com/cli/install/',
      }
    ]
        expect(getLinks(arrayObject)).toBe(2);
    });
  });


  describe("getStatsUniqueBroken", () => {
    it("Return a object's array with datas total and unique and broken", () => {
      const arrayObject = [{
        file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder/directory1/readme6.md',
        href: 'https://docs.npmjs.com/cli/install/shirley',
        text: 'docs oficiales de `npm install` acá',
        status: 'Fail'
      }]
        expect(getStatsUniqueBroken(arrayObject)).toEqual([{"Unique": 1, "total": 1, "Broquen": 1}]);
    });
  });

  describe("getStatsUnique", () => {
    it("Return a object's array with datas total and unique", () => {
      const arrayObject = [{
        file: 'C:\\Users\\ruben\\Desktop\\MD-LINKS\\LIM017-md-links\\examples\\folder/readme4.md',
        href: 'https://developers.google.com/v8/',
        text: 'motor de JavaScript V8 de Chrome'
      }]
     // getStatsUnique(arrayObject);
        expect(getStatsUnique(arrayObject)).toEqual([{"Unique": 1, "total": 1}]);
    });
  });