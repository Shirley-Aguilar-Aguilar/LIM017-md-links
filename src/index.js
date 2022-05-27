#!/usr/bin/env node
/* eslint-disable no-else-return */
const fs = require("node:fs");
const chalk = require("chalk");

const inputUser = process.argv.slice(3);
const routeUser = process.argv[2];
const existRoute = (route) => fs.existsSync(route);
const {
  getPropertiesOfObject,
  getStatsUniqueBroken,
} = require("./methods");
const {
  printObject,
  printObjectStats,
  printStatAndValidate,
  printObjectFalse,
} = require("./utils");

// eslint-disable-next-line no-confusing-arrow
const validateRoute = (route) => existRoute(route) ? route : "inexistente";

const mdLinks = (route, options) => new Promise((resolve) => {
  getPropertiesOfObject(route, options)
    .then((arrayObject) => {
      resolve(arrayObject);
    });
});

const getExistOption = (input) => {
  let result;
  if (input[0] === undefined) {
    result = false;
  } else if (input[1] === undefined) {
    if (input.includes("--validate")) {
      result = true;
    } else if (input.includes("--stats")) {
      result = false;
    } else {
      result = "inexistente";
    }
  } else if (input.includes("--stats") && input.includes("--validate")) {
    result = true;
  } else {
    result = "inexistente";
  }
  return result;
};

const cliFunction = (route, option) => new Promise((resolve, reject) => {
  const newOptions = getExistOption(option);
  const newRoutes = validateRoute(route);
  if ((newOptions === "inexistente")) {
    reject(chalk.red("Sorry, this option does not exist."));
  } if (newRoutes === "inexistente") {
    reject(chalk.red("Sorry, this route does not exist."));
  }
  mdLinks(route, { validate: option.includes("--validate") })
    .then((arrayObject) => {
      if (option[0] === undefined) {
        resolve(printObjectFalse(arrayObject));
      } else if (option[1] === undefined) {
        if (option[0] === "--validate") {
          resolve(printObject(arrayObject));
        } else if (option.includes("--stats")) {
          resolve(printObjectStats(arrayObject));
        }
      } else if (option.includes("--stats") && option.includes("--validate")) {
        const statsUniqueBroken = getStatsUniqueBroken(arrayObject);
        resolve(printStatAndValidate(statsUniqueBroken));
      }
    });
});

cliFunction(routeUser, inputUser)
  .then((n) => console.log(n))
  .catch((error) => {
    console.log(error);
  });

module.exports = {
  mdLinks,
  validateRoute,
  getExistOption,
  cliFunction,
};
