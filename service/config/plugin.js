'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };
// egg-sql
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
// 解决跨域 cors
exports.cors = {
  enable: true,
  package: 'egg-cors',
};
