/**
 * Created by jjq on 5/4/17.
 */

var deleteFolder= require("../../lib/deleteFolder");

var nodeModulesDir = process.cwd()+"/node_modules/@focusight";

module.exports = function (packageName) {
    var targetDir = nodeModulesDir+"/"+packageName;
    deleteFolder(targetDir);
}