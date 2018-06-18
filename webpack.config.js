const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

isProduction?
module.exports = {
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: {
                      node: 'current'
                    }
                  }
                ],
                'react'
              ],
              plugins: ['react-hot-loader/babel', 'babel-plugin-styled-components']
            }
          },
        ],
        exclude: /node_modules/
      },

      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: path => {
                return `./images/${path}`
              }
            }
          }
        ]
      },

      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'フワフワ！美容室',
      template: './src/index.html',
      favicon: './src/favicon.ico'
    })
  ]
}

:

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',

  devServer: {
    contentBase: 'dist',
    open: true,
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: {
                      node: 'current'
                    }
                  }
                ],
                'react'
              ],
              plugins: ['react-hot-loader/babel', 'babel-plugin-styled-components']
            }
          },
          'stylelint-custom-processor-loader'
        ],
        exclude: /node_modules/
      },

      {
        test: /\.jpg$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: path => {
                return `./images/${path}`
              }
            }
          }
        ]
      },

      {
        test: /\.(png|svg)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'フワフワ！美容室',
      template: './src/index.html',
      favicon: './src/favicon.ico'
    })
  ]
}
