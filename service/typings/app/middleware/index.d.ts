// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportAdminauth = require('../../../app/middleware/adminauth');

declare module 'egg' {
  interface IMiddleware {
    adminauth: typeof ExportAdminauth;
  }
}
