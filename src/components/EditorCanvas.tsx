import { forwardRef, type CSSProperties, type MouseEvent } from 'react';
import type { EditorState } from '../lib/types';
import { TextLayerView } from './TextLayerView';

type Props = {
  state: EditorState;
  onSelect: (id: string) => void;
  onChangeText: (id: string, text: string) => void;
  onDeselect: () => void;
  onMove: (id: string, x: number, y: number) => void;
};

export const EditorCanvas = forwardRef<HTMLDivElement, Props>(
  function EditorCanvas(
    { state, onSelect, onChangeText, onDeselect, onMove },
    ref
  ) {
    const { layers, canvasWidth, canvasHeight, textStyle, imageScale } = state;
    const imageLayer = layers.find((l) => l.kind === 'image');
    const textLayers = layers.filter((l) => l.kind === 'text');

    const wrapperStyle: CSSProperties = {
      width: canvasWidth * imageScale,
      height: canvasHeight * imageScale,
      position: 'relative',
      background: '#111',
      overflow: 'hidden',
    };

    const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onDeselect();
    };

    return (
      <div className="rounded-lg border border-border bg-muted p-4 shadow-2xl" ref={ref} style={wrapperStyle} onMouseDown={handleBackgroundClick}>
        {imageLayer?.kind === 'image' && (
          <img
            src={imageLayer.src}
            alt=""
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              userSelect: 'none',
              pointerEvents: 'none',
            }}
          />
        )}

        {textLayers.map((layer) =>
          layer.kind === 'text' ? (
            <TextLayerView
              key={layer.id}
              layer={layer}
              textStyle={textStyle}
              scale={imageScale}
              isSelected={state.selectedId === layer.id}
              onSelect={onSelect}
              onChange={onChangeText}
              onMove={onMove}
            />
          ) : null
        )}
      </div>
    );
  }
);