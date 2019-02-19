const fs = require('fs');
const util = require('util');
const renderHtml = require('./firebase-config');

const writeFile = util.promisify(fs.writeFile);

writeFile(
  'dist/statics/index.html',
  renderHtml(),
  { encoding: 'utf8' },
)
  .then(() => process.exit(0))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
