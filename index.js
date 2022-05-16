#!/usr/bin/env node
const path = require("node:path");
const fs = require("node:fs");
const http = require("node:http");
const https = require("node:https");

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


const searchLinks = (contentSeparated, links) => {
  const regexLink = /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  contentSeparated.forEach((link) => {
    if (link.match(regexLink)) {
      links.push(link.match(regexLink)[0]);
    } else {
    }
  });
  return links;
};

const getLinks = (arrayFiles) => {
  console.log("dentro de getLinks");
  const arrayLinks = [];
  arrayFiles.forEach((file) => {
    const content = readFile(file);
    const contentSeparated = content.split(" ");
    const linksTogether = searchLinks(contentSeparated, []);
    arrayLinks.push(linksTogether);
  });
  return arrayLinks;
};

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
      console.log(getLinks(arrayFilesMD));
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
