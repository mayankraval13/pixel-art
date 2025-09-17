import { useState } from 'react';
import ColorPicker from '../ColorPicker';

export default function ColorPickerExample() {
  const [selectedColor, setSelectedColor] = useState('#FF6B35');

  return (
    <div className="p-8 bg-background">
      <ColorPicker
        selectedColor={selectedColor}
        onColorSelect={setSelectedColor}
      />
    </div>
  );
}