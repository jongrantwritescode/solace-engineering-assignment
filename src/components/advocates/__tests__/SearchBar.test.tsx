import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchBar } from '../SearchBar';

describe('SearchBar', () => {
  it('sanitizes input and calls onSearchChange', async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    const handleReset = jest.fn();

    const { rerender } = render(
      <SearchBar searchTerm="" onSearchChange={handleChange} onReset={handleReset} />
    );

    const input = screen.getByPlaceholderText(/search by name/i);
    await user.type(input, '<John>');

    expect(handleChange).toHaveBeenLastCalledWith('John');

    // simulate parent updating searchTerm
    rerender(
      <SearchBar searchTerm="John" onSearchChange={handleChange} onReset={handleReset} />
    );
    expect(screen.getByText(/Searching for:/)).toHaveTextContent('John');

    await user.click(screen.getByText(/Reset Search/i));
    expect(handleReset).toHaveBeenCalled();
  });
});
