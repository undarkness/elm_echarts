/*
 * @Date: 2019-06-01 01:15:01
 */
const resolve = require("path").resolve;
const webpack = require("webpack");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const url = require("url");
const publicPath = "";

module.exports = (options = {}) => ({
  entry: {
    vendor: "./src/vendor",
    index: "./src/main.js"
  },
  output: {
    path: resolve(__dirname, "dist"),
    filename: options.dev ? "[name].js" : "[name].js?[chunkhash]",
    chunkFilename: "[id].js?[chunkhash]",
    publicPath: options.dev ? "/assets/" : publicPath
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"]
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        exclude: /node_modules/,
        include: [
          resolve("src"),
          resolve("static"),
          resolve("/node_modules/element-ui/src"),
          resolve("/node_modules/element-ui/packages")
        ]
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    /*    new webpack.optimize.SplitChunksPlugin({
      chunks: "initial", // 必须三选一： "initial" | "all"(默认就是all) | "async"
      minSize: 0, // 最小尺寸，默认0
      minChunks: 1, // 最小 chunk ，默认1
      maxAsyncRequests: 1, // 最大异步请求数， 默认1
      maxInitialRequests: 1, // 最大初始化请求书，默认1
      name: function() {}, // 名称，此选项可接收 function
      cacheGroups: {
        // 这里开始设置缓存的 chunks
        priority: 0, // 缓存组优先级
        vendor: {
          // key 为entry中定义的 入口名称
          chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是异步)
          name: "vendor", // 要缓存的 分隔出来的 chunk 名称
          minSize: 0,
          minChunks: 1,
          enforce: true,
          maxAsyncRequests: 1, // 最大异步请求数， 默认1
          maxInitialRequests: 1, // 最大初始化请求数，默认1
          reuseExistingChunk: true // 可设置是否重用该chunk（查看源码没有发现默认值）
        }
      }
    }), */
    new webpack.optimize.SplitChunksPlugin({
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        },
        //打包重复出现的代码
        vendor: {
          chunks: "initial",
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0, // This is example is too small to create commons chunks
          name: "vendor"
        },
        //打包第三方类库
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: Infinity
        }
      }
    }),
    new webpack.optimize.RuntimeChunkPlugin({
      name: "manifest"
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],
  resolve: {
    alias: {
      "~": resolve(__dirname, "src")
    },
    extensions: [".js", ".vue", ".json", ".css"]
  },
  devServer: {
    host: "127.0.0.1",
    port: 8010,
    proxy: {
      "/api/": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? "/assets/" : publicPath).pathname
    }
  },
  devtool: options.dev ? "#eval-source-map" : "#source-map"
});
