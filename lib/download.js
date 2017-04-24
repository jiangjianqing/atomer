var fs = require("fs");
var request = require("request");

function downloadFile(uri, filename, callback){
    var stream = fs.createWriteStream(filename);
    request(uri).pipe(stream).on('close', callback);
}

var repoName = "test";
var localFileName = repoName+".tar.gz";
var fileUrl = "http://127.0.0.1:9090/servlet-demo/SvnServlet?repo="+repoName;

downloadFile(fileUrl,localFileName,function () {
    console.log("download ok!");

});