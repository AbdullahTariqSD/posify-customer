const path = require('path');
const slsw = require('serverless-webpack');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  optimization: {
    minimize: !slsw.lib.webpack.isLocal,
    nodeEnv: false,
  },
  performance: {
    hints: false,
  },
  devtool: 'source-map',
  externals: [nodeExternals()],
  resolve: {
    alias: {
      app: path.join(process.cwd(), 'app'),
    },
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
    sourceMapFilename: '[file].map',
  },
};
