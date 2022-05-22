const chalk = require("chalk");
const {
    getStatsUnique,
} = require("./methods")
const printObject = (arrayObject) => {
console.log(arrayObject)
arrayObject.forEach(propertiesObject => {
    const file = chalk.green(propertiesObject.file);
    const link = chalk.yellow(propertiesObject.href);
    const number = chalk.yellowBright(propertiesObject.statusCode);
    const text = chalk.blue(propertiesObject.text)
    let status = propertiesObject.status;
    const color = (propertiesObject.status === "Fail") ? chalk.bold.redBright(status) : chalk.bold.magenta(status)
    const options = `File:${file} Href:${link} Text:${text} Status:${color} StatusCode:${number}`;
    console.log(options)
});
}

const printObjectStats = (arrayObject) => {
  const stats = getStatsUnique(arrayObject);
  console.log("stats")
  // console.log(stats)
  stats.forEach((stat) => {
    const options = `
    ${chalk.bgRed('Total  ')} : ${chalk.yellowBright(stat.total)} 
    ${chalk.bgRed('Unique ')} : ${ chalk.yellowBright(stat.Unique)}
    `;
    console.log(options)
  })
  
}

const printStatAndValidate = (arrayObjectStats) => {
    // console.log("arrayObjectStats")
     // console.log(arrayObjectStats)
     arrayObjectStats.forEach((stat) => {
        const options = `
        ${chalk.bgRed('Total   ')} : ${chalk.yellowBright(stat.total)} 
        ${chalk.bgRed('Unique  ')} : ${ chalk.yellowBright(stat.Unique)}
        ${chalk.bgRed('Broquen ')} : ${ chalk.yellowBright(stat.Broquen)}
        `;
        console.log(options)
      })

}

module.exports = {
    printObject,
    printObjectStats,
    printStatAndValidate,
};