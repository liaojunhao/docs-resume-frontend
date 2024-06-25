import { Button } from 'antd';
function App() {
  return (
    <div className="resume-wrap">
      <div className="flex w-screen	h-screen">
        {/* 左侧画布 */}
        <div
          className="w-8/12"
          style={{
            display: 'flex',
            height: '100%',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          <div className="h-12">头部工具栏</div>
          <div
            className="workspace-container"
            style={{
              width: '100%',
              height: '100%',
              position: 'relative',
              outline: 'none',
              backgroundColor: 'rgba(232, 232, 232, 0.9)',
              flex: '1 1 0%',
            }}
          >
            <div>画布区域</div>
          </div>
        </div>
        {/* 右侧编辑 */}
        <div className="w-4/12 border-l" style={{ padding: 10 }}>
          <div>右边输入区域</div>
          <Button type="primary">按钮</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
