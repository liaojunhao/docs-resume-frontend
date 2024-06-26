import { useContainerHandler } from './handlers';
import { useCanvasContext } from '@/components/Canvas/hooks';
import { fabric } from 'fabric';
import { useEffect } from 'react';

const Canvas = () => {
  const containerRef = useContainerHandler();
  const { setCanvas } = useCanvasContext();

  useEffect(() => {
    const initialHeigh = containerRef.current.clientHeight;
    const initialWidth = containerRef.current.clientWidth;

    const canvas = new fabric.Canvas('canvas', {
      backgroundColor: '#ecf0f1',
      height: initialHeigh,
      width: initialWidth,
    });

    setCanvas(canvas);
    const workarea = new fabric.Rect({
      id: 'workarea',
      width: 600,
      height: 400,
      absolutePositioned: true,
      fill: '#ffffff',
      selectable: false,
      hoverCursor: 'default',
    });
    canvas.add(workarea);
    workarea.center();
  }, []);
  return (
    <div className="editor-canvas" ref={containerRef}>
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default Canvas;
