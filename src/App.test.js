import { render, screen } from '@testing-library/react';
import App from './App.jsx';

test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/123/i);
    expect(linkElement).toBeInTheDocument();
  });