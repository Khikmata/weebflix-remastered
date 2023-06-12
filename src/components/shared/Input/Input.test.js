// import { fireEvent, render, screen } from '@testing-library/react';
// import { Input } from './Input';

// describe('Input component', () => {
//   it('renders without errors', () => {
//     render(<Input />);
//   });

//   it('sets the input type correctly', () => {
//     render(<Input type="range" />);
//     const inputElement = screen.getByRole('slider');
//     expect(inputElement).toBeInTheDocument();
//   });

//   it('sets the input value correctly', () => {
//     const onChange = jest.fn();
//     render(<Input type="input" onChange={onChange} />);
//     const inputElement = screen.getByRole('textbox');
//     expect(inputElement).toBeInTheDocument();

//     // Simulate a change event
//     const inputValue = 'Test Value';
//     fireEvent.change(inputElement, { target: { value: inputValue } });
//     expect(onChange).toHaveBeenCalledTimes(1);
//     expect(onChange).toHaveBeenCalledWith(expect.any(Object));
//   });

//   it('applies styles correctly', () => {
//     const { container } = render(
//       <Input
//         marginVertical={10}
//         marginHorizontal={20}
//         color="primary"
//         outlined
//         scale
//         height={40}
//         contentPadding="5px"
//         borRad={5}
//       />,
//     );

//     const inputElement = container.querySelector('input');

//     expect(inputElement).toHaveStyle(`
//       width: 100%;
//       height: 40px;
//       padding: 5px;
//       margin-bottom: 10px;
//       margin-top: 10px;
//       margin-left: 20px;
//       margin-right: 20px;
//       border: 1px solid #B5B5B5;
//       border-radius: 5px;
//       background-color: #28646c;
//     `);
//   });
// });
