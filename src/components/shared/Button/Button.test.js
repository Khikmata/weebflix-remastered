// import { fireEvent, render } from '@testing-library/react';
// import { Button } from './Button';

// describe('Button component', () => {
//   it('renders without errors', () => {
//     render(<Button />);
//   });

//   it('displays the provided children', () => {
//     const { getByText } = render(<Button>Hello World</Button>);
//     expect(getByText('Hello World')).toBeInTheDocument();
//   });

//   it('applies margin vertical correctly', () => {
//     const { container } = render(<Button marginVertical={10} />);
//     expect(container.firstChild).toHaveStyle('margin-top: 10px');
//     expect(container.firstChild).toHaveStyle('margin-bottom: 10px');
//   });

//   it('applies margin horizontal correctly', () => {
//     const { container } = render(<Button marginHorizontal={20} />);
//     expect(container.firstChild).toHaveStyle('margin-left: 20px');
//     expect(container.firstChild).toHaveStyle('margin-right: 20px');
//   });

//   it('applies color correctly', () => {
//     const { container } = render(<Button color="primary" />);
//     expect(container.firstChild).toHaveStyle('background-color: #28646c');
//   });

//   it('applies outlined style correctly', () => {
//     const { container } = render(<Button outlined />);
//     expect(container.firstChild).toHaveStyle('border: 1px solid white');
//   });

//   it('calls onClick handler when clicked', () => {
//     const onClickMock = jest.fn();
//     const { container } = render(<Button onClick={onClickMock} />);
//     fireEvent.click(container.firstChild);
//     expect(onClickMock).toHaveBeenCalledTimes(1);
//   });

//   it('renders with custom height', () => {
//     const { container } = render(<Button height={50} />);
//     expect(container.firstChild).toHaveStyle('height: 50px');
//   });

//   it('applies custom content padding', () => {
//     const { container } = render(<Button contentPadding="10px 20px" />);
//     expect(container.firstChild).toHaveStyle('padding: 10px 20px');
//   });

//   it('renders with custom border color and width when outlined', () => {
//     const { container } = render(
//       <Button outlined borderCol="red" borderWidth={2} />,
//     );
//     expect(container.firstChild).toHaveStyle('border: 2px solid red');
//   });

//   it('renders with full width when scale prop is true', () => {
//     const { container } = render(<Button scale />);
//     expect(container.firstChild).toHaveStyle('width: 100%');
//   });

//   it('renders with transparent background when color prop is not provided', () => {
//     const { container } = render(<Button />);
//     expect(container.firstChild).toHaveStyle('background-color: transparent');
//   });
// });
