var path = require('path');
var webpack = require('webpack');

var isProd = (process.env.NODE_ENV === 'production');

var plugins = [ new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
}) ];

if (!isProd) {
  plugins = plugins.concat(new webpack.optimize.OccurenceOrderPlugin(),
                           new webpack.HotModuleReplacementPlugin(),
                           new webpack.NoErrorsPlugin());
}

module.exports = {
  devtool: (isProd ? null : 'eval'),
  entry: isProd ? path.join(__dirname, 'src', 'index.js') : [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'src', 'index.js'),
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      include: path.join(__dirname, 'src'),
    }]
  },
  plugins: plugins
};
