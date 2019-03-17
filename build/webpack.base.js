const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const StyleLintPlugin = require('stylelint-webpack-plugin');
const createMdImport = require('./create-md-import');

module.exports = {
  entry: {
    polyfills: path.resolve(__dirname, '../src/polyfills.ts'),
    main: path.resolve(__dirname, '../src/main.ts')
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    sourceMapFilename: '[file].map'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json', '.scss', '.css'],
    alias: {
      // '@core': path.resolve(__dirname, '../src/app/core'),
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['to-string-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ['to-string-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(jpe?g|png|gif|eot|pdf|woff2?|svg|ttf|ico)(\?\S*)?$/,
        use: [
          {
            loader: 'url-loader',
            query: {
              limit: 8192,
              name: 'assets/img/[name].[ext]'
            }
          },
          'image-webpack-loader'
        ]
      },
      // {
      //   // Mark files inside `@angular/core` as using SystemJS style dynamic imports.
      //   // Removing this will cause deprecation warnings to appear.
      //   test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
      //   parser: { system: true } // enable SystemJS
      // },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: [
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false
            }
          },
          '@ngtools/webpack'
        ]
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: '@angular-devkit/build-optimizer/webpack-loader',
            options: {
              sourceMap: false
            }
          },
          '@ngtools/webpack',
          'tslint-loader'
        ],
        exclude: /node_modules/
      },
      {
        test: /\.md$/,
        use: ['raw-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body',
      favicon: './src/assets/favicon.ico',
      xhtml: true,
      minify: true
    }),
    // new StyleExtHtmlWebpackPlugin(path.resolve(__dirname, '../src/app/styles')),
    // new OptimizeCssAssetsPlugin({
    //   assetNameRegExp: /\.css$/g,
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: {
    //     discardComments: {
    //       removeAll: true
    //     }
    //   },
    //   canPrint: true
    // }),
    new StyleLintPlugin(),
    new AngularCompilerPlugin({
      tsConfigPath: path.resolve(__dirname, '../tsconfig.json'),
      entryModule: path.resolve(__dirname, '../src/app/pages/main/main.module#MainModule')
    })
    // new ExtractTextWebpackPlugin({
    //   filename: '[name].global.css'
    // })
  ]
};
