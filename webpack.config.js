const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    //filename: 'project-name.bundle.js'
    filename: 'index.[hash].js',
    clean: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
      template: 'index.html'
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    fallback: {
        fs: false
    }    
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude:path.resolve(__dirname, "node_modules")//exclude: /(node_modules)/
      },
        {
            test: /\.(png|svg)/,
            type: 'asset/resource',
        },
        {
            test: /\.(woff(2)?|eot|ttf|otf)$/,
            type: 'asset/inline',
        },
        {
          test: /\.scss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        }
    ]
  }
};  


