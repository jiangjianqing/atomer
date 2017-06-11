/**
 * Created by jjq on 5/3/17.
 */
var fs = require("fs");
var download = require("../../lib/download");
var sh = require("shelljs");

//2017.05.06 shelljs的api中居然写成了tempDir，坑。。。。
var tmpDir = sh.tempdir()+"/atomer_download_tmp";//process.cwd()+"/tmp";

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

    download(fileUrl,localFileName,function (error) {
        if(error){
            error.repoName = packageName;
        }
        callback(error, localFileName, repoName);
    });
}

module.exports = downloadPackage;
