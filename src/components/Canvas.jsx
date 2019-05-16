import React from 'react';

const Canvas = ({ options }) => (
  <div>
    <svg
      id="drawingCanvas"
      bg="light"
      onMouseDown={(e) => { options.startPolyline(e); }}
      onMouseMove={(e) => { options.continuePolyline(e); }}
      onMouseUp={options.stopPolyline}
    >
      {options.coordinates.map(vector => <polyline points={vector.join(' ')} key={vector[0].join(',')} />)}
    </svg>
  </div>
);

export default Canvas;
