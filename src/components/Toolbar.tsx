import { useState } from 'react';
import type { TextStyle } from '../lib/types';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

type Props = {
  onAddText: () => void;
  onClearText: () => void;
  onCopy: () => void;
  copyStatus: string;
  textStyle: TextStyle;
  onUpdateStyle: (patch: Partial<TextStyle>) => void;
  onSetImageUrl: (src: string) => void;
  onScaleImage: (factor: number) => void;
  imageScale: number;
};

const FONT_OPTIONS = [
  { label: 'Impact', value: 'Impact, sans-serif' },
  { label: 'Arial Black', value: '"Arial Black", sans-serif' },
  { label: 'Comic Sans', value: '"Comic Sans MS", cursive' },
  { label: 'System', value: 'system-ui, sans-serif' },
];

export function Toolbar({
  onAddText,
  onClearText,
  onCopy,
  copyStatus,
  textStyle,
  onUpdateStyle,
  onSetImageUrl,
  onScaleImage,
  imageScale,
}: Props) {
  const [urlInput, setUrlInput] = useState('');

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    onSetImageUrl(trimmed);
    setUrlInput('');
  };

  return (
    <div className="flex flex-col bg-background items-center border-b border-border p-4 px-6 gap-4">
      <div className="flex gap-2">
        <Button onClick={onAddText} variant="secondary">
          Add Text
        </Button>
        <Button onClick={onClearText} variant="secondary">
          Clear Texts
        </Button>
        <Button onClick={onCopy} variant="default" className="min-w-[10rem]">
          {copyStatus === 'copying' ? 'Copying…' : 'Copy to Clipboard'}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Font</span>
          <Select
            value={textStyle.fontFamily}
            onValueChange={(value) => onUpdateStyle({ fontFamily: value })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_OPTIONS.map((f) => (
                <SelectItem key={f.value} value={f.value}>
                  {f.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </label>

        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Size</span>
          <Input
            type="number"
            min={8}
            max={200}
            value={textStyle.fontSize}
            onChange={(e) =>
              onUpdateStyle({ fontSize: Number(e.target.value) || 8 })
            }
            className="w-16"
          />
        </label>

        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Text</span>
          <input
            type="color"
            value={textStyle.color}
            onChange={(e) => onUpdateStyle({ color: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer border border-border"
          />
        </label>

        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Stroke</span>
          <input
            type="color"
            value={textStyle.strokeColor}
            onChange={(e) => onUpdateStyle({ strokeColor: e.target.value })}
            className="w-8 h-8 rounded cursor-pointer border border-border"
          />
        </label>

        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Stroke W</span>
          <Input
            type="number"
            min={0}
            max={20}
            value={textStyle.strokeWidth}
            onChange={(e) =>
              onUpdateStyle({ strokeWidth: Number(e.target.value) || 0 })
            }
            className="w-16"
          />
        </label>
      </div>

      <form onSubmit={handleUrlSubmit} className="flex gap-2 mt-1">
        <Input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Paste image URL"
        />
        <Button type="submit" variant="secondary">
          Set image
        </Button>
        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={() => onScaleImage(1 / 1.1)}
          disabled={imageScale <= 0.5}
        >
          −
        </Button>
        <Button
          type="button"
          variant="default"
          size="icon"
          onClick={() => onScaleImage(1.1)}
          disabled={imageScale >= 2}
        >
          +
        </Button>
      </form>
    </div>
  );
}