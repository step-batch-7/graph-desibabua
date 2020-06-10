const { readFileSync } = require('fs');
const {bfs, generatePaths} = require('./src/graph.js');

const main = function () {
  const paths = generatePaths(readFileSync, './database/paths.txt', 'utf8');
  console.log(bfs(paths, 'bb', 'jj'));
  console.log(bfs(paths, 'jj', 'aa'));
  console.log(bfs(paths, 'aa', 'hh'));
  console.log(bfs(paths, 'hh', 'ii'));
  console.log(bfs(paths, 'ii', 'ee'));
  console.log(bfs(paths, 'ee', 'mm'));
  console.log(bfs(paths, 'mm', 'jj'));
}

main();