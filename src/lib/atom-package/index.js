/**
 * Created by jjq on 5/3/17.
 */
var cwd = process.cwd();
var configFile = cwd+"/atom.json";

var load = function() {
    return require("./load")(configFile);
}

var save = function(config){
    return require("./save")(configFile,config);
}
module.exports= {
    "load" : load,
    "save" : save
};