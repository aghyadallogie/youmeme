import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, expect, it } from 'vitest';

describe('App', () => {
    it('renders the toolbar buttons', () => {
        render(<App />);
        expect(screen.getByRole('button', { name: /Add Text/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Clear Texts/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Copy to Clipboard/i })).toBeInTheDocument();
    });
});