// eslint-disable-next-line strict
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line strict
// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line strict
module.exports = () => {
  return async function adminauth(ctx, next) {
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.body = { code: 3, data: '尚未登陆' };
    }
    // eslint-disable-next-line semi
  }
};
