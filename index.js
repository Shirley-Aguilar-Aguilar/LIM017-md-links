#!/usr/bin/env node
const path = require('node:path');
const { existsSync, statSync } = require('node:fs');


// saca todos los archivos md // continua searchLinks
const searchFilesMdOnDirectory = () => { 

}

// recursividad de buscar links// retorna todos los links
const searchLinks = () => { 

}
//directorio= recursividad searchFilesOnDirectory retorna array de directorios
// archivo.md = recursividad de archivomdsearchLinks
const searchFilesOrDirectory = (pathAbsolute, option) => { 
  const directories = statSync(pathAbsolute).isDirectory();
  console.log(directories + 'directories');
  const files = statSync(pathAbsolute).isFile();
  console.log(files+ 'files');
}

// es absoluta o relativa(convierte a absoluta)- retorna la absoluta(searchFiles)
const validateRouteAbsolute = (paths, option) => { 
  return path.isAbsolute(paths) ? searchFilesOrDirectory(paths,option) : searchFilesOrDirectory(path.resolve(paths),option);
}

// ruta existe(validateRoute) // no existe(mensaje de error) 
const validatePath = (path, option) => { 
  return  existsSync(path)? validateRouteAbsolute(path, option) : console.log('Sorry, this route does not exist.');
}

const validateOptions = () => {
    // devuelve el elemento del array con index 2(md-links)
    const option = process.argv.slice(2)[0]; 
    const path = process.argv.slice(2)[1];
    let result = false
    console.log(path);
    switch (option) {
        case '--validateAndStats':
           validatePath(path, option);
           result = true;
          break;
        case '--validate':
           validatePath(path, option);
           result = true;
          break;
        case '--stats':
           validatePath(path, option);
           result = true;
          break;
        default:  
          console.log('Sorry, this option does not exist.');
          result = false;
    }
    return result;
}

validateOptions();





// si validate true return 
const mdlinks = (path, options) => {  

}


// --validate href text  file status ok
// --stats total unique
// --stats --validate  total,unique,broken

    //const path = 'C:\Users\ruben\Desktop\MD_LINKS\LIM017-md-links\examples\readme1.md';
    // const path = './examples/readme1.md;
    // const path = 'C:\Users\ruben\Desktop\MD_LINKS\LIM017-md-links\examples\readme1/x';
     // const path = './examples/readme/readme1.md;


     module.exports = () => {
        // ...
      };