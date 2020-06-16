const assert = require('chai').assert;
const sinon = require('sinon');
const {dfs, bfs, generatePaths, generateGraph} = require('../src/graph');

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


describe('generateGraph',function() {
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
    assert.isFalse(dfs(generateGraph(paths), 'aa', 'aa', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'aa', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'bb', new Set()));
  });

  it('single node connected to itself', function () {
    const paths = [
      ['aa', 'bb'],
      ['aa', 'aa'],
    ];
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'aa', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'aa', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'bb', new Set()));
  });

  it('two nodes not connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['cc', 'dd'],
    ];
    assert.isFalse(dfs(generateGraph(paths), 'bb', 'bb', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'aa', 'cc', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'aa', 'dd', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'bb', 'cc', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'cc', 'aa', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'cc', 'bb', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'cc', 'dd', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'bb', new Set()));
  });

  it('two nodes perfectly connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'aa'],
    ];
    assert.isTrue(dfs(generateGraph(paths), 'bb', 'bb', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'bb', 'aa', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'aa', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'bb', new Set()));
  });

  it('two nodes sparsely connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
    ];
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'bb', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'bb', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'cc', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'cc', 'bb', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'cc', 'aa', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'bb', 'aa', new Set()));
  });

  it('three nodes sparsely connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'dd'],
    ];
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'bb', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'bb', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'dd', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'cc', 'bb', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'cc', 'aa', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'bb', 'aa', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'dd', 'cc', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'dd', 'aa', new Set()));
  });

  it('three nodes moderately connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'bb'],
    ];
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'bb', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'bb', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'cc', 'bb', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'cc', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'bb', 'bb', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'bb', 'aa', new Set()));
    assert.isFalse(dfs(generateGraph(paths), 'aa', 'aa', new Set()));
  });

  it('three nodes perfectly connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'aa'],
    ];
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'bb', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'bb', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'cc', 'bb', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'cc', 'cc', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'bb', 'bb', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'bb', 'aa', new Set()));
    assert.isTrue(dfs(generateGraph(paths), 'aa', 'aa', new Set()));
  });
});