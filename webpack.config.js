const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const entryPath = "./www"

var entris = fs.readdirSync(entryPath).reduce((o,filename)=>{
    if(/\./.test(filename)) {

    } else if(filename != 'common') {
        (o[filename] = './'+path.join(entryPath,filename, 'main.js'));
    }
    return o;
},{vendor:['vue','element-ui','babel-polyfill']});

process.env.NDOE_ENV = process.env.NODE_ENV?process.env.NODE_ENV:'local'
var devFlag = new webpack.DefinePlugin({
    __NODE__ENV:(JSON.stringify(process.env.NODE_ENV)).trim()
});

const uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

module.exports = {
    entry : entris,
    output : {
        path: path.resolve(__dirname, "build/assets"),
        filename: '[name].bundle.js',
    },
    plugins : [
        new webpack.optimize.CommonsChunkPlugin({
                name: 'vendor' // Specify the common bundle's name.
            }),
        devFlag,
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'template.html'),
            filename:'index.html',
            chunks:['vendor','login'],
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'template.html'),
            filename:'baseManagement.html',
            chunks:['vendor','baseManagement'],
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname,'contract.html'),
            filename:'contract.html',
            hash: true,
            inject:false           
        }),
        new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true })
    ],
    module : {
        loaders:[
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader:  ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader"
                }) 
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    resolve:{
        alias:{
            'vue':'vue/dist/vue.js'
        }            
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        hot: true,
        inline: true,
        compress:true,
        contentBase: path.join(__dirname, "/build"),
        open:true,
        port: 8080,
    },
    devtool: '#eval-source-map',
};
if (process.env.NODE_ENV == 'local') {
    // module.exports.watch = true;
} else {
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
        minimize: true
    })
])
}