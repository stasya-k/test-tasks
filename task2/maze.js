const m = [
    ['#','#','#','#','#','#','#','#','#'],
    ['#','+','+','+','#','+','+','+','#'],
    ['#','+','#','+','#','+','#','+','#'],
    ['+','+','#','+','0','+','#','+','#'],
    ['#','#','#','+','#','#','#','#','#'],
    ['#','#','+','+','#','#','#','#','#'],
    ['#','#','+','#','#','#','#','#','#'],
    ['#','#','#','#','#','#','#','#','#'],
  ];

const start = '0';
const way = '+';
const visited = '%'

const height = m.length;
const width = m[0].length;

const findWayFromMaze = (maze, startPoint) => {
  const way = [];
  const checkPath = (startPoint) => {
    maze[startPoint.y][startPoint.x] = visited;
    const path = getValidPath(maze, startPoint);
    if (path.length > 0) {
      for (let i = 0; i < path.length; i += 1) {
        const notVisited = maze[path[i].y][path[i].x] !== visited;
        if (isExit(path[i]) || (notVisited && checkPath(path[i]))) {
          way.unshift(path[i].direction);
          return way;
        }
      }
    }
  }; return checkPath(startPoint);
};

const getIndex = (maze, symbol) => {
  return maze.reduce((result, values, index) => {
    if (result[0] > -1) {
      return result;
    }
    const found = values.indexOf(symbol);
    return found > -1 ? {
      x: found,
      y: Number(index),
    } : result;
  }, [-1, -1])
};

const startPoint = getIndex(m, start);

const getValidPath = (maze, point) => {
  const { x, y } = point;
  const steps = [];
  if (maze[y-1][x] !== undefined) {
    steps.push({x: x, y: y - 1, val: maze[y - 1][x], direction: "top"});
  }
  if (maze[y + 1][x] !== undefined) {
    steps.push({x: x, y: y + 1, val: maze[y + 1][x], direction: "bottom"});
  }
  if (maze[y][x - 1] !== undefined) {
    steps.push({x: x - 1, y: y, val: maze[y][x - 1], direction: "left"});
  }
  if (maze[y][x + 1] !== undefined) {
    steps.push({x: x + 1, y: y, val: maze[y][x + 1], direction: "right"});
  }
  return steps.filter((step) => step.val === way);
};

const isExit = (point) => {
  const { x, y } = point;
  return (
    y === 0 ||
    y === (height - 1) || 
    x === 0 || 
    x === (width - 1)
    );
};

console.log(findWayFromMaze(m, startPoint));
