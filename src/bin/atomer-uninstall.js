/**
 * Created by jjq on 5/4/17.
 */

var program = require("commander");
var atomPackage = require("../lib/atom-package");
var deleteAtomPackage = require("./features/deletel-atom-package");

var packageName;
program
    .action(function (name) {
        packageName = name;
    });

program.parse(process.argv);

var config = atomPackage.load();

if(packageName){
    if(config["dependencies"][packageName]){
        deleteAtomPackage(packageName);
        delete config["dependencies"][packageName];
        atomPackage.save(config);
    }

}