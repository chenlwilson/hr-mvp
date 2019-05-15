// [
//   [ [x, x1, x2], [y, y1, y2]],
//   [ [x, x1], [y, y1]], ...
// ]

// [[0.12312, 0.23231, 1], [0.2321, -0.42343, 0], ...]
const convertSingle = (drawing) => {
  const single = [];
  const defaultBounds = {
    minX: Math.min(...drawing[0][0]),
    maxX: Math.max(...drawing[0][0]),
    minY: Math.min(...drawing[0][1]),
    maxY: Math.max(...drawing[0][1]),
  };

  const bounds = drawing.slice(1).reduce((res, stroke) => {
    const strokeMinX = Math.min(...stroke[0]);
    const strokeMaxX = Math.max(...stroke[0]);
    const strokeMinY = Math.min(...stroke[1]);
    const strokeMaxY = Math.max(...stroke[1]);
    if (strokeMinX < res.minX) {
      res.minX = strokeMinX;
    }
    if (strokeMaxX > res.maxX) {
      res.maxX = strokeMaxX;
    }
    if (strokeMinY < res.minY) {
      res.minY = strokeMinY;
    }
    if (strokeMaxY > res.maxY) {
      res.maxY = strokeMaxY;
    }
    return res;
  }, defaultBounds);

  const {
    minX, maxX, minY, maxY,
  } = bounds;

  const scaleX = maxX - minX === 0 ? 1 : maxX - minX;
  const scaleY = maxY - minY === 0 ? 1 : maxY - minY;

  drawing.forEach((stroke) => {
    const [x, y] = stroke;
    for (let i = 0; i < x.length; i += 1) {
      const triple = [];
      triple[0] = (x[i] - minX) / scaleX;
      triple[1] = (y[i] - minY) / scaleY;
      triple[2] = i === 0 ? 1 : 0;
      single.push(triple);
    }
  });

  for (let i = 0; i < single.length - 1; i += 3) {
    single[i][0] = single[i + 1][0] - single[i][0];
    single[i][1] = single[i + 1][1] - single[i][1];
  }
  single.pop();

  return single;
};

module.exports = convertSingle;
