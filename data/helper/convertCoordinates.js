// [
//   [[x, y], [x1, y1], [x2, y2]], [[x, y], [x1, y1] ...]
// ]

// [
//   [ [x, x1, x2], [y, y1, y2]],
//   [ [x, x1], [y, y1]], ...
// ]
const convertCoordinates = (coordinates) => {
  // first resize to top left in 256 * 256
  let resized;
  const flat = coordinates.reduce((res, stroke) => {
    const subFlat = stroke.reduce((subRes, tuple) => {
      subRes.push(tuple[0]);
      subRes.push(tuple[1]);
      return subRes;
    }, []);
    return res.concat(subFlat);
  }, []);

  let minX = flat[0];
  let maxX = flat[0];
  let minY = flat[1];
  let maxY = flat[1];
  for (let i = 0; i < flat.length; i += 2) {
    if (flat[i] < minX) {
      minX = flat[i];
    }
    if (flat[i] > maxX) {
      maxX = flat[i];
    }
    if (flat[i + 1] < minY) {
      minY = flat[i + 1];
    }
    if (flat[i + 1] > maxY) {
      maxY = flat[i + 1];
    }
  }

  if (maxX - minX < 256 && maxY - minY < 256) {
    resized = coordinates.map(stroke => stroke.filter((tuple, index) => index % 4 === 0)
      .map(tuple => [tuple[0] - minX, tuple[1] - minY]));
  } else {
    const max = maxY - minY > maxX - minX ? maxY - minY : maxX - minX;
    const scale = max / 255;
    resized = coordinates.map(stroke => stroke.filter((tuple, index) => index % 4 === 0)
      .map(tuple => [(tuple[0] - minX) / scale, (tuple[1] - minY) / scale]));
  }

  // then transform into the same shape as datasets
  return resized.reduce((res, polyline) => {
    const array = polyline.reduce((xyArray, tuple) => {
      xyArray[0].push(tuple[0]);
      xyArray[1].push(tuple[1]);
      return xyArray;
    }, [[], []]);
    res.push(array);
    return res;
  }, []);
};

module.exports = convertCoordinates;
