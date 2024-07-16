// webpack.config.js

module.exports = {
  // Your other Webpack configuration settings...

  devServer: {
    // Other devServer options...

    setupMiddlewares: (middlewares, devServer) => {
      // Logic previously in onBeforeSetupMiddleware
      middlewares.unshift((req, res, next) => {
        console.log('Before middleware logic');
        next();
      });

      // Logic previously in onAfterSetupMiddleware
      middlewares.push((req, res, next) => {
        console.log('After middleware logic');
        next();
      });

      return middlewares;
    },
  },
};
