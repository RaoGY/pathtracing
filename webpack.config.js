const path = require("path");
const webpack = require("webpack");
const root = (...args) => path.resolve(__dirname, ...args);

function devServer() {
    return {
        contentBase: root("./"),
        inline: true,
        host: '0.0.0.0',
        port: 5000
    }
}

function entries() {
    return {
        testbed: "./src/Main.ts",
    };
}

function rules() {
    return [
        { test: /\.(ts|tsx)$/, loader: "ts-loader", exclude: /node_modules/ },
        { test: /\.(scss)$/, loader: "style-loader!css-loader!sass-loader", exclude: /node_modules/ },
        { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/, options: { cacheDirectory: true } },
        { test: /\.(glsl|vert|frag|css)$/, loader: "raw-loader", exclude: /node_modules/ }
    ];
}

function plugins() {
}

var config = {
    mode: "development",
    entry: entries(),
    output: {
        filename: "[name].bundle.js",
        path: root("./build"),
        publicPath: '/dist/'
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", "scss", ".glsl", ".vert", ".frag"]
    },
    module: {
        rules: rules()
    },
    plugins: plugins(),
    devServer: devServer()
};

module.exports = config;
