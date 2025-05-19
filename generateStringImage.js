var fs = require('fs');
//gen string
genStringResource = () => {
    try {
      const data = require('./src/assets/locales/en.json');
      const stringName = Object.keys(data);
      fs.writeFileSync(
        './src/assets/strings.ts',
        `import i18n from './locales/index'
        
        function strings() {
            return {
                ${stringName.map(string => {
                    path = `
                    ${string}: i18n.t("${string}", { defaultValue: "" })`;
                    return path;
                  })}
            }
        }
        export default strings
        `
      );
      console.log(`============== Linked ${stringName.length} string resource success  ========\======`);
    } catch (err) {
      console.error(err);
    }
  };

  genStringResource()


//gen image
genImageResource = () => {
    fs.readdir('./src/assets/icons/', function (err, fileName) {
        if (err) {
          console.log(err);
          return;
        }
        if(fileName[0] == '.DS_Store'){
          fileName.splice(0,1);
        }
        fs.writeFileSync(
          './src/assets/images.ts',
          `const images = {${fileName.map(iconName => {
            path = `
        ${iconName.slice(0, iconName.length - (iconName.split('.')[1].length + 1))}: require("./icons/${iconName}")`;
            return path;
          })}
        }
    export default images`,
          { encoding: 'utf8', flag: 'w' }
        );
        console.log(`============== Linked ${fileName.length} images resource success  ========\======`);
      });
}
genImageResource()