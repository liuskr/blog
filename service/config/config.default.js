/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};
  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost', // 本地
      // port
      port: '3306',
      // username
      user: 'root', // 数据库
      // password
      password: 'root',
      // database
      database: 'react-blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  config.security = {
    csrf: {
      enable: false, // 关闭安全机制
    },
    domainWhiteList: ['*'], // 所有都可以访问
  };
  config.cors = {
    origin: 'http://localhost:3000', // * 所有都可以访问
    credentials: true, // 允许cookies
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS', // 可以访问请求方式
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587613289003_900';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
