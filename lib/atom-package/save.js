/**
 * Created by jjq on 5/3/17.
 */
var fs = require("fs");

module.exports = function(packageFile,config){
    if (fs.existsSync(packageFile)){
        // JSON.stringify(json,null,"\t");  //缩进一个tab
        //JSON.stringify(json,null,5);     //缩进5个空格
        fs.writeFileSync(packageFile,JSON.stringify(config, null, "\t"));

    }
}