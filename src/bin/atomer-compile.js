/**
 * Created by jjq on 5/4/17.
 */
var fs = require('fs');
var atomPackage = require("../lib/atom-package");
let debug = require('debug');

let colors = require('colors');

let log = debug('atomer:compile');

var atomConfig = atomPackage.load();


var cwd = process.cwd();
var configJsFile = cwd+"/atom.config.js";
if(fs.existsSync(configJsFile)){
    let configObj = require(configJsFile);
    if(configObj.plugins){
        configObj.plugins.forEach((plugin)=>{
            plugin(atomConfig);
        })
        log(colors.blue("atomer compile success!"));
    }
}else{
    log(colors.red("atom.config.js file not found!"));
}
