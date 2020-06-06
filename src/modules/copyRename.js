/* eslint-disable @typescript-eslint/no-var-requires */
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) {
    return a.toUpperCase();
  });
};
const fs = require('fs');
const path = require('path');

//
const walk = function(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(file));
    } else {
      /* Is a file */
      results.push(file);
    }
  });
  return results;
};
//

//

const targetDir = process.argv[2];
const newDir = process.argv[3];
const targetDirs = targetDir + 's';
const newDirs = newDir;

const TargetDir = targetDir.capitalize();
const NewDir = newDir.capitalize();
const TargetDirs = targetDirs.capitalize();
const NewDirs = newDirs.capitalize();

//

if (!targetDir || !newDir) {
  console.log('error', 1);
  process.exit(1);
}

const newPath = path.join(__dirname, newDirs + 's');
const targetPath = path.join(__dirname, targetDirs);
console.log('targetPath', targetPath);
console.log('targetPath', newPath);

if (fs.existsSync(newPath) || !fs.existsSync(targetPath)) {
  console.log('!fs.existsSync(targetPath)', !fs.existsSync(targetPath));
  console.log('fs.existsSync(newPath)', fs.existsSync(newPath));
  console.log('error', 2);
  process.exit(2);
}

fs.mkdirSync(newPath);
fs.mkdirSync(path.join(newPath, 'dto'));
for (const file of walk(targetPath)) {
  fs.copyFileSync(
    file,
    file
      .replace(targetDir, newDir)
      .replace(targetDir, newDir)
      .replace(targetDirs, newDirs)
      .replace(targetDirs, newDirs)
      .replace(TargetDir, NewDir)
      .replace(TargetDir, NewDir)
      .replace(TargetDirs, NewDirs)
      .replace(TargetDirs, NewDirs)
      .replace(targetDir, newDir)
      .replace(targetDir, newDir)
      .replace(targetDirs, newDirs)
      .replace(targetDirs, newDirs)
      .replace(TargetDir, NewDir)
      .replace(TargetDir, NewDir)
      .replace(TargetDirs, NewDirs)
      .replace(TargetDirs, NewDirs),
  );
}
