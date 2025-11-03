module.exports = {
  transpileDependencies: ["framer-motion", "motion-dom", "ogl"],
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: "javascript/auto",
        },
      ],
    },
  },
};
