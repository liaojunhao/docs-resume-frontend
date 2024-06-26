import './Editor.css';
import Panels from './Panels/Panels';
import Toolbox from './Toolbox/Toolbox';
import CanvasArea from './CanvasArea/CanvasArea';
import FooterMenu from './FooterMenu/FooterMenu';

function Editor() {
  return (
    <div className="editor">
      <div className="section-two">
        <div className="section-three">
          <Toolbox></Toolbox>
          <CanvasArea></CanvasArea>
          <FooterMenu></FooterMenu>
        </div>
        <Panels />
      </div>
    </div>
  );
}

export default Editor;
