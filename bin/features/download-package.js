/**
 * Created by jjq on 5/3/17.
 */
var fs = require("fs");
var download = require("../../lib/download");


var tmpDir = process.cwd()+"/tmp";

function downloadPackage(packageName,callback){
    var repoName = packageName;
    var localFileName = tmpDir+"/"+repoName+".tar.gz";
    var fileUrl = "http://127.0.0.1:9090/servlet-demo/SvnServlet?repo="+repoName;

    if (!fs.existsSync(tmpDir)){
        fs.mkdirSync(tmpDir);
    }

    /**
     expect(foo).to.not.equal(null);
     expect(foo).to.not.be.null;
     should.exist(foo); // will pass for not null and not undefined
     should.not.equal(foo, null);
     **/

    download(fileUrl,localFileName,function (err) {
        if (err){
            console.log(err.stack);
            process.exit(1);
        }
        callback(localFileName, repoName);
    });
}

module.exports = downloadPackage;
