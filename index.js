#!/usr/bin/env node
const path = require("node:path");
const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");
const url = require("node:url");

const inputUser = process.argv.slice(2);
const optionUser = inputUser[1];
const routeUser = inputUser[0];
const existRoute = (route) => fs.existsSync(route);
const itsDirectory = (route) => fs.statSync(route).isDirectory();
const itsFile = (route) => fs.statSync(route).isFile();
const pathToAbsolute = (paths) => path.resolve(paths);
const readFile = (file) => fs.readFileSync(file, "utf-8");//
const readDirectory = (directory) => fs.readdirSync(directory); // array
const verifyMdFile = (file) => path.extname(file) === ".md";
// const readLinks = (route) => fs.readlinkSync(route, "utf-8");
const httpOptions = (link) => url.urlToHttpOptions(link);
// const searchOption = (link) => link.search(link);
const getStatusHttps = https.get;
const getStatusHttp = http.get;

// saca todos los archivos md
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
    // process.exit();
  }
  return arrayOfFiles;
};

const getStatusCode = (link) => new Promise((resolve) => {
  const linkNew = new URL(link);
  const optionsLink = httpOptions(linkNew);
  if (optionsLink.protocol === "https:") {
    getStatusHttps(link, (res) => {
      // console.log("statusCode:", res.statusCode);
      resolve(res.statusCode);
    });
  } else {
    getStatusHttp(link, (res) => {
      // console.log("statusCode:", res.statusCode);
      resolve(res.statusCode);
    });
  }
});

const getTextFileHref = (arrayFiles) => {
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
  const singleMatch = /\[([^\[]+)\]\((.*)\)/;
  const arrayLinksObjects = [];
  const arrayLinks = [];
  arrayFiles.forEach((files) => {
    const content = readFile(files);
    const matches = content.match(regexMdLinks);
    if (matches) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < matches.length; i++) {
        const text = singleMatch.exec(matches[i]);
        arrayLinksObjects.push({
          file: files,
          href: text[2],
          text: text[1],
        });
        arrayLinks.push(text[2]);
      }
    }
  });
  return arrayLinksObjects;
};

const getArrayLinks = (arrayFiles) => {
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
  const singleMatch = /\[([^\[]+)\]\((.*)\)/;
  const arrayLinks = [];
  arrayFiles.forEach((files) => {
    const content = readFile(files);
    const matches = content.match(regexMdLinks);
    if (matches) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < matches.length; i++) {
        const text = singleMatch.exec(matches[i]);
        arrayLinks.push(text[2]);
      }
    }
  });
  return (arrayLinks);
};

const validityStatusCode = (number) => {
  if (number === (200)) {
    return "Ok";
  }
  if (number === 301) {
    return "Ok";
  }
  if (number === 302) {
    return "Ok";
  }
  return "Fail";
};
const getAllPropertiesOfObject = (arrayObject) => {
  arrayObject.forEach((objectOnly) => {
    getStatusCode(objectOnly.href)
      .then((n) => {
        // eslint-disable-next-line no-param-reassign
        objectOnly.statusCode = n;
        // eslint-disable-next-line no-param-reassign
        objectOnly.status = validityStatusCode(n);
        console.log(objectOnly);
        return objectOnly;
      })
      .catch((error) => console.error(error));
  });
};

const statsTotalUnique = (arrayLinks) => {
  let count = 0;
  arrayLinks.forEach((link) => {
    if (link) {
      count += 1;
    }
  });
  const options = {
    Total: count,
    Unique: count,
  };
  return options;
};

const printArrayObjects = (propertiesObject) => {
  console.log("propertiesObject");
  console.log(propertiesObject);
};

const processUserInput = (route, option) => {
  let arrayFilesMD = [];
  let arrayLinks = "";
  let arrayObject = "";
  let propertiesObject;
  let result;
  switch (option) {
    case "--validate--stats":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      arrayLinks = getArrayLinks(arrayFilesMD);
      break;
    case "--validate":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);     
      arrayObject = getTextFileHref(arrayFilesMD);
      result = /* propertiesObject */ getAllPropertiesOfObject(arrayObject);
     // printArrayObjects(propertiesObject);
      break;
    case "--stats":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      arrayLinks = getArrayLinks(arrayFilesMD);
      result = statsTotalUnique(arrayLinks);
      break;
    case "--filesMD":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      result = arrayFilesMD;
      break;
    default:
      result = "Sorry, this option does not exist.";
  }
  console.log("RESULTADO");
  console.log(result);
  return result;
};

processUserInput(routeUser, optionUser);

// --validate href text  file status ok
// --stats total unique
// --stats --validate  total,unique,broken

module.exports = {
  processUserInput,
  getFilesIfRouteExistOrExit,
  searchFilesOrDirectory,
  getTextFileHref,
  validityStatusCode,
};
