const assert = require('chai').assert;
const sinon = require('sinon');
const {dfs, bfs, generatePaths, generateGraph, find_path} = require('../src/graph');

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
    const graph = generateGraph(paths);
    assert.isFalse(dfs(graph, 'aa', 'aa', new Set()));
    assert.isFalse(dfs(graph, 'aa', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'bb', new Set()));
  });

  it('single node connected to itself', function () {
    const paths = [
      ['aa', 'bb'],
      ['aa', 'aa'],
    ];
    const graph = generateGraph(paths);
    assert.isTrue(dfs(graph, 'aa', 'aa', new Set()));
    assert.isFalse(dfs(graph, 'aa', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'bb', new Set()));
  });

  it('two nodes not connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['cc', 'dd'],
    ];
    const graph = generateGraph(paths);
    assert.isFalse(dfs(graph, 'bb', 'bb', new Set()));
    assert.isFalse(dfs(graph, 'aa', 'cc', new Set()));
    assert.isFalse(dfs(graph, 'aa', 'dd', new Set()));
    assert.isFalse(dfs(graph, 'bb', 'cc', new Set()));
    assert.isFalse(dfs(graph, 'cc', 'aa', new Set()));
    assert.isFalse(dfs(graph, 'cc', 'bb', new Set()));
    assert.isTrue(dfs(graph, 'cc', 'dd', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'bb', new Set()));
  });

  it('two nodes perfectly connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'aa'],
    ];
    const graph = generateGraph(paths);
    assert.isTrue(dfs(graph, 'bb', 'bb', new Set()));
    assert.isTrue(dfs(graph, 'bb', 'aa', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'aa', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'bb', new Set()));
  });

  it('two nodes sparsely connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
    ];
    const graph = generateGraph(paths);
    assert.isTrue(dfs(graph, 'aa', 'bb', new Set()));
    assert.isTrue(dfs(graph, 'bb', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'cc', new Set()));
    assert.isFalse(dfs(graph, 'cc', 'bb', new Set()));
    assert.isFalse(dfs(graph, 'cc', 'aa', new Set()));
    assert.isFalse(dfs(graph, 'bb', 'aa', new Set()));
  });

  it('three nodes sparsely connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'dd'],
    ];
    const graph = generateGraph(paths);
    assert.isTrue(dfs(graph, 'aa', 'bb', new Set()));
    assert.isTrue(dfs(graph, 'bb', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'dd', new Set()));
    assert.isFalse(dfs(graph, 'cc', 'bb', new Set()));
    assert.isFalse(dfs(graph, 'cc', 'aa', new Set()));
    assert.isFalse(dfs(graph, 'bb', 'aa', new Set()));
    assert.isFalse(dfs(graph, 'dd', 'cc', new Set()));
    assert.isFalse(dfs(graph, 'dd', 'aa', new Set()));
  });

  it('three nodes moderately connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'bb'],
    ];
    const graph = generateGraph(paths);
    assert.isTrue(dfs(graph, 'aa', 'bb', new Set()));
    assert.isTrue(dfs(graph, 'bb', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'cc', 'bb', new Set()));
    assert.isTrue(dfs(graph, 'cc', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'bb', 'bb', new Set()));
    assert.isFalse(dfs(graph, 'bb', 'aa', new Set()));
    assert.isFalse(dfs(graph, 'aa', 'aa', new Set()));
  });

  it('three nodes perfectly connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'aa'],
    ];
    const graph = generateGraph(paths);
    assert.isTrue(dfs(graph, 'aa', 'bb', new Set()));
    assert.isTrue(dfs(graph, 'bb', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'cc', 'bb', new Set()));
    assert.isTrue(dfs(graph, 'cc', 'cc', new Set()));
    assert.isTrue(dfs(graph, 'bb', 'bb', new Set()));
    assert.isTrue(dfs(graph, 'bb', 'aa', new Set()));
    assert.isTrue(dfs(graph, 'aa', 'aa', new Set()));
  });
});

