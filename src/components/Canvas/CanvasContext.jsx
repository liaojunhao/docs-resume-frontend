/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

export const Context = createContext({
  zoomRatio: 1,
  setZoomRatio: () => {},
  canvas: null,
  setCanvas: () => {},
  activeObject: null,
  setActiveObject: () => {},
});

export const CanvasProvider = ({ children }) => {
  const [canvas, setCanvas] = useState(null);
  const [activeObject, setActiveObject] = useState(null);
  const [zoomRatio, setZoomRatio] = useState(1);
  const context = {
    canvas,
    setCanvas,
    activeObject,
    setActiveObject,
    zoomRatio,
    setZoomRatio,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
};
