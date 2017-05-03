import assert from 'assert';
import fs from "fs";
var should = require('chai').should(); //注意：使用should()后会污染js中对象的原型对象
var expect=require('chai').expect;

var tar = require("../../lib/tar");
var deleteFolder = require("../../lib/deleteFolder");

//var atomerConfig = JSON.parse(fs.readFileSync("atomer-example.json"));

//注意：模块最终发布的是编译后的程序，为了避免因babel的Bug而导致编译后的程序与源程序功能有差异，单元测试需要改用编译后的代码。

//console.log(atomerConfig);

var tmp = process.cwd()+"/tmp/";
describe.skip('tar test', () => {

    it('pack test', done => {
        var gzFile = tmp +"packed_test.tar.gz";
        tar.pack(__dirname,gzFile,function(err){
            should.not.exist(err);
            fs.unlinkSync(gzFile);
            done();
        });

    });

    it("unpack test", done => {
        var repoName= "app";
        var filename = __dirname + "/../resources/"+repoName+".tar.gz";
        var targetDir= tmp +repoName;
        console.log(targetDir);
        tar.unpack(filename,targetDir,function(error){
            deleteFolder(targetDir);
            should.not.exist(error);
            done();
        });
    });

});