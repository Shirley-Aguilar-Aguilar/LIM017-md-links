const {
  processUserInput, getFilesIfRouteExistOrExit, searchFilesOrDirectory,
} = require("../index.js");

jest.mock("node_modules");

/* describe('validateOptions', () => {
  it('should...', () => {
      const pathUser = "./examples/readme1.md";
      const option = "--validate";
      console.log(typeof validateOptions());
      console.log(typeof (validateOptions(pathUser, option)));
      console.log(typeof validateOptions())
      expect(validateOptions(pathUser, option)).toBe(true);
  });

});  */
describe("validatePath", () => {
  it("should...", () => {
    const pathUser = "./examples/readme1.md";
    expect(getFilesIfRouteExistOrExit(pathUser)).toBe("readme1.md");
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
