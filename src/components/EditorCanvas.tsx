import { forwardRef, type CSSProperties, type MouseEvent } from 'react';
import type { EditorState } from '../lib/types';
import { TextLayerView } from './TextLayerView';

type Props = {
  state: EditorState;
  onSelect: (id: string) => void;
  onChangeText: (id: string, text: string) => void;
  onDeselect: () => void;
  onMove: (id: string, x: number, y: number) => void;
  onImageLoad: (width: number, height: number) => void;
};

export const EditorCanvas = forwardRef<HTMLDivElement, Props>(
  function EditorCanvas(
    { state, onSelect, onChangeText, onDeselect, onMove, onImageLoad },
    ref
  ) {
    const { layers, textStyle, imageScale } = state;
    const imageLayer = layers.find((l) => l.kind === 'image');
    const textLayers = layers.filter((l) => l.kind === 'text');
    const aspectRatio =
      imageLayer?.kind === 'image' ? imageLayer.aspectRatio : 1;

    const wrapperStyle: CSSProperties = {
      aspectRatio: String(aspectRatio),
      width: '100%',
      maxWidth: '600px',
      maxHeight: '600px',
      position: 'relative',
      background: '#111',
      overflow: 'hidden',
      transform: `scale(${imageScale})`,
      transformOrigin: 'center center',
    };

    const handleBackgroundClick = (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onDeselect();
    };

    return (
      <div
        className="rounded-lg border"
        ref={ref}
        style={wrapperStyle}
        onMouseDown={handleBackgroundClick}
      >
        {imageLayer?.kind === 'image' && (
          <img
            src={imageLayer.src}
            alt=""
            crossOrigin="anonymous"
            onLoad={(e) => {
              const img = e.currentTarget;
              onImageLoad(img.naturalWidth, img.naturalHeight);
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
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
