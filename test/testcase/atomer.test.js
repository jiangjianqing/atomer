import assert from 'assert';
import fs from "fs";
var should = require('chai').should(); //注意：使用should()后会污染js中对象的原型对象
var expect=require('chai').expect;
var extract = require("../../lib/extract.js");
var download = require("../../lib/download.js");
var deleteFolder = require("../../lib/deleteFolder");

var config;

var moduleDir = __dirname+"/node_modules";


function downloadRepoToLocal(repo, localDir, callback){
    var repoName = repo;
    var localFileName = localDir+"/"+repoName+".tar.gz";
    var fileUrl = "http://127.0.0.1:9090/servlet-demo/SvnServlet?repo="+repoName;

    /**
     expect(foo).to.not.equal(null);
     expect(foo).to.not.be.null;
     should.exist(foo); // will pass for not null and not undefined
     should.not.equal(foo, null);
     **/

    download(fileUrl,localFileName,function (error) {
        callback(error, localFileName, repoName);
    });
}
describe('atomer 完整测试', () => {
    before(function() {
        deleteFolder(moduleDir);
        fs.mkdirSync(moduleDir);
    });

    after(function() {
        //deleteFolder(moduleDir);
    });

    it('读取atomer-example.json', done => {
        //config = require("../resources/atomer-example.json");
        config = JSON.parse(fs.readFileSync(__dirname+"/../resources/atomer-example.json"));
        should.exist(config);
        done();
    });

    it("iterate dependencies field", done => {
        var i =0;
        var j=0;
        setTimeout(function () {
            if (i>0 && i===j){
                done();
            }else{
                throw new Error("测试失败");
            }
        },1500);
        for(var repo in config.dependencies){
            i += 1;
            var repoName = repo;
            downloadRepoToLocal(repoName,moduleDir,function(error,localFileName,repoName){
                should.not.exist(error);
                var repoDir = moduleDir+"/"+repoName;
                extract(localFileName,repoDir,function (error) {

                    console.log(localFileName);
                    console.log(repoDir);
                    should.not.exist(error);
                    fs.unlinkSync(localFileName);
                    j += 1;
                });
            });
        }
        //console.log(config.dependencies["app"]);
    });

});