import type { TextStyle } from '../lib/types';

type Props = {
  onAddText: () => void;
  onClearText: () => void
  onCopy: () => void;
  copyStatus: string;
  textStyle: TextStyle;
  onUpdateStyle: (patch: Partial<TextStyle>) => void;
};

const FONT_OPTIONS = [
  { label: 'Impact', value: 'Impact, sans-serif' },
  { label: 'Arial Black', value: '"Arial Black", sans-serif' },
  { label: 'Comic Sans', value: '"Comic Sans MS", cursive' },
  { label: 'System', value: 'system-ui, sans-serif' },
];

export function Toolbar({
  onAddText,
  onCopy,
  onClearText,
  copyStatus,
  textStyle,
  onUpdateStyle,
}: Props) {
  return (
    <div className="border-b border-neutral-800 p-4 px-6">
      <div className="flex gap-2 p-3">
        <button
          onClick={onAddText}
          className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
        >
          Add Text
        </button>
        <button
          onClick={onClearText}
          className="px-3 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-sm"
        >
          Clear Texts
        </button>
        <button
          onClick={onCopy}
          className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-sm font-medium"
        >
          {copyStatus === 'copying' ? 'Copying…' : 'Copy to Clipboard'}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-4 text-sm">
        <label className="flex items-center gap-2">
          <span className="text-neutral-400">Font</span>
          <select
            value={textStyle.fontFamily}
            onChange={(e) => onUpdateStyle({ fontFamily: e.target.value })}
            className="bg-neutral-800 rounded px-2 py-1"
          >
            {FONT_OPTIONS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex items-center gap-2">
          <span className="text-neutral-400">Size</span>
          <input
            type="number"
            min={8}
            max={200}
            value={textStyle.fontSize}
            onChange={(e) =>
              onUpdateStyle({ fontSize: Number(e.target.value) || 8 })
            }
            className="w-16 bg-neutral-800 rounded px-2 py-1"
          />
        </label>

        <label className="flex items-center gap-2">
          <span className="text-neutral-400">Text</span>
          <input
            type="color"
            value={textStyle.color}
            onChange={(e) => onUpdateStyle({ color: e.target.value })}
            className="w-8 h-8 bg-neutral-800 rounded cursor-pointer"
          />
        </label>

        <label className="flex items-center gap-2">
          <span className="text-neutral-400">Stroke</span>
          <input
            type="color"
            value={textStyle.strokeColor}
            onChange={(e) => onUpdateStyle({ strokeColor: e.target.value })}
            className="w-8 h-8 bg-neutral-800 rounded cursor-pointer"
          />
        </label>

        <label className="flex items-center gap-2">
          <span className="text-neutral-400">Stroke W</span>
          <input
            type="number"
            min={0}
            max={20}
            value={textStyle.strokeWidth}
            onChange={(e) =>
              onUpdateStyle({ strokeWidth: Number(e.target.value) || 0 })
            }
            className="w-16 bg-neutral-800 rounded px-2 py-1"
          />
        </label>
      </div>
    </div>
  );
}