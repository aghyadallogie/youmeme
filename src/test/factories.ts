import type { TextLayer, TextStyle } from '../lib/types';

let layerCounter = 0;

export function makeTextLayer(
    overrides: Partial<TextLayer> = {}
): TextLayer {
    return {
        id: `test-text-${++layerCounter}`,
        kind: 'text',
        text: 'TOP TEXT',
        x: 40,
        y: 20,
        ...overrides,
    };
}

export function makeTextStyle(
    overrides: Partial<TextStyle> = {}
): TextStyle {
    return {
        fontFamily: 'Impact, sans-serif',
        fontSize: 48,
        color: '#ffffff',
        strokeColor: '#000000',
        strokeWidth: 3,
        ...overrides,
    };
}