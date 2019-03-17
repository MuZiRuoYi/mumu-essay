const fs = require('fs');
const path = require('path');
const root_path = path.resolve(__dirname, '../src/assets/articles/');
const w_file = path.resolve(__dirname, '../src/assets/articles/articles.ts');

function getAllFiles(root) {
  let res = [];
  let files = fs.readdirSync(root);

  files.forEach(function(file) {
    let pathname = root + '/' + file;
    let stat = fs.lstatSync(pathname);

    if (!stat.isDirectory()) {
      res.push(pathname.replace(root_path + '/', ''));
    } else {
      res = res.concat(getAllFiles(pathname));
    }
  });

  return res;
}

function convertFileName(res) {
  let mds = [];
  let mdFileNames = [];

  for (let i = 0, len = res.length; i < len; i++) {
    if (/\.md$/.test(res[i])) {
      let path = `import * as file${i} from './${res[i]}';`;
      mds.push(path);
      mdFileNames.push(`{ path: '${res[i]}', file: file${i} }`);
    }
  }
  let filesString = `export default [${mdFileNames.join(', ')}];`;

  if (filesString.length > 120) {
    mds.push(`export default [\n  ${mdFileNames.join(',\n  ')}\n];\n`);
  } else {
    mds.push(filesString);
  }

  return mds;
}

module.exports = function() {
  const w_content = convertFileName(getAllFiles(root_path)).join('\n');

  fs.writeFileSync(w_file, w_content);
};
