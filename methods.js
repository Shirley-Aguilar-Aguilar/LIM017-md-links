const fs = require("node:fs"); //
const path = require("node:path");
const http = require("node:http");
const https = require("node:https");
const url = require("node:url");
const pathToAbsolute = (paths) => path.resolve(paths);
const itsDirectory = (route) => fs.statSync(route).isDirectory();
const itsFile = (route) => fs.statSync(route).isFile();
// const pathToRelative = (paths) => path.relative(paths);
const readFile = (file) => fs.readFileSync(file, "utf-8");//
const readDirectory = (directory) => fs.readdirSync(directory); // array
const verifyMdFile = (file) => path.extname(file) === ".md";
// const readLinks = (route) => fs.readlinkSync(route, "utf-8");
const httpOptions = (link) => url.urlToHttpOptions(link);
const getStatusHttps = https.get;
const getStatusHttp = http.get;

const {
} = require("./index.js")



const searchFilesOrDirectory = (pathAbs, allArrayFilesMd) => {
    if (itsDirectory(pathAbs)) {
      const content = readDirectory(pathAbs);
      content.forEach((fileOrDir) => {
        const newPath = `${pathAbs}/${fileOrDir}`;
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
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    const singleMatch = /\[([^\[]+)\]\((.*)\)/;
    const arrayLinksObjects = [];
    arrayFiles.forEach((files) => {
      const content = readFile(files);
      // const fileRelative = pathToRelative(files.toString());
      const matches = content.match(regexMdLinks);
      if (matches) {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < matches.length; i++) {
          const text = singleMatch.exec(matches[i]);
          let newText = text[1];
          if(text[1].length > 50) {
            // console.log("text[1].length");
            // console.log(text[1].length);
              newText = text[1].slice(0,50);
             //  console.log("text[1].slice(50);");
            // console.log();
          }
          // console.log("newText");
          // console.log(newText);
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
      getStatusHttps(link, (res) => {
        // console.log("statusCode:", res.statusCode);
        resolve(res.statusCode);
      });
    } else if (optionsLink.protocol === "http:") {
      getStatusHttp(link, (res) => {
        // console.log("statusCode:", res.statusCode);
        resolve(res.statusCode);
      });
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

const getPropertiesOfObject = (route, optionTrueFalse) => new Promise ((resolve, reject) => {
    const ABSOLUTE_PATH = pathToAbsolute(route);
   // console.log(ABSOLUTE_PATH);
    const arrayOfFiles = [];
    const arrayOfFilesMd = searchFilesOrDirectory(ABSOLUTE_PATH, arrayOfFiles);
    const arrayLinksObject = getTextFileHref(arrayOfFilesMd);
   if(optionTrueFalse) {
       const array = [];
    arrayLinksObject.forEach((objectOnly) => {
      // console.log(objectOnly.href)
        getStatusCode(objectOnly.href)
          .then((n) => {
            // eslint-disable-next-line no-param-reassign
            objectOnly.statusCode = n;
            // eslint-disable-next-line no-param-reassign
            objectOnly.status = validityStatusCode(n);
            array.push(objectOnly);
            if(array.length === arrayLinksObject.length) {
                resolve(array);
            }         
          })
      });
  } else {
    //console.log("arrayLinksObject")
     // console.log(arrayLinksObject)
     resolve(arrayLinksObject);

   }

});

const getLinks = (arrayObject) => {
  const arrayLinks = [];
  arrayObject.forEach((onlyObject) =>  {
    arrayLinks.push(onlyObject.href);
  })
  let countUnique = 0;
  const arrayUnique = []
  const res = arrayLinks.reduce((acc,link) => {
   if(!arrayUnique.includes(link)){
    arrayUnique.push(link);
   }
    return arrayUnique; 
  },arrayLinks[0] );
  countUnique = res.length;
  return countUnique;
}
const getStatsUniqueBroken = (arrayObject) => {
  const allStats = [];
  let countTotal = 0;
  let countBroquen = 0;
  const linksUnique = getLinks(arrayObject);
  arrayObject.forEach((onlyObject) => {
    countTotal+= 1;
    if(onlyObject.status === "Fail"){
      countBroquen+=1;
    }
    
  })
  allStats.push({
    total:countTotal,
    Unique:linksUnique,
    Broquen:countBroquen,
  })
return allStats;
}
const getStatsUnique = (arrayObject) => {
  console.log(arrayObject)
  const allStats = [];
  let countTotal = 0;
  const linksUnique = getLinks(arrayObject);
  arrayObject.forEach((onlyObject) => {
    countTotal+= 1;
    
  })
  allStats.push({
    total:countTotal,
    Unique:linksUnique,
  })
return allStats;
}
module.exports = {
  getPropertiesOfObject,
  getStatsUniqueBroken,
  getStatsUnique,
  getLinks,
  getPropertiesOfObject,
  validityStatusCode,
  getStatusCode,
  getTextFileHref,
  searchFilesOrDirectory,
  
};

/* const getFilesIfRouteExistOrExit = (route) => {
    let ABSOLUTE_PATH;
    const arrayOfFiles = [];
    if (existRoute(route)) {
      ABSOLUTE_PATH = pathToAbsolute(route);
      searchFilesOrDirectory(ABSOLUTE_PATH, arrayOfFiles);
    } else {
      console.log("Sorry, this route does not exist.");
    }
    return arrayOfFiles;
} */

      
/* 

/* // imprimir funcionalidad --validate
const printArrayObjects = (propertiesObject) => {
  const options = `${propertiesObject.file} ${propertiesObject.href} ${propertiesObject.text} ${propertiesObject.status} ${propertiesObject.statusCode}`;
  console.log(options.length);
  console.log(options);
  return options;
};
// imprimir
const printTotalUniqueBroken = (objectUnique) => {
  const options = `  Total:${objectUnique.Total}  Unique:${objectUnique.Unique}  Broken:${objectUnique.Broken}`;
  console.log(options);
  return options;
};

const printgetTextFileHref = (arrayObject) => {
  arrayObject.forEach((onlyObject) => {
    const options = `${onlyObject.file} ${onlyObject.href} ${onlyObject.text} `;
    console.log(options.length);
    console.log(options);
  });
};








const statsTotalUnique = (arrayLinks) => {
  let countTotal = 0;
  let countUnique = 0;
  arrayLinks.forEach((link) => {
    if (link) {
      countTotal += 1;
    }
  });
  const options = {
    Total: countTotal,
    Unique: countUnique,
  };
  return options;
};

const countStatusCode = (total, arrayNumber) => {
  let count = 0;
  arrayNumber.forEach((n) => {
    if (validityStatusCode(n) === "Fail") {
      count += 1;
    }
  });
  // eslint-disable-next-line no-param-reassign
  total.Broken = count;
  return total;
};
const getValidateAndStats = (arrayLinks) => {
  const count = [];
  arrayLinks.forEach((link) => {
    getStatusCode(link)
      .then((n) => {
        count.push(n);
        if (count.length === arrayLinks.length) {
          const total = statsTotalUnique(arrayLinks);
          const newtotal = countStatusCode(total, count);
          printTotalUniqueBroken(newtotal);
        }
      })
      .catch((error) => console.error(error));
  });
};

const processUserInput = (route, option) => {
  let arrayFilesMD = [];
  let arrayLinks = "";
  let arrayObject = "";
  let result = "";

  switch (option) {
    case "--validate--stats": case "--stats--validate":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      arrayLinks = getArrayLinks(arrayFilesMD);
      result = getValidateAndStats(arrayLinks);
      break;
    case "--validate":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      arrayObject = getTextFileHref(arrayFilesMD);
      result = getAllPropertiesOfObject(arrayObject);
      break;
    case "--stats":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      arrayLinks = getArrayLinks(arrayFilesMD);
      result = statsTotalUnique(arrayLinks);
      break;
    case undefined:
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      arrayObject = getTextFileHref(arrayFilesMD);
      result = printgetTextFileHref(arrayObject);
      break;
    case "--filesMD":
      arrayFilesMD = getFilesIfRouteExistOrExit(route);
      result = arrayFilesMD;
      break;
    default:
      result = "Sorry, this option does not exist.";
  }
  return (result !== undefined) ? console.log(result) : console.log("Resultado");
};
// stats 
processUserInput(routeUser, optionUser); */



// saca todos los archivos md
/*

// validación existencia

}; */