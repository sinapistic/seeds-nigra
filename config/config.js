var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'workspace'
    },
    port: process.env.PORT,
    db: 'mongodb://goodboy:st0rmy@linus.mongohq.com:10083/seeds-nigra'

  },

  test: {
    root: rootPath,
    app: {
      name: 'workspace'
    },
    port: 3000,
    db: 'mongodb://localhost/workspace-test'

  },

  production: {
    root: rootPath,
    app: {
      name: 'workspace'
    },
    port: 3000,
    db: 'mongodb://localhost/workspace-production'

  }
};

module.exports = config[env];
