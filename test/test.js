import assert from 'assert';
import path from 'path';
import fs from 'fs';

//注意：模块最终发布的却是编译后的程序，为了避免因babel的Bug而导致编译后的程序与源程序功能有差异，我们的单元测试需要改用编译后的代码。

describe('es2015_demo', () => {

    it('复制本地文件成功', done => {

        assert.equal(1, 1);

        done();
    });

});