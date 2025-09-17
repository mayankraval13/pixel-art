import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PixelGridProps {
  width: number;
  height: number;
  pixelSize: number;
  currentColor: string;
  tool: 'brush' | 'eraser';
  onGridChange?: (grid: string[][]) => void;
  gridData?: string[][];
}

export default function PixelGrid({
  width,
  height,
  pixelSize,
  currentColor,
  tool,
  onGridChange,
  gridData
}: PixelGridProps) {
  const [grid, setGrid] = useState<string[][]>(() => {
    if (gridData) return gridData;
    return Array(height).fill(null).map(() => Array(width).fill('transparent'));
  });
  const [isDrawing, setIsDrawing] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridData) {
      setGrid(gridData);
    }
  }, [gridData]);

  const drawPixel = (row: number, col: number) => {
    const newGrid = [...grid];
    newGrid[row][col] = tool === 'eraser' ? 'transparent' : currentColor;
    setGrid(newGrid);
    onGridChange?.(newGrid);
  };

  const handleMouseDown = (row: number, col: number) => {
    setIsDrawing(true);
    drawPixel(row, col);
  };

  const handleMouseEnter = (row: number, col: number) => {
    if (isDrawing) {
      drawPixel(row, col);
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDrawing(false);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    return () => document.removeEventListener('mouseup', handleGlobalMouseUp);
  }, []);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${width}, ${pixelSize}px)`,
    gridTemplateRows: `repeat(${height}, ${pixelSize}px)`,
    gap: '1px',
    backgroundColor: 'hsl(var(--border))',
    padding: '1px',
    border: '2px solid hsl(var(--primary))',
  };

  return (
    <div
      ref={gridRef}
      className="inline-block select-none cursor-crosshair"
      style={gridStyle}
      onMouseUp={handleMouseUp}
      data-testid="pixel-grid"
    >
      {grid.map((row, rowIndex) =>
        row.map((pixel, colIndex) => {
          const pixelColor = pixel === 'transparent' ? 'hsl(var(--muted))' : pixel;
          return (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={cn(
                "hover-elevate transition-all duration-75",
                pixel === 'transparent' && "bg-muted/50"
              )}
              style={{
                width: `${pixelSize}px`,
                height: `${pixelSize}px`,
                backgroundColor: pixelColor,
                border: '1px solid hsl(var(--border))',
                boxSizing: 'border-box'
              }}
              onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
              onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
              data-testid={`pixel-${rowIndex}-${colIndex}`}
            />
          );
        })
      )}
    </div>
  );
}