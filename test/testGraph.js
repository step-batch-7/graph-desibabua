const assert = require('chai').assert;
const sinon = require('sinon');
const {dfs, bfs, generatePaths, generateDirectedPairs} = require('../src/graph');

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
    const directed_path = generateDirectedPairs(paths);
    assert.isFalse(dfs(directed_path, 'aa', 'aa', new Set()));
    assert.isFalse(dfs(directed_path, 'aa', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'bb', new Set()));
  });

  it('single node connected to itself', function () {
    const paths = [
      ['aa', 'bb'],
      ['aa', 'aa'],
    ];
    const directed_path = generateDirectedPairs(paths);
    assert.isTrue(dfs(directed_path, 'aa', 'aa', new Set()));
    assert.isFalse(dfs(directed_path, 'aa', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'bb', new Set()));
  });

  it('two nodes not connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['cc', 'dd'],
    ];
    const directed_path = generateDirectedPairs(paths);
    assert.isFalse(dfs(directed_path, 'bb', 'bb', new Set()));
    assert.isFalse(dfs(directed_path, 'aa', 'cc', new Set()));
    assert.isFalse(dfs(directed_path, 'aa', 'dd', new Set()));
    assert.isFalse(dfs(directed_path, 'bb', 'cc', new Set()));
    assert.isFalse(dfs(directed_path, 'cc', 'aa', new Set()));
    assert.isFalse(dfs(directed_path, 'cc', 'bb', new Set()));
    assert.isTrue(dfs(directed_path, 'cc', 'dd', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'bb', new Set()));
  });

  it('two nodes perfectly connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'aa'],
    ];
    const directed_path = generateDirectedPairs(paths);
    assert.isTrue(dfs(directed_path, 'bb', 'bb', new Set()));
    assert.isTrue(dfs(directed_path, 'bb', 'aa', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'aa', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'bb', new Set()));
  });

  it('two nodes sparsely connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
    ];
    const directed_path = generateDirectedPairs(paths);
    assert.isTrue(dfs(directed_path, 'aa', 'bb', new Set()));
    assert.isTrue(dfs(directed_path, 'bb', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'cc', new Set()));
    assert.isFalse(dfs(directed_path, 'cc', 'bb', new Set()));
    assert.isFalse(dfs(directed_path, 'cc', 'aa', new Set()));
    assert.isFalse(dfs(directed_path, 'bb', 'aa', new Set()));
  });

  it('three nodes sparsely connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'dd'],
    ];
    const directed_path = generateDirectedPairs(paths);
    assert.isTrue(dfs(directed_path, 'aa', 'bb', new Set()));
    assert.isTrue(dfs(directed_path, 'bb', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'dd', new Set()));
    assert.isFalse(dfs(directed_path, 'cc', 'bb', new Set()));
    assert.isFalse(dfs(directed_path, 'cc', 'aa', new Set()));
    assert.isFalse(dfs(directed_path, 'bb', 'aa', new Set()));
    assert.isFalse(dfs(directed_path, 'dd', 'cc', new Set()));
    assert.isFalse(dfs(directed_path, 'dd', 'aa', new Set()));
  });

  it('three nodes moderately connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'bb'],
    ];
    const directed_path = generateDirectedPairs(paths);
    assert.isTrue(dfs(directed_path, 'aa', 'bb', new Set()));
    assert.isTrue(dfs(directed_path, 'bb', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'cc', 'bb', new Set()));
    assert.isTrue(dfs(directed_path, 'cc', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'bb', 'bb', new Set()));
    assert.isFalse(dfs(directed_path, 'bb', 'aa', new Set()));
    assert.isFalse(dfs(directed_path, 'aa', 'aa', new Set()));
  });

  it('three nodes perfectly connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'aa'],
    ];
    const directed_path = generateDirectedPairs(paths);
    assert.isTrue(dfs(directed_path, 'aa', 'bb', new Set()));
    assert.isTrue(dfs(directed_path, 'bb', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'cc', 'bb', new Set()));
    assert.isTrue(dfs(directed_path, 'cc', 'cc', new Set()));
    assert.isTrue(dfs(directed_path, 'bb', 'bb', new Set()));
    assert.isTrue(dfs(directed_path, 'bb', 'aa', new Set()));
    assert.isTrue(dfs(directed_path, 'aa', 'aa', new Set()));
  });
});