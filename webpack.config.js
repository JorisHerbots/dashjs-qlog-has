const path = require('path');
module.exports = {
    target: 'web',
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [ 
            {
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
            use: 'ts-loader',
            exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js'],
        symlinks: false
    },
    output: {
        library: 'DashjsQlog',
        libraryTarget: 'window',
        path: path.resolve(__dirname, 'dist'),
        filename: 'dashjs-qlog.js'
    },
    mode: "development",
    // externals: {
    //     "@quictools/qlog-schema": "@quictools/qlog-schema"
    // }
};