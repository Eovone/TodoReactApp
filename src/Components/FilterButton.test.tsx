import { render, fireEvent } from '@testing-library/react';
import FilterButton from './FilterButton';

describe('FilterButton', () => {

  it('renders without crashing', () => {
    const { getByText } = render(<FilterButton buttonName="testButton" filterState="all" setFilterState={() => {}} isActive={false} />);
    const buttonElement = getByText('testButton');
    expect(buttonElement).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(<FilterButton buttonName="Click Me" filterState="all" setFilterState={mockOnClick} isActive={false} />);
    const buttonElement = getByText('Click Me');

    fireEvent.click(buttonElement);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});