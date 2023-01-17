const path = require("path");
const html = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
  },
  devtool: "inline-source-map",
  output: {
    filename: "[name].main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [new html({ title: "Todo" })],
  module: {
    rules: [
      { test: /\.css$/i, use: ["style-loader", "css-loader"] },
      { test: /\.(png|jpg|jpeg|gif)$/i, type: "asset/resource" },
      { test: /\.svg$/, loader: "svg-inline-loader" },
    ],
  },
};
