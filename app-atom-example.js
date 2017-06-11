module.exports = {
    "name" : "vistion-app",
    "version" : "0.0.1",
    "builder" : "webpack2",  //webpack2 \ browserify \ rollup
    "private" : false, //映射npm private属性，用于阻止npm publish
    "lib" : true,   //标记是否为一个通用库，源码存放于src，编译后的代码存放于lib ,dist目录下存放压缩后的bundle
    "frameworks" : [
        "react","page"
    ]
};