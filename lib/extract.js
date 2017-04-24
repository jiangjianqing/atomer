var fs = require('fs');
var read = fs.createReadStream;
var unpack = require('tar-pack').unpack;
var deleteFolder = require("./deleteFolder");

function extract(tarFileName,targetDir,callback){
    read(tarFileName)
        .pipe(unpack(targetDir, function (error) {
            if(error){
                deleteFolder(targetDir);
            }
            callback(error);
        }));
}

module.exports = extract;
