const assert = require('chai').assert;
const {bfs} = require('../src/graph');

describe('bfs',function() {
  it('single node not connected to itself', function () {
    const paths = [['aa','bb']]
    assert.isFalse(bfs(paths,'aa','aa'));
    assert.isFalse(bfs(paths,'aa','cc'));
    assert.isTrue(bfs(paths,'aa','bb'));
  });
});