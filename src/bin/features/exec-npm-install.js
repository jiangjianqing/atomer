/**
 * Created by jjq on 5/3/17.
 */
/*
查阅资料:
    https://www.npmjs.com/package/shelljs
    http://www.cnblogs.com/chyingp/p/node-learning-guide-child_process.html

    shelljs真的非常好用，多看看其手册
*/
var sh = require("shelljs");

module.exports = function (targetDir) {
    var packageFile = targetDir+"/package.json";
    if(sh.test('-f', packageFile)){
        console.log("发现 "+packageFile);
        sh.exec("npm install",{cwd:targetDir});
    }
}