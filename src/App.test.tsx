import { render, screen } from '@testing-library/react';
import App from './App';
import { describe, expect, it } from 'vitest';

describe('App', () => {
    it('renders the toolbar buttons', () => {
        render(<App />);
        expect(screen.getByRole('button', { name: /\+ text/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /copy to clipboard/i })).toBeInTheDocument();
    });
});