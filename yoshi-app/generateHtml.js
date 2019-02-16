const fs = require('fs');
const util = require('util');
const renderVm = require('./vm');

const html = renderVm({
  "serverUrl": process.env.NODE_ENV === 'production'
    ? 'https://us-central1-yoshi-app-8172c.cloudfunctions.net/'
    : 'http://localhost:5001/yoshi-app-8172c/us-central1/',
  "debug": process.env.NODE_ENV !== 'production',
  "clientTopology": {
    "staticsDomain": "static.parastorage.com",
    "staticsBaseUrl": process.env.NODE_ENV === 'production' ? "//yoshi-app-8172c.firebaseapp.com/": `//localhost:5000/`
  }
});

const writeFile = util.promisify(fs.writeFile);

writeFile(
  'dist/statics/index.html',
  html,
  { encoding: 'utf8' },
)
  .then(() => process.exit(0))
  .catch(err => {
    console.log(err);
    process.exit(1);
  });
