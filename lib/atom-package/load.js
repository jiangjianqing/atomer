/**
 * Created by jjq on 5/3/17.
 */

var fs = require("fs");

module.exports = function(packageFile){
    if (fs.existsSync(packageFile)){
        var config = require(packageFile);
        //todo：这里还可以加校验
        return config;
    }else{
        return;
    }
}
