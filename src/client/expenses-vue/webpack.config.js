const path = require ('path');
const {VueLoaderPlugin} = require ('vue-loader');
console.log(__dirname);
module.exports = {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'public')
    },
    module:{
      rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }]
    },
    plugins:
      [new VueLoaderPlugin()]
     
  };