const assert = require('chai').assert;
const {bfs} = require('../src/graph');

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

  it('three nodes sparsely connected', function () {
    const paths = [ ['aa', 'bb'], ['bb', 'cc'], ['cc', 'bb'], ];
    assert.isTrue(bfs(paths, 'aa', 'bb'));
    assert.isTrue(bfs(paths, 'bb', 'cc'));
    assert.isTrue(bfs(paths, 'aa', 'cc'));
    assert.isTrue(bfs(paths, 'cc', 'bb'));
    assert.isTrue(bfs(paths, 'cc', 'cc'));
    assert.isTrue(bfs(paths, 'bb', 'bb'));
    assert.isFalse(bfs(paths, 'bb', 'aa'));
    assert.isFalse(bfs(paths, 'aa', 'aa'));
  });
});