describe('find_path', function () {
  it('single node not connected to itself', function () {
    const paths = [['aa', 'bb']];
    const graph = generateGraph(paths);
    assert.deepStrictEqual(find_path(graph, 'aa', 'aa', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'cc', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'bb', new Set()),[ 'aa', 'bb' ]);
  });

  it('single node connected to itself', function () {
    const paths = [
      ['aa', 'bb'],
      ['aa', 'aa'],
    ];
    const graph = generateGraph(paths);
    assert.deepStrictEqual(find_path(graph, 'aa', 'aa', new Set()),[ 'aa', 'aa' ]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'cc', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'bb', new Set()),[ 'aa', 'bb' ]);
  });

  it('two nodes not connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['cc', 'dd'],
    ];
    const graph = generateGraph(paths);
    assert.deepStrictEqual(find_path(graph, 'bb', 'bb', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'cc', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'dd', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'cc', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'aa', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'bb', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'dd', new Set()),[ 'cc', 'dd' ]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'bb', new Set()),[ 'aa', 'bb' ]);
  });

  it('two nodes perfectly connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'aa'],
    ];
    const graph = generateGraph(paths);
    assert.deepStrictEqual(find_path(graph, 'bb', 'bb', new Set()),[ 'bb', 'aa', 'bb' ]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'aa', new Set()),[ 'bb', 'aa' ]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'aa', new Set()),[ 'aa', 'bb', 'aa' ]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'bb', new Set()),[ 'aa', 'bb' ]);
  });

  it('two nodes sparsely connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
    ];
    const graph = generateGraph(paths);
    assert.deepStrictEqual(find_path(graph, 'aa', 'bb', new Set()),[ 'aa', 'bb' ]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'cc', new Set()),[ 'bb', 'cc' ]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'cc', new Set()),[ 'aa', 'bb', 'cc' ]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'bb', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'aa', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'aa', new Set()),[]);
  });

  it('three nodes sparsely connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'dd'],
    ];
    const graph = generateGraph(paths);
    assert.deepStrictEqual(find_path(graph, 'aa', 'bb', new Set()),[ 'aa', 'bb' ]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'cc', new Set()),[ 'bb', 'cc' ]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'cc', new Set()),[ 'aa', 'bb', 'cc' ]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'dd', new Set()),[ 'aa', 'bb', 'cc', 'dd' ]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'bb', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'aa', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'aa', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'dd', 'cc', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'dd', 'aa', new Set()),[]);
  });

  it('three nodes moderately connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'bb'],
    ];
    const graph = generateGraph(paths);
    assert.deepStrictEqual(find_path(graph, 'aa', 'bb', new Set()),[ 'aa', 'bb' ]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'cc', new Set()),[ 'bb', 'cc' ]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'cc', new Set()),[ 'aa', 'bb', 'cc' ]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'bb', new Set()),[ 'cc', 'bb' ]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'cc', new Set()),[ 'cc', 'bb', 'cc' ]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'bb', new Set()),[ 'bb', 'cc', 'bb' ]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'aa', new Set()),[]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'aa', new Set()),[]);
  });

  it('three nodes perfectly connected', function () {
    const paths = [
      ['aa', 'bb'],
      ['bb', 'cc'],
      ['cc', 'aa'],
    ];
    const graph = generateGraph(paths);
    assert.deepStrictEqual(find_path(graph, 'aa', 'bb', new Set()),[ 'aa', 'bb' ]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'cc', new Set()),[ 'bb', 'cc' ]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'cc', new Set()),[ 'aa', 'bb', 'cc' ]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'bb', new Set()),[ 'cc', 'aa', 'bb' ]);
    assert.deepStrictEqual(find_path(graph, 'cc', 'cc', new Set()),[ 'cc', 'aa', 'bb', 'cc' ]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'bb', new Set()),[ 'bb', 'cc', 'aa', 'bb' ]);
    assert.deepStrictEqual(find_path(graph, 'bb', 'aa', new Set()),[ 'bb', 'cc', 'aa' ]);
    assert.deepStrictEqual(find_path(graph, 'aa', 'aa', new Set()),[ 'aa', 'bb', 'cc', 'aa' ]);
  });
});