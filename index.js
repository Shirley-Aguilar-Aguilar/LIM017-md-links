#!/usr/bin/env node
const fs = require("node:fs");
const inputUser = process.argv.slice(3);
const routeUser = process.argv[2] //
const existRoute = (route) => fs.existsSync(route); //
const chalk = require("chalk");

const {
  getPropertiesOfObject,
  getStatsUniqueBroken,
} = require("./methods");
const {
  printObject,
  printObjectStats,
  printStatAndValidate,
} = require("./utils");

const getTrueOrFalse = (input) => {
  let result;
  if (input[0] === undefined) {
    result = false;
  } else if (input[1] === undefined) {
    if (input.includes("{validate:true}") || input.includes("--validate")) {
      result = true;
    } else if (input.includes("--stats")) {
      result = false;
    } else {
      result = "inexistente";
    }
  } else {
    if (input.includes("--stats") && input.includes("--validate")) {
      result = true;
    } else {
      result = "inexistente";
    }
  }
  return result;
};

// eslint-disable-next-line no-confusing-arrow
const validateRoute = (route) => existRoute(route) ? route : "inexistente";

const mdLinks = (route, option) => new Promise((resolve, reject) => {
  // const option = getTrueOrFalse(inputUser)
  // const route =validateRoute(routeUser)
  console.log(option);
  if (option === "inexistente") {
    console.log(chalk.red("Sorry, this option does not exist."));
  // reject(console.error(chalk.red("Sorry, this option does not exist.")));
  } else if (route === "inexistente") {
    console.log(chalk.red("Sorry, this route does not exist."));
    //  reject(console.error("Sorry, this route does not exist."))
  } else {
    getPropertiesOfObject(route, option, inputUser ) // array de objetos
      .then((arrayObject) => {
        if(inputUser[1] === undefined) {
          if( inputUser[0]=== "--stats") {
            printObjectStats(arrayObject)
          }else {
            printObject(arrayObject);
          }
          
          resolve(arrayObject);
        } else {
          const arrayObjectStats = getStatsUniqueBroken(arrayObject);
          // console.log(arrayObjectStats );
          printStatAndValidate(arrayObjectStats);
          resolve(arrayObjectStats)
        }
        
      })
      .catch((error) => {
          console.error(error);
      });
  }
});

mdLinks(validateRoute(routeUser), getTrueOrFalse(inputUser));



module.exports = {


  /*   processUserInput,
    getFilesIfRouteExistOrExit,
    searchFilesOrDirectory,
    getTextFileHref,
    validityStatusCode, */
};
// mdLinks("./examples/Folder/directory1")
// .then((a)=>  console.log(a))