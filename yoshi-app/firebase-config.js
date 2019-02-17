const renderVm = require('./vm');

const isProduction = process.env.NODE_ENV === 'production';

const renderHtml = () =>
  renderVm({
    serverBaseUrl: isProduction
      ? 'https://us-central1-form-builder-gil.cloudfunctions.net/'
      : 'http://localhost:5001/form-builder-gil/us-central1/',
    debug: !isProduction,
    clientTopology: {
      staticsDomain: 'static.parastorage.com',
      staticsBaseUrl: isProduction
        ? '//form-builder-gil.firebaseapp.com/'
        : '//localhost:5000/',
    }
  });

export default renderHtml;
