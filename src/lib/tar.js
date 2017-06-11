var fs = require("fs");
var write = fs.createWriteStream;
var read = fs.createReadStream;
var tarpack=require('tar-pack');
var pack = tarpack.pack;
var unpack = tarpack.unpack;

function Tar(){

}

Tar.prototype.pack = function(targetDir,filename,callback){
    pack(targetDir)
        .pipe(write(filename))
        .on('error', function (err) {
            callback(err);
            //console.error(err.stack)
        })
        .on('close', function () {
            callback();
        });
}

Tar.prototype.unpack = function (tarFileName,targetDir,callback){
    read(tarFileName)
        .pipe(unpack(targetDir, function (err) {
            callback(err);
        }));
}

module.exports = new Tar();
