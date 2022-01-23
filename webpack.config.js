const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require("path");

module.exports = (env) => ({
  entry: [
    'babel-polyfill',
    path.resolve(__dirname, "src/index.js"),
  ],
  output: {
    filename: 'main.[contenthash].js',
    path: env.ssr ? path.resolve(__dirname, './dist') : path.resolve(__dirname, '../shop/dist'),
    publicPath: env.prod && !env.ssr ? './' : "/",
    clean: true,
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.([tj]s|[tj]sx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', "@babel/preset-typescript", "@babel/preset-react"],
            plugins: ["@babel/plugin-syntax-dynamic-import", "@loadable/babel-plugin"]
          }
        }
      },
      {
        test: /\.(s[ac]ss|css)$/i,
        exclude: /node_modules/,
        use: [
          env.prod ? MiniCssExtractPlugin.loader : "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            }
          }
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        exclude: /node_modules/,
        type: 'asset',
        generator: {
          filename: 'images/[name][hash][ext][query]'
        }
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              severityError: "warning", // Ignore errors on corrupted images
              minimizerOptions: {
                plugins: [
                  ["gifsicle", { optimizationLevel: 3 }],
                  ["mozjpeg", { quality: 80, }],
                  ["pngquant", { quality: [0.8, 0.8] }],
                  ["svgo", { plugins: [{ name: 'preset-default', params: { removeViewBox: false } },], },],
                ],
              },
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2)$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[name][hash][ext][query]'
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'audio',
      template: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main.[contenthash].css',
    }),
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
})
