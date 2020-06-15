const assert = require('chai').assert;
const sinon = require('sinon');
const {dfs, bfs, generatePaths} = require('../src/graph');

describe('bfs',function() {
  it('single node not connected to itself', function () {
    const paths = [['aa','bb']]
    assert.isFalse(bfs(paths,'aa','aa'));
    assert.isFalse(bfs(paths,'aa','cc'));
    assert.isTrue(bfs(paths,'aa','bb'));
  });

  it('single node connected to itself', function () {
    const paths = [ ['aa', 'bb'], ['aa', 'aa'], ];
    assert.isTrue(bfs(paths, 'aa', 'aa'));
    assert.isFalse(bfs(paths, 'aa', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'bb'));
  });

  it('two nodes not connected', function () {
    const paths = [ ['aa', 'bb'], ['cc', 'dd'], ];
    assert.isFalse(bfs(paths, 'bb', 'bb'));
    assert.isFalse(bfs(paths, 'aa', 'cc'));
    assert.isFalse(bfs(paths, 'aa', 'dd'));
    assert.isFalse(bfs(paths, 'bb', 'cc'));
    assert.isFalse(bfs(paths, 'cc', 'aa'));
    assert.isFalse(bfs(paths, 'cc', 'bb'));
    assert.isTrue(bfs(paths, 'cc', 'dd'));
    assert.isTrue(bfs(paths, 'aa', 'bb'));
  });

  it('two nodes perfectly connected', function () {
    const paths = [ ['aa', 'bb'], ['bb', 'aa'] ];
    assert.isTrue(bfs(paths, 'bb', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'aa'));
    assert.isTrue(bfs(paths, 'aa', 'aa'));
    assert.isTrue(bfs(paths, 'aa', 'bb'));
  });

  it('two nodes sparsely connected', function () {
    const paths = [ ['aa', 'bb'], ['bb', 'cc'], ];
    assert.isTrue(bfs(paths, 'aa', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'cc'));
    assert.isFalse(bfs(paths, 'cc', 'bb'));
    assert.isFalse(bfs(paths, 'cc', 'aa'));
    assert.isFalse(bfs(paths, 'bb', 'aa'));
  });

  it('three nodes sparsely connected', function () {
    const paths = [ ['aa', 'bb'], ['bb', 'cc'], ['cc', 'dd'] ];
    assert.isTrue(bfs(paths, 'aa', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'dd'));
    assert.isFalse(bfs(paths, 'cc', 'bb'));
    assert.isFalse(bfs(paths, 'cc', 'aa'));
    assert.isFalse(bfs(paths, 'bb', 'aa'));
    assert.isFalse(bfs(paths, 'dd', 'cc'));
    assert.isFalse(bfs(paths, 'dd', 'aa'));
  });

  it('three nodes moderately connected', function () {
    const paths = [ ['aa', 'bb'], ['bb', 'cc'], ['cc', 'bb'] ];
    assert.isTrue(bfs(paths, 'aa', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'cc'));
    assert.isTrue(bfs(paths, 'cc', 'bb'));
    assert.isTrue(bfs(paths, 'cc', 'cc'));
    assert.isTrue(bfs(paths, 'bb', 'bb'));
    assert.isFalse(bfs(paths, 'bb', 'aa'));
    assert.isFalse(bfs(paths, 'aa', 'aa'));
  });

  it('three nodes perfectly connected', function () {
    const paths = [ ['aa', 'bb'], ['bb', 'cc'], ['cc', 'aa'] ];
    assert.isTrue(bfs(paths, 'aa', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'cc'));
    assert.isTrue(bfs(paths, 'cc', 'bb'));
    assert.isTrue(bfs(paths, 'cc', 'cc'));
    assert.isTrue(bfs(paths, 'bb', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'aa'));
    assert.isTrue(bfs(paths, 'aa', 'aa'));
  });
});


describe('generateDirectedPairs',function() {
  it('it should generate a key value pair of from to target place', function () {
    const reader = sinon.fake.returns('| aa | bb |\n| aa | aa |');
    const expectedValue = [ ['aa', 'bb'], ['aa', 'aa'] ];
    assert.deepStrictEqual(generatePaths(reader, 'temp_path', 'encoder'), expectedValue);
    assert.isTrue(reader.calledOnceWith('temp_path', 'encoder'));
  });
});

