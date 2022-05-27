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
  getPropertiesOfObject(route, options) // array de objetos
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

const cliFunction = (route, option) => {
  const newOptions = getExistOption(option);
  const newRoutes = validateRoute(route);
  if (newOptions === "inexistente") {
    console.log(chalk.red("Sorry, this option does not exist."));
    return "Sorry, this option does not exist.";
  } else if (newRoutes === "inexistente") {
    console.log(chalk.red("Sorry, this route does not exist."));
    return "Sorry, this route does not exist.";
  }
  mdLinks(route, { validate: option.includes("--validate")})
    .then((arrayObject) => {
      if (option[0] === undefined) {
        printObjectFalse(arrayObject).then((n) => console.log(n));
      } else if (option[1] === undefined) {
        if (option[0] === "--validate") {
          printObject(arrayObject).then((n) => console.log(n));
        } else if (option.includes("--stats")) {
          printObjectStats(arrayObject).then((n) => console.log(n));
        }
      } else if (option.includes("--stats") && option.includes("--validate")) {
        const arrayObjectStats = getStatsUniqueBroken(arrayObject);
        printStatAndValidate(arrayObjectStats).then((n) => console.log(n));
      }
    });
  return "route processed";
};

cliFunction(routeUser, inputUser);

module.exports = {
  mdLinks,
  validateRoute,
  getExistOption,
  cliFunction,
};
