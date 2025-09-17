import { cn } from '@/lib/utils';

interface ColorPickerProps {
  selectedColor: string;
  onColorSelect: (color: string) => void;
  colors?: string[];
}

const DEFAULT_COLORS = [
  // Retro Orange/Red Palette
  '#FF6B35', '#FF8C42', '#FF4500', '#DC143C', '#8B0000',
  // Neon Pink/Purple Palette  
  '#E94560', '#FF1493', '#DA70D6', '#9932CC', '#4B0082',
  // Deep Blue Palette
  '#004E89', '#0066CC', '#1E90FF', '#00BFFF', '#87CEEB',
  // Midnight Blue/Dark Palette
  '#0F3460', '#191970', '#000080', '#2F4F4F', '#483D8B',
  // Classic 8-bit Colors
  '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
  '#00FFFF', '#FFFFFF', '#C0C0C0', '#808080', '#000000',
  // Additional Retro Colors
  '#FFA500', '#32CD32', '#FF69B4', '#8A2BE2', '#20B2AA'
];

export default function ColorPicker({
  selectedColor,
  onColorSelect,
  colors = DEFAULT_COLORS
}: ColorPickerProps) {
  return (
    <div className="bg-card border-2 border-primary p-4" data-testid="color-picker">
      <h3 className="text-sm font-mono mb-3 text-card-foreground tracking-wide">
        COLOR PALETTE
      </h3>
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            className={cn(
              "w-8 h-8 border-2 hover-elevate active-elevate-2 transition-all",
              selectedColor === color
                ? "border-accent shadow-lg"
                : "border-border"
            )}
            style={{ backgroundColor: color }}
            onClick={() => {
              onColorSelect(color);
              console.log('Color selected:', color);
            }}
            title={color}
            data-testid={`color-${color.replace('#', '')}`}
          />
        ))}
      </div>
      
      {/* Current Color Display */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-xs font-mono text-muted-foreground">
          CURRENT:
        </span>
        <div
          className="w-12 h-12 border-2 border-accent"
          style={{ backgroundColor: selectedColor }}
          data-testid="current-color-display"
        />
        <span className="text-xs font-mono text-muted-foreground">
          {selectedColor.toUpperCase()}
        </span>
      </div>
    </div>
  );
}