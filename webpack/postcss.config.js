module.exports = {
    plugins: [
        require('autoprefixer')(),
        // 移动端
        // require('postcss-pxtorem')({
        //     rootValue: 75,
        //     unitPrecision: 5,
        //     propList: ['*'],
        //     selectorBlackList: [],
        //     replace: true,
        //     mediaQuery: false,
        //     minPixelValue: 0
        // })
    ]
};