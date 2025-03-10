/* eslint-disable no-unused-expressions */
const fs = require("node:fs");
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");
const url = require("node:url");

const pathToAbsolute = (paths) => path.resolve(paths);
const itsDirectory = (route) => fs.statSync(route).isDirectory();
const itsFile = (route) => fs.statSync(route).isFile();
const readFile = (file) => fs.readFileSync(file, "utf-8");
const readDirectory = (directory) => fs.readdirSync(directory);
const verifyMdFile = (file) => path.extname(file) === ".md";
const httpOptions = (link) => url.urlToHttpOptions(link);
const getStatusHttps = https.get;
const getStatusHttp = http.get;

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

const getTextFileHref = (arrayFiles) => {
  // eslint-disable-next-line no-useless-escape
  const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
  // eslint-disable-next-line no-useless-escape
  const singleMatch = /\[([^\[]+)\]\((.*)\)/;
  const arrayLinksObjects = [];
  arrayFiles.forEach((files) => {
    const content = readFile(files);
    const matches = content.match(regexMdLinks);
    if (matches) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < matches.length; i++) {
        const text = singleMatch.exec(matches[i]);
        let newText = text[1];
        if (text[1].length > 50) {
          newText = text[1].slice(0, 50);
        }
        arrayLinksObjects.push({
          file: files,
          href: text[2],
          text: newText,
        });
      }
    }
  });
  return arrayLinksObjects;
};

const getStatusCode = (link) => new Promise((resolve) => {
  const linkNew = new URL(link);
  const optionsLink = httpOptions(linkNew);
  if (optionsLink.protocol === "https:") {
    const req = getStatusHttps(link, (res) => {
      resolve(res.statusCode);
    });
    req.on("error", (e) => {
      resolve(`problem with request: ${e.message} on the link (${link})`);
    });
  } else if (optionsLink.protocol === "http:") {
    const req = getStatusHttp(link, (res) => {
      resolve(res.statusCode);
    });
    req.on("error", (e) => {
      resolve(`problem with request: ${e.message} on the link(${link})`);
    });
  } else {
    resolve(`problem with request: this protocol's link ${link} is not http or https`);
  }
});

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

const getPropertiesOfObject = (route, optionTrueFalse) => new Promise((resolve) => {
  const ABSOLUTE_PATH = pathToAbsolute(route);
  const arrayOfFiles = [];
  const arrayOfFilesMd = searchFilesOrDirectory(ABSOLUTE_PATH, arrayOfFiles);
  const arrayLinksObject = getTextFileHref(arrayOfFilesMd);
  if (optionTrueFalse.validate === true) {
    const array = [];
    arrayLinksObject.forEach((objectOnly) => {
      getStatusCode(objectOnly.href)
        .then((n) => {
          // eslint-disable-next-line no-param-reassign
          objectOnly.statusCode = n;
          // eslint-disable-next-line no-param-reassign
          objectOnly.status = validityStatusCode(n);
          array.push(objectOnly);
          if (array.length === arrayLinksObject.length) {
            resolve(array);
          }
        });
    });
  } else {
    resolve(arrayLinksObject);
  }
});

const getLinks = (arrayObject) => {
  const arrayLinks = [];
  arrayObject.forEach((onlyObject) => {
    arrayLinks.push(onlyObject.href);
  });
  let countUnique = 0;
  const arrayUnique = [];
  const res = arrayLinks.reduce((acc, link) => {
    // eslint-disable-next-line no-param-reassign
    acc = arrayUnique;
    if (!arrayUnique.includes(link)) {
      arrayUnique.push(link);
    }
    return arrayUnique;
  }, arrayLinks[0]);
  countUnique = res.length;
  return countUnique;
};
const getStatsUniqueBroken = (arrayObject) => {
  const allStats = [];
  let countTotal = 0;
  let countBroquen = 0;
  const linksUnique = getLinks(arrayObject);
  arrayObject.forEach((onlyObject) => {
    countTotal += 1;
    (onlyObject.status === "Fail") ? countBroquen += 1 : countBroquen += 0;
  });
  allStats.push({
    total: countTotal,
    Unique: linksUnique,
    Broquen: countBroquen,
  });
  return allStats;
};
const getStatsUnique = (arrayObject) => {
  const allStats = [];
  let countTotal = 0;
  const linksUnique = getLinks(arrayObject);
  // eslint-disable-next-line no-unused-vars
  arrayObject.forEach((onlyObject) => {
    countTotal += 1;
  });
  allStats.push({
    total: countTotal,
    Unique: linksUnique,
  });
  return allStats;
};
module.exports = {
  getPropertiesOfObject,
  getStatsUniqueBroken,
  getStatsUnique,
  getLinks,
  validityStatusCode,
  getStatusCode,
  getTextFileHref,
  searchFilesOrDirectory,
};
