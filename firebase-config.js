const renderVm = require('./vm');

const isProduction = process.env.NODE_ENV === 'production';

const renderHtml = () =>
  renderVm({
    serverBaseUrl: isProduction
      ? 'https://us-central1-simple-form-builder.cloudfunctions.net/'
      : 'http://localhost:5001/simple-form-builder/us-central1/',
    debug: !isProduction,
    clientTopology: {
      staticsDomain: 'static.parastorage.com',
      staticsBaseUrl: isProduction
        ? '//simple-form-builder.firebaseapp.com/'
        : '//localhost:5000/',
    }
  });

module.exports = renderHtml;
