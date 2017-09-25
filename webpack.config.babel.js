import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const flux = path.resolve(__dirname, 'flux');
const app = path.resolve(__dirname, 'site');

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.join(__dirname, '/site/index.html'),
  inject: 'body'
});

const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: 'flux.css',
  disable: false,
  allChunks: true
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([{ from: 'site/static', to: 'static' }]);

const PATHS = {
  app,
  build: flux
};

const LAUNCH_COMMAND = process.env.npm_lifecycle_event;

const isProduction = LAUNCH_COMMAND === 'production';

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
});

const base = {
  entry: [
    PATHS.app
  ],
  output: {
    path: PATHS.build,
    filename: 'flux.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  }
};

const developmentConfig = {
  devServer: {
    publicPath: '',
    contentBase: path.join(__dirname, 'flux'),
    quiet: true,
    inline: true,
    compress: true,
    stats: 'errors-only',
    open: false
  },
  devtool: 'cheap-module-inline-source-map',
  plugins: [
    CopyWebpackPluginConfig,
    ExtractTextPluginConfig,
    HtmlWebpackPluginConfig,
  ]
};

const productionConfig = {
  devtool: 'cheap-module-source-map',
  plugins: [HtmlWebpackPluginConfig, productionPlugin]
};

export default Object.assign({}, base,
  isProduction === true ? productionConfig : developmentConfig
);