describe('dfs', function () {
  it('single node not connected to itself', function () {
    const paths = [['aa', 'bb']];
    assert.isFalse(dfs(paths, 'aa', 'aa'));
    assert.isFalse(dfs(paths, 'aa', 'cc'));
    assert.isTrue(dfs(paths, 'aa', 'bb'));
  });

  it('single node connected to itself', function () {
    const paths = [
      ['aa', 'bb'],
      ['aa', 'aa'],
    ];
    assert.isTrue(dfs(paths, 'aa', 'aa'));
    assert.isFalse(dfs(paths, 'aa', 'cc'));
    assert.isTrue(dfs(paths, 'aa', 'bb'));
  });

  it('two nodes not connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['cc', 'dd'],
    ];
    assert.isFalse(dfs(paths, 'bb', 'bb'));
    assert.isFalse(dfs(paths, 'aa', 'cc'));
    assert.isFalse(dfs(paths, 'aa', 'dd'));
    assert.isFalse(dfs(paths, 'bb', 'cc'));
    assert.isFalse(dfs(paths, 'cc', 'aa'));
    assert.isFalse(dfs(paths, 'cc', 'bb'));
    assert.isTrue(dfs(paths, 'cc', 'dd'));
    assert.isTrue(dfs(paths, 'aa', 'bb'));
  });

  it('two nodes perfectly connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'aa'],
    ];
    assert.isTrue(dfs(paths, 'bb', 'bb'));
    assert.isTrue(dfs(paths, 'bb', 'aa'));
    assert.isTrue(dfs(paths, 'aa', 'aa'));
    assert.isTrue(dfs(paths, 'aa', 'bb'));
  });

  it('two nodes sparsely connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
    ];
    assert.isTrue(dfs(paths, 'aa', 'bb'));
    assert.isTrue(dfs(paths, 'bb', 'cc'));
    assert.isTrue(dfs(paths, 'aa', 'cc'));
    assert.isFalse(dfs(paths, 'cc', 'bb'));
    assert.isFalse(dfs(paths, 'cc', 'aa'));
    assert.isFalse(dfs(paths, 'bb', 'aa'));
  });

  it('three nodes sparsely connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'dd'],
    ];
    assert.isTrue(dfs(paths, 'aa', 'bb'));
    assert.isTrue(dfs(paths, 'bb', 'cc'));
    assert.isTrue(dfs(paths, 'aa', 'cc'));
    assert.isTrue(dfs(paths, 'aa', 'dd'));
    assert.isFalse(dfs(paths, 'cc', 'bb'));
    assert.isFalse(dfs(paths, 'cc', 'aa'));
    assert.isFalse(dfs(paths, 'bb', 'aa'));
    assert.isFalse(dfs(paths, 'dd', 'cc'));
    assert.isFalse(dfs(paths, 'dd', 'aa'));
  });

  it('three nodes moderately connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'bb'],
    ];
    assert.isTrue(dfs(paths, 'aa', 'bb'));
    assert.isTrue(dfs(paths, 'bb', 'cc'));
    assert.isTrue(dfs(paths, 'aa', 'cc'));
    assert.isTrue(dfs(paths, 'cc', 'bb'));
    assert.isTrue(dfs(paths, 'cc', 'cc'));
    assert.isTrue(dfs(paths, 'bb', 'bb'));
    assert.isFalse(dfs(paths, 'bb', 'aa'));
    assert.isFalse(dfs(paths, 'aa', 'aa'));
  });

  it('three nodes perfectly connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'aa'],
    ];
    assert.isTrue(dfs(paths, 'aa', 'bb'));
    assert.isTrue(dfs(paths, 'bb', 'cc'));
    assert.isTrue(dfs(paths, 'aa', 'cc'));
    assert.isTrue(dfs(paths, 'cc', 'bb'));
    assert.isTrue(dfs(paths, 'cc', 'cc'));
    assert.isTrue(dfs(paths, 'bb', 'bb'));
    assert.isTrue(dfs(paths, 'bb', 'aa'));
    assert.isTrue(dfs(paths, 'aa', 'aa'));
  });
});