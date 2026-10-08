import { screen } from '@testing-library/react';
import { renderTextLayerView } from '../test/renderTextLayerView';
import { describe, expect, it } from 'vitest';

describe('TextLayerView', () => {
    it('renders the layer text', () => {
        renderTextLayerView({ layer: { text: 'HELLO WORLD' } });
        expect(screen.getByText('HELLO WORLD')).toBeInTheDocument();
    });
});

it('does not render the textarea when not selected', () => {
  renderTextLayerView({ isSelected: false });
  expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
});