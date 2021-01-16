const nodeGeoCoder = require('node-geocoder');

const options = {
  provider: "mapquest",
  httpAdapter: 'https',
  apiKey: "yWXrnZB7EJYvw2yePvzjWPdJooEAmcAn",
  formatter: null
};

const geocoder = nodeGeoCoder(options);

module.exports = geocoder;