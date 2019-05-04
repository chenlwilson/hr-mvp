import React from 'react';
import PropTypes from 'prop-types';

const Canvas = ({
  coordinates, startPolyline, stopPolyline, continuePolyline,
}) => (
  <div>
    <svg
      id="drawingCanvas"
      bg="light"
      onMouseDown={(e) => { startPolyline(e); }}
      onMouseMove={(e) => { continuePolyline(e); }}
      onMouseUp={stopPolyline}
    >
      {coordinates.map(vector => <polyline points={vector.join(' ')} key={vector[0].join(',')} />)}
    </svg>
  </div>
);

Canvas.propTypes = {
  startPolyline: PropTypes.func.isRequired,
  continuePolyline: PropTypes.func.isRequired,
  stopPolyline: PropTypes.func.isRequired,
};

export default Canvas;
