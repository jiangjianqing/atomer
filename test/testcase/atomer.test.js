import assert from 'assert';
import fs from "fs";
var should = require('chai').should(); //注意：使用should()后会污染js中对象的原型对象
var expect=require('chai').expect;
var extract = require("../../lib/extract.js");

var config;
describe('atomer 完整测试', () => {

    it('读取atomer-example.json', done => {
        //config = require("../resources/atomer-example.json");
        config = JSON.parse(fs.readFileSync(__dirname+"/../resources/atomer-example.json"));
        should.exist(config);
        done();
    });

    it("iterate dependencies field", done => {
        //console.log(config.dependencies["app"]);
        done();
    });

});