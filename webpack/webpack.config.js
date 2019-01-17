const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

if (process.env.NODE_ENV == "production") {
  module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
      main: "./src/main.js"
    },
    output: {
      path: path.join(__dirname, "dist"),
      // publicPath: "/",
      filename: "js/[name].[hash].js",
      chunkFilename: "js/[name].[chunkhash].js"
    },
    devtool: 'source-map',
    optimization: {
      runtimeChunk: {
        name: 'manifest'
      },
      minimizer: [
        new UglifyJsPlugin({
          cache: false,
          parallel: true,
          sourceMap: true, // set to true if you want JS source maps,
          uglifyOptions: {
            warnings: false
          }
        }),
        new OptimizeCSSAssetsPlugin({})
      ],
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        name: false,
        cacheGroups: {
          vendor: {
            name: 'vendor',
            chunks: 'initial',
            priority: -10,
            reuseExistingChunk: false,
            test: /node_modules\/(.*)\.js/
          },
          styles: {
            name: 'styles',
            test: /\.(scss|css)$/,
            chunks: 'all',
            minChunks: 1,
            reuseExistingChunk: true,
            enforce: true
          }
        }
      }
    },
    module: {
      rules: [{
          test: /\.js$/,
          include: path.join(__dirname, "src"),
          loader: "babel-loader",
        },
        {
          test: /\.less|css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            "postcss-loader?sourceMap"
          ]
        },
        {
          test: /\.(htm|html)$/,
          use: 'html-withimg-loader'
        }, {
          test: /\.(png|svg|jpg|gif)$/,
          loaders: [
            'url-loader?limit=30000&name=assets/[name]-[hash:5].[ext]',
            'image-webpack-loader'
          ]
        }, {
          test: /\.(mp3|mp4)(\?.+)?$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash:8]',
              context: path.resolve(__dirname, "src"),
            }
          }]
        }, {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash:8]',
              context: path.resolve(__dirname, "src"),
            }
          }]
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
      }
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify("production")
        }
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin(true),
      new MiniCssExtractPlugin({
        filename: 'css/app.[name].css',
        chunkFilename: 'css/app.[contenthash:12].css'
      }),
      new HtmlWebpackPlugin({
        template: "./src/html/index.html",
        inject: "body",
        minify: {
          removeComments: true, // 去掉注释
          collapseWhitespace: true // 去掉空格
        }
      })
    ]
  };
} else {
  module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
      main: './src/js/main.js'
    },
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'js/[name].js?[hash:8]',
    },
    devtool: '#eval-source-map',
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: '',
        template: "./src/index.html",
        inject: "body",
        chunks: ['main'],
      })
    ],
    module: {
      rules: [{
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", 'less-loader']
        },
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/
        }, {
          test: /\.(htm|html)$/,
          use: 'html-withimg-loader'
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash:8]',
              context: path.resolve(__dirname, "src"),
            }
          }]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]?[hash:8]',
              context: path.resolve(__dirname, "src"),
            }
          }]
        }
      ]
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js', // 别名，这是一个正则的写法，表示以vue结尾的，如import Vue from 'vue' 表示 import Vue from 'vue/dist/vue.esm.js'
        '@': path.resolve('src'),
      }
    },
    devServer: {
      contentBase: './dist',
      port: 8080,
      open: true,
      hot: true,
      compress: true
    },
  }
}