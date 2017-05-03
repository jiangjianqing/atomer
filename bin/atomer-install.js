/**
 * Created by jjq on 5/3/17.
 */

var program = require("commander");
var atomPackage= require("../lib/atom-package");

var downloadPackage = require("./features/download-package");
var unpackToNodeModules = require("./features/unpack-to-node-modules");

var packageName;
program
    .action(function (name) {
        packageName = name;
    });

program.parse(process.argv);

if(packageName){
    var config = atomPackage.load();
    config.dependencies[packageName] = "latest";
    atomPackage.save(config);

    downloadPackage(packageName,function(tarFileName, repoName){
        unpackToNodeModules(tarFileName, repoName, function(){
            console.log("unpack package [ %s  ] ok!",tarFileName);
        });
    });
    //todo:下载包并安装到node_modules
}


