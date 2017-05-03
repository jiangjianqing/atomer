/**
 * Created by jjq on 5/3/17.
 */
var fs = require("fs");
var unpack = require("../../lib/tar").unpack;
var nodeModulesDir = process.cwd()+"/node_modules/@focusight";

module.exports = function(tarFileName,repoName, callback){
    if (!fs.existsSync(nodeModulesDir)){
        fs.mkdirSync(nodeModulesDir);
    }
    var targetDir = nodeModulesDir+"/"+repoName;
    unpack(tarFileName,targetDir,function(err){
        //deleteFolder(targetDir);
        if(err){
            console.log(err.stack);
            process.exit(1);
        }
        //返回解压目录，后续可以执行npm
        callback(err, targetDir, repoName);
    });
}