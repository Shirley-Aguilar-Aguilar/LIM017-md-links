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

// recursividad de buscar links// retorna todos los links
const searcLinksMd = (pathAbs) => {
  readFile(pathAbs);
  const arrayOfFilesMd = searchFilesOrDirectory();
  console.log(readFile(pathAbs));
  console.log("vvvvvdddddv");
};

// directorio= recursividad searchFilesOnDirectory retorna array de directorios
// archivo.md = recursividad de archivomdsearchLinks

// saca todos los archivos md // continua searchLinks

const searchFilesOrDirectory = (pathAbs, allArrayFilesMd) => {
  console.log(`pathAbs::: [${pathAbs}]`);
  console.log(`allArrayFilesMd::: [${allArrayFilesMd}]`);
  if (itsDirectory(pathAbs)) {
    const content = readDirectory(pathAbs);
    console.log(`content after readDirectory::: [${content}]`);
    content.forEach((fileOrDir) => {
    console.log(`fileOrDir callback::: [${fileOrDir}]`);
      const newPath = `${pathAbs}\\${fileOrDir}`;
	  console.log(`--> newPath::: [${newPath}]`);
	  console.log(`--> tsFile(newPath)::: [${itsFile(newPath)}]`);
	  console.log(`--> verifyMdFile(newPath)::: [${verifyMdFile(newPath)}]`);
      if ((itsFile(newPath)) && (verifyMdFile(newPath))) {
		console.log(`--> pushing in allArrayFilesMd value::: [${newPath}]`);
        allArrayFilesMd.push(newPath);
      } else {
	    console.log(`--> calling searchFilesOrDirectory for::: [${newPath}] in array [${allArrayFilesMd}]`);
        searchFilesOrDirectory(newPath, allArrayFilesMd);
      }
    });
  } else if ((itsFile(pathAbs)) && (verifyMdFile(pathAbs))) {
	console.log(`--> pushing ELSEI IF in allArrayFilesMd value pathAbs::: [${pathAbs}]`);
    allArrayFilesMd.push(pathAbs);
  } else {
    console.log("this file do not have md extention");
  }

  return allArrayFilesMd;
};

// validación existencia y transformación a absoluta

const validatePath = (route) => existRoute(route);

const processUserInputLoweLevel = (route) => {
  let ABSOLUTE_PATH;
  const arrayOfFiles = [];
  if (existRoute(route)) {
    ABSOLUTE_PATH = pathToAbsolute(route);
    searchFilesOrDirectory(ABSOLUTE_PATH, arrayOfFiles);
  } else {
    console.log("Sorry, this route does not exist.");
    process.exit(1); // terminar el programa
  }
  return arrayOfFiles;
};

const getLinks = (array) => {
 
};

const processUserInput = (route, option) => {
  let arrayData = [];
  switch (option) {
    case "--validateAndStats":
      // print Status......
      arrayData = processUserInputLoweLevel(route);
      getLinks(arrayData);
      break;
    case "--validate":
      processUserInputLoweLevel(route);
      arrayData = processUserInputLoweLevel(route);
      getLinks(arrayData);
      break;
    case "--stats":
      processUserInputLoweLevel(route);
      arrayData = processUserInputLoweLevel(route);
      getLinks(arrayData);
      break;
    default:
      console.log("Sorry, this option does not exist.");
  }
};

processUserInput(routeUser, optionUser);

// si validate true return
const mdlinks = (route, options) => {

};

// --validate href text  file status ok
// --stats total unique
// --stats --validate  total,unique,broken

// const path = 'C:\Users\ruben\Desktop\MD_LINKS\LIM017-md-links\examples\readme1.md';
// const path = './examples/readme1.md;
// const path = 'C:\Users\ruben\Desktop\MD_LINKS\LIM017-md-links\examples\readme1/x';
// const path = './examples/readme/readme1.md;

module.exports = () => {
  validateOptions, validatePath;
};
