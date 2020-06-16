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

const dfs = function (directedPairs, source, target, visited) {
  const child = directedPairs[source] || [];
  const nonVisitedChild = child.filter((e) => !visited.has(e));
  visited.add(source);

  if (child.includes(target)) return true;
  if (nonVisitedChild.length) {
    return nonVisitedChild.some((e) =>
      dfs(directedPairs, e, target, visited)
    );
  }
  return false;
};

const find_path = function (directedPairs, source, target, visited) {
  const child = directedPairs[source] || [];
  const nonVisitedChild = child.filter((e) => !visited.has(e));
  visited.add(source);

  if (child.includes(target)) return [source, target ];
  while (nonVisitedChild.length) {
    const childToSearch = nonVisitedChild.shift();
    const prevPath = find_path(directedPairs, childToSearch, target, visited);
    if (prevPath.length >= 1) return [source, ...prevPath];
  }
  return [];
};

const main = function (pairs, source, target) {
  const directedPairs = generateDirectedPairs(pairs);
  dfs(directedPairs, source, target, new Set());
  find_path(directedPairs, source, target, new Set());
  return 0;
};

module.exports = { dfs, find_path, bfs, generatePaths, generateDirectedPairs};
