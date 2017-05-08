/**
 * Created by jjq on 5/3/17.
 */

var program = require("commander");
var atomPackage= require("../lib/atom-package");
var util = require("util");

var downloadPackage = require("./features/download-package");
var unpackToNodeModules = require("./features/unpack-to-node-modules");
var execNpmInstall = require("./features/exec-npm-install");

var Series = require("../lib/async/series");

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
            successCallback();
        }
    ]).fail(function(error){
        successCallback(error);
    }).run(pkgName);
};

var outputDownloadError = function(error){
    if (error.NotFoundError){
        console.warn("Can not find package [%s]!", error.repoName);
    }else{
        console.warn("download package [%s] encounter error!", error.repoName);
    }
};

var config = atomPackage.load();
if(packageName){

    installPackage(packageName, function(error){
        if(util.isNullOrUndefined(error)){
            if (!util.isObject(config["dependencies"])){
                config["dependencies"] = {};
            }

            config["dependencies"][packageName] = "latest";
            atomPackage.save(config);
        }else{
            outputDownloadError(error);
        }
    });

}else{
    for(var pkgName in config["dependencies"]) {
        installPackage(pkgName, function(error){
            if(!util.isNullOrUndefined(error)) {
                outputDownloadError(error);
            }
        });
    }
}


