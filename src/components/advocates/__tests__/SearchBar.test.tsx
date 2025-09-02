import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('passes raw input and renders it safely', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const handleReset = jest.fn();

    const { rerender } = render(
      <SearchBar searchTerm="" onSearchChange={handleChange} onReset={handleReset} />
    );

    const input = screen.getByPlaceholderText(/search by name/i);
    const malicious = '<script>alert("xss")</script>';
    await user.type(input, malicious);

    expect(handleChange).toHaveBeenLastCalledWith(malicious);

    rerender(
      <SearchBar searchTerm={malicious} onSearchChange={handleChange} onReset={handleReset} />
    );
    expect(screen.getByText(/Searching for:/)).toHaveTextContent(malicious);

    await user.click(screen.getByText(/Reset Search/i));
    expect(handleReset).toHaveBeenCalled();
  });

  it('displays search term when provided', () => {
    const handleChange = jest.fn();
    const handleReset = jest.fn();

    render(
      <SearchBar searchTerm="John Doe" onSearchChange={handleChange} onReset={handleReset} />
    );

    expect(screen.getByDisplayValue('John Doe')).toBeInTheDocument();
    expect(screen.getByText(/Searching for:/)).toHaveTextContent('John Doe');
  });

  it('has maxLength attribute set to 100', () => {
    const handleChange = jest.fn();
    const handleReset = jest.fn();

    render(
      <SearchBar searchTerm="" onSearchChange={handleChange} onReset={handleReset} />
    );

    const input = screen.getByPlaceholderText(/search by name/i);
    expect(input).toHaveAttribute('maxLength', '100');
  });

  it('calls onReset when reset button is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const handleReset = jest.fn();

    render(
      <SearchBar searchTerm="test" onSearchChange={handleChange} onReset={handleReset} />
    );

    await user.click(screen.getByText(/Reset Search/i));
    expect(handleReset).toHaveBeenCalled();
  });

  it('shows search term display only when searchTerm is not empty', () => {
    const handleChange = jest.fn();
    const handleReset = jest.fn();

    const { rerender } = render(
      <SearchBar searchTerm="" onSearchChange={handleChange} onReset={handleReset} />
    );

    // Should not show search term display when empty
    expect(screen.queryByText(/Searching for:/)).not.toBeInTheDocument();

    // Should show search term display when not empty
    rerender(
      <SearchBar searchTerm="John" onSearchChange={handleChange} onReset={handleReset} />
    );
    expect(screen.getByText(/Searching for:/)).toBeInTheDocument();
  });
});
