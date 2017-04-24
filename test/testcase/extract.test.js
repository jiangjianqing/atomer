import assert from 'assert';
import fs from "fs";
var should = require('chai').should(); //注意：使用should()后会污染js中对象的原型对象
var expect=require('chai').expect;
var extract = require("../../lib/extract.js");
console.log(process.cwd());

//var atomerConfig = JSON.parse(fs.readFileSync("atomer-example.json"));

//注意：模块最终发布的是编译后的程序，为了避免因babel的Bug而导致编译后的程序与源程序功能有差异，单元测试需要改用编译后的代码。

var deleteFolder =  function(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

describe('extract', () => {

    it('解压缩tar.gz文件', done => {
        var repoName= "app";
        var filename = __dirname + "/../resources/"+repoName+".tar.gz";
        var targetDir= __dirname+"/"+repoName;
        extract(filename,targetDir,function(error){
            deleteFolder(targetDir);
            should.not.exist(error);
            done();
        });

    });

});