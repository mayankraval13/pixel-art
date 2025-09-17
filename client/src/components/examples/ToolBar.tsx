import { useState } from 'react';
import ToolBar from '../ToolBar';

export default function ToolBarExample() {
  const [currentTool, setCurrentTool] = useState<'brush' | 'eraser'>('brush');
  const [gridSize, setGridSize] = useState({ width: 32, height: 32 });

  const handleReset = () => {
    console.log('Reset canvas');
  };

  const handleExport = () => {
    console.log('Export artwork');
  };

  return (
    <div className="p-8 bg-background">
      <ToolBar
        currentTool={currentTool}
        onToolChange={setCurrentTool}
        onReset={handleReset}
        onExport={handleExport}
        gridSize={gridSize}
        onGridSizeChange={setGridSize}
      />
    </div>
  );
}