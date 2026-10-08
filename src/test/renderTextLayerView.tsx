import { render } from '@testing-library/react';
import { vi } from 'vitest';
import { TextLayerView } from '../components/TextLayerView';
import { makeTextLayer, makeTextStyle } from './factories';
import type { TextLayer } from '../lib/types';

type Options = {
  layer?: Partial<TextLayer>;
  isSelected?: boolean;
};

export function renderTextLayerView({
  layer: layerOverrides,
  isSelected = false,
}: Options = {}) {
  const layer = makeTextLayer(layerOverrides);
  const textStyle = makeTextStyle();

  const handlers = {
    onSelect: vi.fn(),
    onChange: vi.fn(),
    onDeselect: vi.fn(),
    onMove: vi.fn(),
    onDelete: vi.fn(),
  };

  const utils = render(
    <TextLayerView
      layer={layer}
      isSelected={isSelected}
      textStyle={textStyle}
      {...handlers}
    />
  );

  return { ...utils, layer, ...handlers };
}