module.exports = {
  // Your other Webpack configuration settings...

  devServer: {
    // Other devServer options...

    // Replace deprecated options
    /*
      onBeforeSetupMiddleware: function(devServer) {
        // Your existing middleware setup logic
      },
      onAfterSetupMiddleware: function(devServer) {
        // Your existing middleware setup logic
      },
      */

    // Use the new setupMiddlewares option
    setupMiddlewares: (middlewares, devServer) => {
      // Your existing middleware setup logic from onBeforeSetupMiddleware
      // ...

      // Your existing middleware setup logic from onAfterSetupMiddleware
      // ...

      return middlewares;
    },
  },
};
