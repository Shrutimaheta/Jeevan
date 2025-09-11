
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CommonTagInputs from './commonTagInputs';

describe('CommonTagInputs', () => {
  it('renders initial tags', () => {
    render(<CommonTagInputs initialTags={["foo", "bar"]} />);
    expect(screen.getByText('foo')).toBeInTheDocument();
    expect(screen.getByText('bar')).toBeInTheDocument();
  });

  it('adds a new tag', () => {
    const handleTagsChange = jest.fn();
    render(<CommonTagInputs initialTags={[]} onTagsChange={handleTagsChange} />);
    const input = screen.getByPlaceholderText('Add a tag');
    fireEvent.change(input, { target: { value: 'baz' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(handleTagsChange).toHaveBeenCalledWith(['baz']);
  });

  it('removes a tag', () => {
    const handleTagsChange = jest.fn();
    render(<CommonTagInputs initialTags={["foo"]} onTagsChange={handleTagsChange} />);
    const closeBtn = screen.getByLabelText('Close'); // Capital C for Ant Design
    fireEvent.click(closeBtn);
    expect(handleTagsChange).toHaveBeenCalledWith([]);
  });
}); 