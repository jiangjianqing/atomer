#!/usr/bin/env node

let debug = require('debug');
debug.enable('*');

var atomPackage = require("../lib/atom-package");
var program = require("commander");
var colors = require('colors');


var cwd = process.cwd();
var config = atomPackage.load();

if(config){
    //console.log("发现atomer 配置文件 atom.json,内容为:");
    //console.log(config);
    var pkg = require(cwd + "/package.json");
    program.version(pkg.version)
        .command('install [name]', 'install one atom packages')
        .command('uninstall [name]', 'uninstall one atom package')
        .command('compile','compile atomer config into modules');
		//.description('run setup commands for all envs');//使用sub command一定要把description放在command的第二个参数
//如果没有使用action callback，则会使用sub command
    //使用sub command则option还没找到使用的办法
    //分开设置command，可以使用额外的options
  	program.parse(process.argv);

}else{
    console.warn(colors.red("没有找到atom 配置文件!"));
    process.exit(1);
}
