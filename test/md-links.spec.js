const {
  mdLinks, validateOptions, validatePath
} = require('../index.js');



jest.mock('link-check')

describe('validateOptions', () => {
  it('should...', () => {
      const pathUser = "./examples/readme1.md";
      const option = "--validate";
      expect(validateOptions(pathUser, option)).toBe(true);
    
/*     mdLinks(path, {}).then((paths) => {
      console.log(paths);
      const expected = [
        {

        },
        {

        }
      ]
      expect(paths).toEqual(expected)
      done();
    })
    console.log('FIX ME!'); */
  });

}); 

/* describe('validatePath', () => {

  it('should...', () => {
    validatePath(path, {}).then((paths) => {
      console.log(paths);
      const expected = [
        {

        },
        {
          
        }
      ]
      expect(paths).toEqual(expected)
      done();
    })
    console.log('FIX ME!');
  });

}); */
