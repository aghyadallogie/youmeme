import {
  useEffect,
  useRef,
  type CSSProperties,
  type PointerEvent,
} from 'react';
import type { TextLayer, TextStyle } from '../lib/types';

type Props = {
  layer: TextLayer;
  textStyle: TextStyle;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onChange: (id: string, text: string) => void;
  onDeselect: () => void;
  onMove: (id: string, x: number, y: number) => void;
  onDelete: (id: string) => void;
};

export function TextLayerView({
  layer,
  textStyle,
  isSelected,
  onSelect,
  onChange,
  onDeselect,
  onMove,
  onDelete,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const dragOffsetRef = useRef<{ dx: number; dy: number } | null>(null);

  useEffect(() => {
    if (isSelected && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isSelected]);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    onSelect(layer.id);
    dragOffsetRef.current = {
      dx: e.clientX - layer.x,
      dy: e.clientY - layer.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
    e.preventDefault();
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragOffsetRef.current) return;
    const { dx, dy } = dragOffsetRef.current;
    onMove(layer.id, e.clientX - dx, e.clientY - dy);
  };

  const handlePointerUp = (e: PointerEvent<HTMLDivElement>) => {
    dragOffsetRef.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);
  };

  const baseStyle: CSSProperties = {
    position: 'absolute',
    left: layer.x,
    top: layer.y,
    fontFamily: textStyle.fontFamily,
    fontSize: textStyle.fontSize,
    fontWeight: 900,
    color: textStyle.color,
    WebkitTextStroke: `${textStyle.strokeWidth}px ${textStyle.strokeColor}`,
    paintOrder: 'stroke fill',
    textTransform: 'uppercase',
    whiteSpace: 'pre',
    userSelect: 'none',
    WebkitUserSelect: 'none',
    WebkitTouchCallout: 'none',
    touchAction: 'none',
    lineHeight: 1,
    outline: isSelected ? '2px dashed red' : 'none'
  };

  return (
    <>
      <div
        style={baseStyle}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {layer.text || ' '}
      </div>

      {isSelected && (
        <textarea
          ref={textareaRef}
          value={layer.text}
          onChange={(e) => onChange(layer.id, e.target.value)}
          onBlur={() => {
            if (layer.text.trim() === '') onDelete(layer.id);
            else onDeselect();
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') e.currentTarget.blur();
          }}
          spellCheck={false}
          style={{
            ...baseStyle,
            color: 'transparent',
            caretColor: textStyle.color,
            WebkitTextStroke: '0',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            resize: 'none',
            overflow: 'hidden',
            padding: 0,
            margin: 0,
            minWidth: '1ch',
            width: `${Math.max(layer.text.length, 1)}ch`,
            height: '1.2em',
            pointerEvents: 'auto',
          }}
        />
      )}
    </>
  );
}