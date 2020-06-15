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

const generateDirectedPairs = function (paths) {
  return paths.reduce((directedPaths, [from, to]) => {
    if (!(from in directedPaths)) {
      directedPaths[from] = [];
    }
    directedPaths[from].push(to);
    return directedPaths;
  }, {});
};

const bfs = function (pairs, source, target) {
  const directedPairs = generateDirectedPairs(pairs);

  const visitedPlaces = new Set();
  const queue = directedPairs[source] || [];
  const canEnqueued = (place) =>
    !visitedPlaces.has(place) && !queue.includes(place);

  while (queue.length) {
    const place = queue.shift();
    visitedPlaces.add(place);
    if (place === target) return true;
    if (place in directedPairs) {
      queue.push(...directedPairs[place].filter(canEnqueued));
    }
  }
  return false;
};

const search_node = function (directedPairs, source, target, visited) {
  const child = directedPairs[source] || [];
  const nonVisitedChild = child.filter((e) => !visited.has(e));
  visited.add(source);

  if (child.includes(target)) return true;
  if (nonVisitedChild.length) {
    return nonVisitedChild.some((e) => search_node(directedPairs, e, target, visited));
  }
  return false;
};

const dfs = function (pairs, source, target) {
  const directedPairs = generateDirectedPairs(pairs);
  const visited = new Set();
  return search_node(directedPairs, source, target, visited);
};

module.exports = { dfs, bfs, generatePaths };
