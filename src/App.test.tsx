import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import App from './App';

describe('App', async () => {
  beforeAll(() => {
    render(<App />);
  });

  it('should render the App', () => {
    expect(screen.getByRole('heading').innerHTML).toEqual('Vite + React');
    expect(screen.getByRole('button').innerHTML).toEqual('count is 0');
  });

  it('should increment the counter when the user clicks', async () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button').innerHTML).toEqual('count is 1');
  });
});
