const path = require("path");

module.exports = {
  lintOnSave: true,
  configureWebpack: {
    output: {
      path: path.resolve(__dirname, "../server/public")
    }
  }
};
