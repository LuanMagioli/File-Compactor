const path = process.argv[2];

if (!path) {
  throw new Error('missing argument: no path especified');
}

const { zip } = require('./src/FileCompactor');

zip(path);