const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');

module.exports = env => {
    const {
        mode = 'production',
        debug = false,
        watch = false,
    } = env;
    const plugins = [
        new webpack.EnvironmentPlugin({
            'process.env.NODE_ENV': mode,
            'process.env.DEBUG': debug,
        }),
        new CleanWebpackPlugin({
            verbose: mode === 'development',
        }),
        new DotEnvPlugin({
            path: './.env',
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'server', 'templates', 'login.pug'),
            chunks: ['login'],
            filetype: 'pug',
            filename: path.resolve(__dirname, 'build', 'server', 'views', 'login.pug'),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'server', 'templates', 'app.pug'),
            chunks: ['app'],
            filetype: 'pug',
            filename: path.resolve(__dirname, 'build', 'server', 'views', 'app.pug'),
        }),
    ];

    return {
        entry: {
            login: path.resolve(__dirname, 'client', 'login', 'entry.tsx'),
            app: path.resolve(__dirname, 'client', 'app', 'entry.tsx'),
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].[hash].bundle.js',
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    exclude: /node_modules/,
                    use: 'ts-loader',
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000'
                },
            ],
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
        },
        mode,
        watch,
        plugins,
    }
};
