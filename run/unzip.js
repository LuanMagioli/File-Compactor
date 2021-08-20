const path = process.argv[2];

if (!path) {
  throw new Error('missing argument: no path especified');
}

const { unzip } = require('./src/FileCompactor');

unzip(path);