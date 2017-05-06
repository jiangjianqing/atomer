/**
 * Created by jjq on 5/3/17.
 */

var program = require("commander");
var atomPackage= require("../lib/atom-package");
var util = require("util");

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

var installPackage = function(pkgName,successCallback){
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
            if(successCallback){
                successCallback();
            }
        }
    ]);

    s.fail(function(error){
        console.log("download package [%s] failed!", pkgName);
        if(successCallback){
            successCallback(error);
        }
    });

    s.run(pkgName);
};

var config = atomPackage.load();
if(packageName){

    if (!util.isObject(config["dependencies"])){
        config["dependencies"] = {};
    }

    config["dependencies"][packageName] = "latest";
    atomPackage.save(config);

    installPackage(packageName);
}else{
    for(var pkgName in config["dependencies"]) {
        installPackage(pkgName);
    }
}


