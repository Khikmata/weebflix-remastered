// import {
//   act,
//   fireEvent,
//   render,
//   screen,
//   waitFor,
// } from '@testing-library/react';
// import { RangeInput } from './RangeInput';

// describe('RangeInput component', () => {
//   const handleRangeMock = jest.fn();

//   beforeEach(() => {
//     handleRangeMock.mockClear();
//   });

//   it('renders without errors', () => {
//     render(
//       <RangeInput
//         title="Test Range"
//         step={1}
//         min={0}
//         max={100}
//         handleRange={handleRangeMock}
//       />,
//     );
//   });

//   it('displays the title correctly', () => {
//     render(
//       <RangeInput
//         title="Test Range"
//         step={1}
//         min={0}
//         max={100}
//         handleRange={handleRangeMock}
//       />,
//     );
//     const titleElement = screen.getByText('Test Range');
//     expect(titleElement).toBeInTheDocument();
//   });

//   it('updates the values correctly', () => {
//     render(
//       <RangeInput
//         title="Test Range"
//         step={1}
//         min={0}
//         max={100}
//         handleRange={handleRangeMock}
//       />,
//     );
//     const rangeElement = screen.getByLabelText('Test Range');
//     expect(rangeElement).toBeInTheDocument();

//     fireEvent.change(rangeElement, { target: { value: ['25', '75'] } });

//     expect(handleRangeMock).toHaveBeenCalledTimes(1);
//     expect(handleRangeMock).toHaveBeenCalledWith([25, 75]);
//   });

//   it('applies styles correctly', () => {
//     const { container } = render(
//       <RangeInput
//         title="Test Range"
//         step={1}
//         min={0}
//         max={100}
//         handleRange={handleRangeMock}
//         showMiles
//       />,
//     );

//     const rangeElement = container.querySelector('.range input[type="range"]');
//     expect(rangeElement).toHaveStyle(`
//       // Add your expected styles here
//     `);
//   });

//   it('marks the range correctly', () => {
//     render(
//       <RangeInput
//         title="Test Range"
//         step={10}
//         min={0}
//         max={100}
//         handleRange={handleRangeMock}
//       />,
//     );
//     const rangeElement = screen.getByLabelText('Test Range');
//     expect(rangeElement).toBeInTheDocument();

//     const marks = screen.getAllByTestId('range-mark');
//     expect(marks).toHaveLength(11);

//     // Check if each mark is rendered correctly
//     marks.forEach((mark, index) => {
//       const value = index * 10;
//       expect(mark).toHaveTextContent(value.toString());
//     });
//   });

//   it('debounces the range update correctly', async () => {
//     jest.useFakeTimers();
//     render(
//       <RangeInput
//         title="Test Range"
//         step={1}
//         min={0}
//         max={100}
//         handleRange={handleRangeMock}
//       />,
//     );
//     const rangeElement = screen.getByLabelText('Test Range');
//     expect(rangeElement).toBeInTheDocument();

//     // Simulate multiple range changes within the debounce delay
//     fireEvent.change(rangeElement, { target: { value: ['25', '50'] } });
//     fireEvent.change(rangeElement, { target: { value: ['30', '60'] } });
//     fireEvent.change(rangeElement, { target: { value: ['35', '70'] } });

//     // Advance timers to trigger debounce
//     act(() => {
//       jest.advanceTimersByTime(300);
//     });

//     // Wait for debounce to finish
//     await waitFor(() => {
//       expect(handleRangeMock).toHaveBeenCalledTimes(1);
//       expect(handleRangeMock).toHaveBeenCalledWith([35, 70]);
//     });

//     jest.useRealTimers();
//   });

//   // Add more tests for other functionality as needed
// });
