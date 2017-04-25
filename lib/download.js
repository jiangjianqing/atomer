var fs = require("fs");
var request = require("request");
//https://www.npmjs.com/package/request

function download(uri, filename, callback){
    //var stream = fs.createWriteStream(filename);

    request.get(uri).on('response', function(response) {
        //特别注意：这里存在问题，要是能出发error事件就好了
        if (response.statusCode>=300){
            throw new Error("file not found");
        }

        //console.log(response.headers['content-type']) // 'image/png'
    }).on("error",function(error){
        console.warn("***************888find error***************8888");
        fs.unlinkSync(filename);
        callback(error);
    }).pipe(fs.createWriteStream(filename)).on('close', function(){
        callback();
    });
}

module.exports = download;