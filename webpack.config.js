const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')

const settings = {
  distPath: path.join(__dirname, 'dist'),
  srcPath: path.join(__dirname, 'src')
}

function srcPathExtend (subpath) {
  return path.join(settings.srcPath, subpath)
}

module.exports = (env, options) => {
  const isDevMode = options.mode === 'development'

  return {
    devtool: isDevMode ? 'source-map' : false,
    resolve: {
      extensions: ['.ts', '.tsx', '.js']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['babel-loader', 'ts-loader']
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: isDevMode
              }
            }
          ]
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]'
            }
          }
        },
        {
          test: /\.(jpe?g|png|gif|svg|ico)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                outputPath: 'assets/'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new ESLintPlugin(),
      new CleanWebpackPlugin({
        cleanAfterEveryBuildPatterns: [settings.distPath]
      }),
      new HtmlWebpackPlugin({
        template: srcPathExtend('index.html')
      })
    ]
  }
}
