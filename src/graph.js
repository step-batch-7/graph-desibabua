//Example 
// Pairs => [[from,to],[to,from]]
// Source => from
// To => to 
// Should return true.

const generatePaths = function (reader,path,encoder) {
  const paths = reader(path, encoder).trim().split('\n');
  const separateFromTo = (path) => path.match(/[^"| "]+/g);
  return Array.from(paths, separateFromTo);
}

const generateDirectedPairs = function (paths) {
  return paths.reduce((directedPaths, [from, to]) => {
    if (!(from in directedPaths)) {
      directedPaths[from] = [];
    }
    directedPaths[from].push(to);
    return directedPaths;
  },{});
}

const bfs = function (pairs, source, target) {
  const directedPairs = generateDirectedPairs(pairs);

  const visitedPlaces = [];
  const queue = source in directedPairs ? [...directedPairs[source]] : [];
  const canEnqueued = (place) => !visitedPlaces.includes(place) && !queue.includes(place);

  while (queue.length) {
    const place = queue.shift();
    visitedPlaces.push(place);
    if (place === target) return true;
    if (place in directedPairs) {
      queue.push(...directedPairs[place].filter(canEnqueued));
    }
  }
  return false;
};


module.exports = {bfs, generatePaths};
