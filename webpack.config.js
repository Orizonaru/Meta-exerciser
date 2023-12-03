
const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require("html-inline-css-webpack-plugin").default;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = (env, argv) => {
    return {
        entry: {
            components : './src/js/components.js',
            common : './src/js/common.js',
        },
        mode: env.production ? 'production' : 'development',
        output: {
            path: env.production ? path.resolve(__dirname, 'build/dist/js') : path.resolve(__dirname, 'dist/js'),
            filename: '[name].bundle.js'
        },
        devtool: env.production ? false : 'source-map',
        resolve: {
            alias: {
                // add as many aliases as you like!
                Assets: path.resolve(__dirname, 'build'),
                Components: path.resolve(__dirname, 'src/js/components'),
                Services: path.resolve(__dirname, 'src/js/services'),
                Locales: path.resolve(__dirname, 'assets/locales'),
                Fonts: path.resolve(__dirname, 'assets/fonts')
            }
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        'style-loader',
                        ...(env.production ? [
                            {
                                loader: MiniCssExtractPlugin.loader,
                                options: {
                                    esModule: false,
                                },
                            },
                        ] : []),
                        {
                            loader: 'css-loader', options: { importLoaders: 1 }
                        },
                        'postcss-loader',
                    ],
                },
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: false,
                            },
                        }
                    ],
                },
                {
                    test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                emitFile: false,
                                name: '[name].[ext]',
                                outputPath: env.production ? '/meta-exerciser/assets/fonts' : '../../assets/fonts'
                            }
                        }
                    ]
                },
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                            plugins: [
                                ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ],
                        }
                    }
                }
                

            ]
        },
        optimization: {
            minimizer: [
                new TerserPlugin(),
                new CssMinimizerPlugin(),
            ],
        },
        devServer: {
            watchContentBase: true,
            contentBase: path.resolve(__dirname, 'dist'),
            open: true,
            hot: true,
        },
        plugins: [
            ...(env.production ? [
                new CopyPlugin({
                    patterns: [
                        { from: "assets", to: path.resolve(__dirname, 'build/assets'), noErrorOnMissing: true },
                        { from: "favicon.ico", to: path.resolve(__dirname, 'build/') }
                    ],
                }),
                new MiniCssExtractPlugin(),
                new HtmlWebpackPlugin({
                    inject: false,
                    minify: false,
                    filename: path.resolve(__dirname, 'build')+'/index.html',
                    template: './index.html',
                    chunks: ['common','components'],
                }),
                new HTMLInlineCSSWebpackPlugin(),
            ] : [
                new webpack.HotModuleReplacementPlugin(),
            ]),
        ]
    }
};
