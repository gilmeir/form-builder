const fs = require('fs');
const util = require('util');
const renderVm = require('./vm');

const html = renderVm({
  "debug": false,
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
