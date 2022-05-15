#!/usr/bin/env node
const path = require("node:path");
const fs = require("node:fs");

const inputUser = process.argv.slice(2);
const optionUser = inputUser[0];
const routeUser = inputUser[1];
const existRoute = (route) => fs.existsSync(route);
const itsDirectory = (route) => fs.statSync(route).isDirectory();
const itsFile = (route) => fs.statSync(route).isFile();
const pathToAbsolute = (paths) => path.resolve(paths);
const readFile = (file) => fs.readFileSync(file, "utf-8");//
const readDirectory = (directory) => fs.readdirSync(directory); // array
const verifyMdFile = (file) => path.extname(file) === ".md";
const readLinks = (route) => fs.readlinkSync(route);

// saca todos los archivos md // continua searchLinks

const searchFilesOrDirectory = (pathAbs, allArrayFilesMd) => {
  if (itsDirectory(pathAbs)) {
    const content = readDirectory(pathAbs);
    content.forEach((fileOrDir) => {
      const newPath = `${pathAbs}\\${fileOrDir}`;
      if ((itsFile(newPath)) && (verifyMdFile(newPath))) {
        allArrayFilesMd.push(newPath);
      } else {
        searchFilesOrDirectory(newPath, allArrayFilesMd);
      }
    });
  } else if ((itsFile(pathAbs)) && (verifyMdFile(pathAbs))) {
    allArrayFilesMd.push(pathAbs);
  }
  return allArrayFilesMd;
};

// validación existencia y transformación a absoluta
const getFilesIfRouteExistOrExit = (route) => {
  let ABSOLUTE_PATH;
  const arrayOfFiles = [];
  if (existRoute(route)) {
    ABSOLUTE_PATH = pathToAbsolute(route);
    searchFilesOrDirectory(ABSOLUTE_PATH, arrayOfFiles);
  } else {
    console.log("Sorry, this route does not exist.");
  }
  return arrayOfFiles;
};
// funcion para leer contenido de un archivo
const readFileContent = (route) => new Promise((resolve, reject) => {
  readFile(route, "UTF-8", (error, data) => {
    if (error) {
      const message = "No se puede leer el archivo suministrado";
      reject(message);
    } else {
      console.log(data+'-->contenido linea 56');
      resolve(data);
    }
  });
});

// recursividad de buscar links// retorna todos los links
const getLinks = (arrayFiles) => new Promise((resolve, reject) => {
  const regxLink = /\[([\w\s\d.()]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
  const regxUrl = /\(((?:\/|https?:\/\/)[\w\d./?=#&_%~,.:-]+)\)/mg;
  const regxText = /\[[\w\s\d.()]+\]/;

  arrayFiles.forEach((onlyRouteFile) => {
    console.log(readFile(onlyRouteFile));
    readFileContent(onlyRouteFile)
    .then((content) => {
      console.log(data+'-->contenido linea 72');
    })
    .catch((message) => {
     console.error(message)
    })
  });


  /* readFileContent(pathMd)
    .then((fileContent) => {
      const linksArray = fileContent.match(regxLink); // revisa content archivo para capturar links

      if (linksArray === null) { // si no hay links en archivo retorna []
        resolve([]);
      }

      const turnedLinksArray = linksArray.map((myLinks) => { // transforma arr links y entrega objt
        const myhref = myLinks.match(regxUrl).join().slice(1, -1); // URL encontradas
        const mytext = myLinks.match(regxText).join().slice(1, -1); // texto que hace ref a URL
        return {
          href: myhref,
          text: mytext.substring(0, 50),
          fileName: path.basename(pathMd), // ruta de URL
        };
      });
      resolve(turnedLinksArray);
    })
    .catch((error) => {
      reject(error);
    });*/
}); 

/* arrayFiles.forEach((onlyFile) => {
  console.log(readFile(onlyFile))
  const text = readFile(onlyFile);
  // readLinks(text);
  // console.log(readLinks(text));
  console.log(readLinks(onlyFile));
});
 */

const processUserInput = (route, option) => {
  let arrayFilesMD = [];
  let result;
  switch (option) {
    case "--validateAndStats":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      getLinks(arrayFilesMD);
      break;
    case "--validate":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      console.log(arrayFilesMD);
      getLinks(arrayFilesMD);
      break;
    case "--stats":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      getLinks(arrayFilesMD);
      break;
    case "--filesMD":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      console.log(arrayFilesMD);
      break;
    default:
      console.log("Sorry, this option does not exist.");
      result = "Sorry, this option does not exist.";
  }
  return result;
};

processUserInput(routeUser, optionUser);

const mdlinks = (route, options) => { // retorna promesaaaaaaaaaaaaa

};

// --validate href text  file status ok
// --stats total unique
// --stats --validate  total,unique,broken

// const path = 'C:\Users\ruben\Desktop\MD_LINKS\LIM017-md-links\examples\readme1.md';
// const path = './examples/readme1.md;
// const path = 'C:\Users\ruben\Desktop\MD_LINKS\LIM017-md-links\examples\readme1/x';
// const path = './examples/readme/readme1.md;

module.exports = {
  processUserInput, getFilesIfRouteExistOrExit, searchFilesOrDirectory,
};
