module.exports = {
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
            },
          },
          "sass-loader",
        ],
      },
      { test: /\\.(png|jp(e*)g|svg|gif)$/, use: ["file-loader"] },
    ],
  },
};
