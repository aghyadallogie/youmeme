import { useRef, useState } from 'react';
import { EditorCanvas } from './components/EditorCanvas';
import { Toolbar } from './components/Toolbar';
import { useCopyToClipboard } from './hooks/useCopyToClipboard';
import type { EditorState, TextStyle } from './lib/types';

const DEFAULT_TEXT_STYLE: TextStyle = {
  fontFamily: 'Impact, sans-serif',
  fontSize: 48,
  color: '#ffffff',
  strokeColor: '#000000',
  strokeWidth: 3,
};

const initialState: EditorState = {
  layers: [
    {
      id: 'bg',
      kind: 'image',
      src: 'https://i.imgflip.com/1bij.jpg',
      width: 568,
      height: 335,
      x: 0,
      y: 0,
    },
  ],
  selectedId: null,
  canvasWidth: 568,
  canvasHeight: 335,
  textStyle: DEFAULT_TEXT_STYLE,
  imageScale: 1,
};

let textCounter = 0;
const MIN_SCALE = 0.5;
const MAX_SCALE = 2;

export default function App() {
  const [state, setState] = useState<EditorState>(initialState);
  const canvasRef = useRef<HTMLDivElement>(null);
  const { copyElement, status } = useCopyToClipboard();

  const handleSetImageUrl = (src: string) => {
    setState((s) => {
      const hasImage = s.layers.some((l) => l.kind === 'image');
      if (!hasImage) {
        return {
          ...s,
          layers: [
            { id: 'bg', kind: 'image', src, width: 0, height: 0, x: 0, y: 0 },
            ...s.layers,
          ],
        };
      }
      return {
        ...s,
        layers: s.layers.map((l) =>
          l.kind === 'image' ? { ...l, src } : l
        ),
      };
    });
  };

  const handleScaleImage = (factor: number) => {
    setState((s) => ({
      ...s,
      imageScale: Math.min(
        MAX_SCALE,
        Math.max(MIN_SCALE, s.imageScale * factor)
      ),
    }));
  };

  const handleAddText = () => {
    const id = `text-${++textCounter}`;
    setState((s) => ({
      ...s,
      layers: [
        ...s.layers,
        { id, kind: 'text', text: 'NEW TEXT', x: 30, y: 20 },
      ],
      selectedId: id,
    }));
  };

  const handleClearText = () => {
    setState((s) => ({
      ...s,
      layers: s.layers.filter((l) => l.kind !== 'text'),
      selectedId: null,
    }));
  };

  const handleCopy = () => {
    handleDeselect();
    copyElement(canvasRef.current);
  };

  const handleSelect = (id: string) => {
    setState((s) => ({ ...s, selectedId: id }));
  };

  const handleDeselect = () => {
    setState((s) => ({
      ...s,
      selectedId: null,
      layers: s.layers.filter(
        (l) => !(l.kind === 'text' && l.text.trim() === '')
      ),
    }));
  };

  const handleChangeText = (id: string, text: string) => {
    setState((s) => ({
      ...s,
      layers: s.layers.map((l) =>
        l.id === id && l.kind === 'text' ? { ...l, text } : l
      ),
    }));
  };

  const handleMove = (id: string, x: number, y: number) => {
    setState((s) => ({
      ...s,
      layers: s.layers.map((l) => (l.id === id ? { ...l, x, y } : l)),
    }));
  };

  const handleUpdateStyle = (patch: Partial<TextStyle>) => {
    setState((s) => ({ ...s, textStyle: { ...s.textStyle, ...patch } }));
  };

  return (
    <main className="flex flex-col min-h-screen text-neutral-100 overflow-auto">
      <Toolbar
        onAddText={handleAddText}
        onClearText={handleClearText}
        onCopy={handleCopy}
        copyStatus={status}
        textStyle={state.textStyle}
        onUpdateStyle={handleUpdateStyle}
        onSetImageUrl={handleSetImageUrl}
        onScaleImage={handleScaleImage}
        imageScale={state.imageScale}
      />
      <div className="flex-1 flex items-center justify-center p-8">
        <EditorCanvas
          ref={canvasRef}
          state={state}
          onSelect={handleSelect}
          onChangeText={handleChangeText}
          onDeselect={handleDeselect}
          onMove={handleMove}
        />
      </div>
    </main>
  );
}