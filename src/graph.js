//Example
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to
// Should return true.

const generatePaths = function (reader, path, encoder) {
  const paths = reader(path, encoder).trim().split('\n');
  const separateFromTo = (path) => path.match(/[^"| "]+/g);
  return Array.from(paths, separateFromTo);
};

const generateGraph = function (paths) {
  return paths.reduce((graph, [from, to]) => {
    if (!(from in graph)) {
      graph[from] = [];
    }
    graph[from].push(to);
    return graph;
  }, {});
};

const bfs = function (pairs, source, target) {
  const graph = generateGraph(pairs);

  const visitedPlaces = new Set();
  const queue = graph[source] || [];
  const canEnqueued = (place) =>
    !visitedPlaces.has(place) && !queue.includes(place);

  while (queue.length) {
    const place = queue.shift();
    visitedPlaces.add(place);
    if (place === target) return true;
    if (place in graph) {
      queue.push(...graph[place].filter(canEnqueued));
    }
  }
  return false;
};

const dfs = function (graph, source, target, visited) {
  const siblings = graph[source] || [];
  const nonVisitedSiblings = siblings.filter((sibling) => !visited.has(sibling));
  visited.add(source);

  if (siblings.includes(target)) return true;
  if (nonVisitedSiblings.length) {
    return nonVisitedSiblings.some((sibling) =>
      dfs(graph, sibling, target, visited)
    );
  }
  return false;
};

const find_path = function (graph, source, target, visited) {
  const siblings = graph[source] || [];
  const nonVisitedSiblings = siblings.filter((sibling) => !visited.has(sibling));
  visited.add(source);

  if (siblings.includes(target)) return [source, target ];
  while (nonVisitedSiblings.length) {
    const childToSearch = nonVisitedSiblings.shift();
    const prevPath = find_path(graph, childToSearch, target, visited);
    if (prevPath.length >= 1) return [source, ...prevPath];
  }
  return [];
};

const main = function (pairs, source, target) {
  const graph = generateGraph(pairs);
  dfs(graph, source, target, new Set());
  find_path(graph, source, target, new Set());
  return 0;
};

module.exports = { dfs, find_path, bfs, generatePaths, generateGraph};
