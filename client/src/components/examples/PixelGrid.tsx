import { useState } from 'react';
import PixelGrid from '../PixelGrid';

export default function PixelGridExample() {
  const [currentColor, setCurrentColor] = useState('#FF6B35');
  const [tool, setTool] = useState<'brush' | 'eraser'>('brush');

  const handleGridChange = (grid: string[][]) => {
    console.log('Grid updated', grid);
  };

  return (
    <div className="p-8 bg-background">
      <div className="mb-4 flex gap-4 items-center">
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 text-xs font-mono ${
              tool === 'brush' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            }`}
            onClick={() => setTool('brush')}
            data-testid="button-brush"
          >
            BRUSH
          </button>
          <button
            className={`px-3 py-1 text-xs font-mono ${
              tool === 'eraser' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
            }`}
            onClick={() => setTool('eraser')}
            data-testid="button-eraser"
          >
            ERASER
          </button>
        </div>
        <div className="flex gap-2">
          {['#FF6B35', '#E94560', '#004E89', '#0F3460'].map(color => (
            <button
              key={color}
              className={`w-8 h-8 border-2 ${
                currentColor === color ? 'border-accent' : 'border-border'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => setCurrentColor(color)}
              data-testid={`color-${color}`}
            />
          ))}
        </div>
      </div>
      <PixelGrid
        width={16}
        height={16}
        pixelSize={20}
        currentColor={currentColor}
        tool={tool}
        onGridChange={handleGridChange}
      />
    </div>
  );
}