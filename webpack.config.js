const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');


module.exports = {
   entry: './src/main/react/index.jsx',

   devServer: 
   {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      port: 9001,
      open: true,
      liveReload: true 
   },

   module : {
      rules: [
         {
            test   : /\.(js|jsx)$/,
            exclude: /node_modules/,
            use    : {
               loader: "babel-loader"
            }
         },
         {
            test: /\.html$/,
            use : [
               {
                  loader: "html-loader"
               }
            ]
         }
      ]
   },
   plugins: 
   [
      new HtmlWebPackPlugin(
      {
         template: "./src/main/react/templates/index.html",
         filename: "./index.html"
      })
   ]
};

