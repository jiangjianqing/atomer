/**
 * Created by jjq on 5/3/17.
 */

var program = require("commander");
var atomPackage= require("../lib/atom-package");

var downloadPackage = require("./features/download-package");
var unpackToNodeModules = require("./features/unpack-to-node-modules");
var execNpmInstall = require("./features/exec-npm-install");

var Series = require("../lib/series");

var packageName;
program
    .action(function (name) {
        packageName = name;
    });

program.parse(process.argv);

var config = atomPackage.load();
if(packageName){

    config.dependencies[packageName] = "latest";
    atomPackage.save(config);

    var s = new Series();
    s.init([
        function (callback, pkgName) {
            downloadPackage(pkgName,callback);
        },
        function(callback, tarFileName, repoName){
            unpackToNodeModules(tarFileName, repoName, function(){
                console.log("unpack package [ %s  ] ok!",tarFileName);
            });
        }
    ]);

    s.run(packageName);
    //todo:下载包并安装到node_modules
}else{
    for(var pkgName in config["dependencies"]) {
        var s = new Series();
        s.init([
            function(callback, pkgName){
                downloadPackage(pkgName,callback);
            },
            function(callback, tarFileName, repoName){
                unpackToNodeModules(tarFileName, repoName, callback);
            },
            function(callback, targetDir, repoName){
                console.log("unpack package [ %s  ] ok!",repoName);
                execNpmInstall(targetDir);
            }
        ]);

        s.run(pkgName);

    }
}


