var fs = require("fs");
var request = require("request");
//https://www.npmjs.com/package/request

function download(uri, filename, callback){
    //var stream = fs.createWriteStream(filename);

    request.get(uri).on('response', function(response) {
        //特别注意：这里存在问题，要是能出发error事件就好了
        if (response.statusCode>=300){
            var error = new Error("file not found on server!");
            error.NotFoundError = true;
            //20170508  触发错误不能用throw，需要用emit
            this.emit("error", error);
            //throw error;
        }

        //console.log(response.headers['content-type']) // 'image/png'
    }).on("error",function(error){
        fs.unlinkSync(filename);
        callback(error);
    }).pipe(fs.createWriteStream(filename)).on('close', function(){
        callback();
    });
}

module.exports = download;