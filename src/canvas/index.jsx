/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { fabric } from 'fabric';
import './index.css';

const FabricJSCanvas = ({ className }) => {
  const canvasEl = useRef(null);
  const canvasElParent = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasEl.current);
    const setCurrentDimensions = () => {
      canvas.setHeight(canvasElParent.current?.clientHeight || 0);
      canvas.setWidth(canvasElParent.current?.clientWidth || 0);
      canvas.renderAll();
    };
    const resizeCanvas = () => {
      setCurrentDimensions();
    };
    setCurrentDimensions();

    window.addEventListener('resize', resizeCanvas, false);

    return () => {
      canvas.dispose();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div ref={canvasElParent} className={className}>
      <canvas ref={canvasEl} />
    </div>
  );
};

export default FabricJSCanvas;
