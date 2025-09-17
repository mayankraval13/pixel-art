import { useState, useRef } from 'react';
import PixelGrid from './PixelGrid';
import ColorPicker from './ColorPicker';
import ToolBar from './ToolBar';
import { cn } from '@/lib/utils';

export default function PixelArtEditor() {
  const [currentColor, setCurrentColor] = useState('#FF6B35');
  const [currentTool, setCurrentTool] = useState<'brush' | 'eraser'>('brush');
  const [gridSize, setGridSize] = useState({ width: 32, height: 32 });
  const [grid, setGrid] = useState<string[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const pixelSize = 12; // Fixed pixel size for consistent rendering

  const handleReset = () => {
    const emptyGrid = Array(gridSize.height).fill(null).map(() => 
      Array(gridSize.width).fill('transparent')
    );
    setGrid(emptyGrid);
    console.log('Canvas reset');
  };

  const handleExport = () => {
    if (!grid.length) {
      console.log('No artwork to export');
      return;
    }

    // Create a canvas for export
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const exportPixelSize = 10; // Larger pixels for export
    canvas.width = gridSize.width * exportPixelSize;
    canvas.height = gridSize.height * exportPixelSize;

    // Fill background
    ctx.fillStyle = '#1A1A2E';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw pixels
    grid.forEach((row, rowIndex) => {
      row.forEach((pixel, colIndex) => {
        if (pixel !== 'transparent') {
          ctx.fillStyle = pixel;
          ctx.fillRect(
            colIndex * exportPixelSize,
            rowIndex * exportPixelSize,
            exportPixelSize,
            exportPixelSize
          );
        }
      });
    });

    // Download the image
    const link = document.createElement('a');
    link.download = `pixel-art-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    
    console.log('Artwork exported as PNG');
  };

  const handleGridSizeChange = (newSize: { width: number; height: number }) => {
    setGridSize(newSize);
    handleReset(); // Reset grid when size changes
  };

  return (
    <div className="min-h-screen bg-background p-4" data-testid="pixel-art-editor">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-mono font-bold text-foreground tracking-wider mb-2">
          PIXEL ART STUDIO
        </h1>
        <div className="w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary"></div>
        <p className="text-sm font-serif text-muted-foreground mt-2">
          Create retro-style pixel art with classic 8-bit aesthetics
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - Tools */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <ToolBar
              currentTool={currentTool}
              onToolChange={setCurrentTool}
              onReset={handleReset}
              onExport={handleExport}
              gridSize={gridSize}
              onGridSizeChange={handleGridSizeChange}
            />
            <ColorPicker
              selectedColor={currentColor}
              onColorSelect={setCurrentColor}
            />
          </div>
        </div>

        {/* Main Canvas Area */}
        <div className="lg:col-span-3">
          <div className="bg-card border-2 border-primary p-6">
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="relative">
                {/* Scan line effect overlay */}
                <div className="absolute inset-0 pointer-events-none z-10 opacity-10">
                  <div className="h-full w-full" style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--accent)) 2px, hsl(var(--accent)) 4px)',
                  }}></div>
                </div>
                
                <PixelGrid
                  width={gridSize.width}
                  height={gridSize.height}
                  pixelSize={pixelSize}
                  currentColor={currentColor}
                  tool={currentTool}
                  onGridChange={setGrid}
                  gridData={grid}
                />
              </div>
            </div>
            
            {/* Canvas Info */}
            <div className="mt-4 flex justify-between items-center text-xs font-mono text-muted-foreground">
              <div>
                CANVAS: {gridSize.width} × {gridSize.height} PIXELS
              </div>
              <div className="flex items-center gap-4">
                <div>TOOL: {currentTool.toUpperCase()}</div>
                <div>COLOR: {currentColor}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center">
        <div className="w-full h-1 bg-gradient-to-r from-secondary via-accent to-primary mb-4"></div>
        <p className="text-xs font-serif text-muted-foreground">
          Click and drag to draw • Use tools to create your pixel masterpiece
        </p>
      </footer>
    </div>
  );
}