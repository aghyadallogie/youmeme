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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '../components/ui/carousel';
import { TEMPLATES } from '../lib/templates';

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
    <div className="flex flex-col items-center gap-4 border-b border-border bg-background p-4 px-6">
      <div className="flex gap-2">
        <Button onClick={onAddText} variant="secondary">
          Add Text
        </Button>
        <Button onClick={onClearText} variant="secondary">
          Clear Texts
        </Button>
        <Button
          onClick={onCopy}
          variant="default"
          className="min-w-[11rem]"
        >
          {copyStatus === 'copying' ? 'Copying…' : 'Copy to Clipboard'}
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Font</span>
          <Select
            value={textStyle.fontFamily ?? 'Impact, sans-serif'}
            onValueChange={(value) => onUpdateStyle({ fontFamily: value })}
          >
            <SelectTrigger className="w-[160px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {FONT_OPTIONS.map((f) => (
                <SelectItem key={f.value} value={f.value ?? undefined}>
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
            className="h-8 w-8 cursor-pointer rounded border border-border"
          />
        </label>

        <label className="flex items-center gap-2">
          <span className="text-muted-foreground">Stroke</span>
          <input
            type="color"
            value={textStyle.strokeColor}
            onChange={(e) => onUpdateStyle({ strokeColor: e.target.value })}
            className="h-8 w-8 cursor-pointer rounded border border-border"
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

      <form onSubmit={handleUrlSubmit} className="flex gap-2">
        <Input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Paste image URL…"
        />
        <Button type="submit" variant="secondary">
          Set image
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => onScaleImage(1 / 1.1)}
          disabled={imageScale <= 0.5}
        >
          −
        </Button>
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => onScaleImage(1.1)}
          disabled={imageScale >= 2}
        >
          +
        </Button>
      </form>

      <div className="w-full max-w-3xl px-10">
        <Carousel opts={{ align: 'start', dragFree: true }}>
          <CarouselContent>
            {TEMPLATES.map((template) => (
              <CarouselItem
                key={template.name}
                className="basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6"
              >
                <button
                  type="button"
                  onClick={() => onSetImageUrl(template.src)}
                  title={template.name}
                  className="w-full overflow-hidden rounded border border-border transition hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <img
                    src={template.src}
                    alt={template.name}
                    className="h-16 w-full object-cover"
                    draggable={false}
                  />
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}