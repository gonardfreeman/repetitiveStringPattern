const path = require('path');
const webpack = require('webpack');

const paths = {
  src: path.resolve(__dirname, 'src'),
  output: path.resolve(__dirname, './build')
};

const filenames = {
  js: 'bundle.js'
};

const babelLoader = {
  loader: 'babel-loader',
  options: { sourceMap: true }
};

const config = {
  entry: path.resolve(paths.src, 'index.js'),
  output: {
    path: paths.output,
    filename: filenames.js
  },
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    hot: true,
    filename: 'bundle.js',
    compress: false,
    port: 9000,
    historyApiFallback: {
      rewrites: [{ from: /^\/$/, to: '/views/index.html' }]
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [babelLoader]
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: 'hidden-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  }
};

module.exports = config;
