// [
//   [[x, y], [x1, y1], [x2, y2]], [[x, y], [x1, y1] ...]
// ]

// [
//   [ [x, x1, x2], [y, y1, y2]],
//   [ [x, x1], [y, y1]], ...
// ]

const convertCoordinates = coordinates => coordinates.reduce((res, polyline) => {
  const array = polyline.reduce((xyArray, tuple) => {
    xyArray[0].push(tuple[0]);
    xyArray[1].push(tuple[1]);
    return xyArray;
  }, [[], []]);
  res.push(array);
  return res;
}, []);

module.exports = convertCoordinates;
