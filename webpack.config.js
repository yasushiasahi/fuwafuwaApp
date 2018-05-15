const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist',
    open: true,
    port: 3001
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['env', { 'modules': false }], 'react'],
              plugins: ['react-hot-loader/babel', 'babel-plugin-styled-components'],
            }
          },
          {
            loader: 'stylelint-custom-processor-loader',
            options: {
              emitWarning: true,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'フワフワ！美容室',
      template: './src/html/template.html',
      favicon: './src/favicon.ico'
    })
  ]
};
