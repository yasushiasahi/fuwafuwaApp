const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

isProduction
  ? (module.exports = {
    mode: 'production',
    entry: {
      lottie: './src/lottie/nowLoading.js',
      main: './src/index.js'
    },
    output: {
      path: `${__dirname}/dist`,
      filename: '[name].js'
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
            }
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
        favicon: './src/favicon.ico',
        meta: [
          {
            name: 'description',
            content:
              '福岡市南区、玉川町の美容室･美容院･ヘアサロン。明るい白髪染めとヘッドスパのスペシャリストがあなたの魅力を最大限に引き出します。'
          },
          {
            name: 'keywords',
            content:
              'フワフワ,フワフワ美容室,フワフワ!美容室,フワフワ！美容室,福岡,南区,玉川町,美容院,美容室,ヘアサロン,予約'
          },
          { name: 'viewport', content: 'width=device-width,initial-scale=1' }
        ]
      })
    ]
  })
  : (module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
      lottie: './src/lottie/nowLoading.js',
      main: './src/index.js'
    },
    output: {
      path: `${__dirname}/dist`,
      filename: '[name].js'
    },
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
        favicon: './src/favicon.ico',
        meta: { viewport: 'width=device-width,initial-scale=1' }
      })
    ]
  })
