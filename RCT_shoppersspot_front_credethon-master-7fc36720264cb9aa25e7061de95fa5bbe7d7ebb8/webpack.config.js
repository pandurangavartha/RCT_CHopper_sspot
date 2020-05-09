var config = {
    entry: './main.js',
    output: {
        path: '/',
        filename: 'index.js',
    },
    // devServer: {
    //     inline: true,
    //     port: 2000,
    //     historyApiFallback: true
    // },
    module: {
        rules: [
            {
                exclude: /(node_modules|bower_components)/,
                test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/, //Check for all js files
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015', 'stage-3'],
                    "plugins": ["transform-es2015-destructuring", "transform-object-rest-spread"]

                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react'],
                    "plugins": ["transform-es2015-destructuring", "transform-object-rest-spread"]
                },

            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                    'url-loader?limit=10000',
                    'img-loader'
                ]
            }
        ],
        loaders: [
            // the url-loader uses DataUrls. 
            // the file-loader emits files. 
            {
                test: /\.(svg|woff|woff2|ttf|eot|otf)([\?]?.*)$/,
                loader: 'file-loader?name=assets/fonts/[name].[ext]',
            },
            { 
              test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
              loader: "url-loader?limit=10000&mimetype=application/font-woff" 
            },
            { 
              test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
              loader: "file-loader" 
            },
          ]
    }
}
module.exports = config;

