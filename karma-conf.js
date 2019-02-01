const karmaConf = require('./karma.json');
process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {
  config.set(karmaConf);
  config.set({
    browsers: ['ChromeHeadless']
  });
};
