#!/usr/bin/env node

var atomPackage = require("../lib/atom-package");
var program = require("commander");



//在package中设置bin后可以调用以下命令，免得使用npm publish
var cwd = process.cwd();
var config = atomPackage.load();

if(config){
    //console.log("发现atomer 配置文件 atom.json,内容为:");
    //console.log(config);
    var pkg = require(cwd+"/package.json");
    program.version(pkg.version)
        .command('install [name]', 'install one atom packages')
        .command('uninstall [name]', 'uninstall one atom package')
        .parse(process.argv);

}else{
    console.warn("没有找到atom 配置文件!");
    process.exit(1);
}
