module.exports = {
  validateLogin: function (requestParams, response, context, ee, next) {
    context.vars.loginFailed = true;

    let body;

    try {
      body = typeof response.body === 'string'
        ? JSON.parse(response.body)
        : response.body;
    } catch (err) {
      console.log(" Invalid JSON Response");
      return next();
    }

   
    const token = body?.data?.admin_token;
    console.log(" Token:", token);

    if (!token) {
      console.log(" Admin_Token not found in response");
      return next();
    }

    context.vars.adminToken = token;

    if (response.headers['set-cookie']) {
      context.vars.sessionCookie =
        response.headers['set-cookie'][0].split(';')[0];
    }
    context.vars.loginFailed = false;
    return next();
  }
};