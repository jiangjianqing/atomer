import assert from 'assert';
require('chai').should(); //注意：使用should()后会污染js中对象的原型对象
var expect=require('chai').expect;
var fs = require('fs');
console.log(process.cwd());

//var atomerConfig = JSON.parse(fs.readFileSync("atomer-example.json"));

//注意：模块最终发布的是编译后的程序，为了避免因babel的Bug而导致编译后的程序与源程序功能有差异，单元测试需要改用编译后的代码。

//console.log(atomerConfig);

describe('es2015_demo', () => {

    it('复制本地文件成功', done => {

        assert.equal(1, 1);
        "test".should.have.length(4); //should已经属于原型方法
        var foo ="bar";
        expect(foo).to.be.a('string');
        expect(foo).to.equal('bar');
        expect(foo).to.have.length(3);
        //expect(beverages).to.have.property('tea').with.length(3);
        done();
    });

});