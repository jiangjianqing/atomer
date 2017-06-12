module.exports = {
    "name" : "vistion-app",
    "version" : "0.0.1",
    "builder" : "webpack2",  //babel \ webpack2 \ browserify \ rollup
    "private" : false, //映射npm private属性，用于阻止npm publish
  	"bin" : false,	//是否开发命令行应用，这时只需要babel和gulp即可,设置了bin，也就相当于设置了lib
    "lib" : true,   //标记是否为一个通用库，源码存放于src，编译后的代码存放于lib ,dist目录下存放压缩后的bundle
    "frameworks" : [
        "react","page","vue"
    ]
};
