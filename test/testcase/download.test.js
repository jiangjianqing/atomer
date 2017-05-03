import assert from 'assert';
import fs from "fs";
var should = require('chai').should(); //注意：使用should()后会污染js中对象的原型对象
var expect=require('chai').expect;
var download = require("../../lib/download.js");
console.log(process.cwd());

//var atomerConfig = JSON.parse(fs.readFileSync("atomer-example.json"));

//注意：模块最终发布的是编译后的程序，为了避免因babel的Bug而导致编译后的程序与源程序功能有差异，单元测试需要改用编译后的代码。

//console.log(atomerConfig);

describe.skip('download file', () => {

    it('http文件下载', done => {
        var repoName = "app";
        var localFileName = repoName+".tar.gz";
        var fileUrl = "http://127.0.0.1:9090/servlet-demo/SvnServlet?repo="+repoName;

        /**
        expect(foo).to.not.equal(null);
        expect(foo).to.not.be.null;
         should.exist(foo); // will pass for not null and not undefined
         should.not.equal(foo, null);
        **/

        download(fileUrl,localFileName,function (err) {
            fs.unlinkSync(localFileName);
            should.not.exist(err);
            done();
        });

    });

});