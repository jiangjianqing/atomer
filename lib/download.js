var fs = require("fs");
var request = require("request");
//https://www.npmjs.com/package/request

function download(uri, filename, callback){
    //var stream = fs.createWriteStream(filename);
    request.get(uri).on("error",function(error){
        fs.unlinkSync(filename);
        callback(error);
    }).pipe(fs.createWriteStream(filename)).on('close', function(){
        callback();
    });
}

module.exports = download;