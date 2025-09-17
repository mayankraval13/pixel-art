import { Brush, Eraser, RotateCcw, Download, Grid3X3, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ToolBarProps {
  currentTool: 'brush' | 'eraser';
  onToolChange: (tool: 'brush' | 'eraser') => void;
  onReset: () => void;
  onExport: () => void;
  gridSize: { width: number; height: number };
  onGridSizeChange: (size: { width: number; height: number }) => void;
}

const GRID_SIZES = [
  { width: 16, height: 16, label: '16x16' },
  { width: 32, height: 32, label: '32x32' },
  { width: 48, height: 48, label: '48x48' },
  { width: 64, height: 64, label: '64x64' },
];

export default function ToolBar({
  currentTool,
  onToolChange,
  onReset,
  onExport,
  gridSize,
  onGridSizeChange
}: ToolBarProps) {
  return (
    <div className="bg-card border-2 border-primary p-4 space-y-4" data-testid="toolbar">
      <div>
        <h3 className="text-sm font-mono mb-3 text-card-foreground tracking-wide flex items-center gap-2">
          <Palette className="w-4 h-4" />
          DRAWING TOOLS
        </h3>
        <div className="space-y-2">
          <Button
            variant={currentTool === 'brush' ? 'default' : 'secondary'}
            size="sm"
            className="w-full justify-start gap-2 font-mono text-xs"
            onClick={() => {
              onToolChange('brush');
              console.log('Brush tool selected');
            }}
            data-testid="tool-brush"
          >
            <Brush className="w-4 h-4" />
            BRUSH
          </Button>
          <Button
            variant={currentTool === 'eraser' ? 'default' : 'secondary'}
            size="sm"
            className="w-full justify-start gap-2 font-mono text-xs"
            onClick={() => {
              onToolChange('eraser');
              console.log('Eraser tool selected');
            }}
            data-testid="tool-eraser"
          >
            <Eraser className="w-4 h-4" />
            ERASER
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-mono mb-3 text-card-foreground tracking-wide flex items-center gap-2">
          <Grid3X3 className="w-4 h-4" />
          CANVAS SIZE
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {GRID_SIZES.map((size) => (
            <Button
              key={size.label}
              variant={
                gridSize.width === size.width && gridSize.height === size.height
                  ? 'default'
                  : 'secondary'
              }
              size="sm"
              className="font-mono text-xs"
              onClick={() => {
                onGridSizeChange(size);
                console.log('Grid size changed to:', size.label);
              }}
              data-testid={`grid-size-${size.label.toLowerCase()}`}
            >
              {size.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-mono mb-3 text-card-foreground tracking-wide flex items-center gap-2">
          <Zap className="w-4 h-4" />
          ACTIONS
        </h3>
        <div className="space-y-2">
          <Button
            variant="destructive"
            size="sm"
            className="w-full justify-start gap-2 font-mono text-xs"
            onClick={() => {
              onReset();
              console.log('Canvas reset');
            }}
            data-testid="action-reset"
          >
            <RotateCcw className="w-4 h-4" />
            RESET
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="w-full justify-start gap-2 font-mono text-xs"
            onClick={() => {
              onExport();
              console.log('Export triggered');
            }}
            data-testid="action-export"
          >
            <Download className="w-4 h-4" />
            EXPORT
          </Button>
        </div>
      </div>
    </div>
  );
}