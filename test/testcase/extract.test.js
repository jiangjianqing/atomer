import assert from 'assert';
import fs from "fs";
var should = require('chai').should(); //注意：使用should()后会污染js中对象的原型对象
var expect=require('chai').expect;
var extract = require("../../lib/extract");
var deleteFolder = require("../../lib/deleteFolder");

//var atomerConfig = JSON.parse(fs.readFileSync("atomer-example.json"));

//注意：模块最终发布的是编译后的程序，为了避免因babel的Bug而导致编译后的程序与源程序功能有差异，单元测试需要改用编译后的代码。

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