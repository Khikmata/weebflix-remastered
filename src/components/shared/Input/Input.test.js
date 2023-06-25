import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from './Input'

describe('Input', () => {
  test('renders input element with correct styles', () => {
    render(<Input color="primary" outlined />)
    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
    expect(input).toHaveStyle('border: 1px solid #B5B5B5')
    expect(input).toHaveStyle('background-color: #28646c')
  })

  test('calls onChange handler with input value', () => {
    const onChangeMock = jest.fn()
    render(<Input onChange={onChangeMock} />)
    const input = screen.getByRole('textbox')

    fireEvent.change(input, { target: { value: 'test' } })

    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: 'test' } }),
    )
  })

  test('applies correct dimensions and padding', () => {
    render(<Input height={50} contentPadding="10px" />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveStyle({ height: '50px', padding: '10px' })
  })

  test('applies correct margins', () => {
    render(<Input marginVertical={20} marginHorizontal={10} />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveStyle({
      marginBottom: '20px',
      marginTop: '20px',
      marginLeft: '10px',
      marginRight: '10px',
    })
  })

  test('applies correct border radius', () => {
    render(<Input borRad={5} />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveStyle('border-radius: 5px')
  })

  test('applies correct width based on scale prop', () => {
    render(<Input scale={false} />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveStyle('width: auto')

    render(<Input scale />)
    expect(input).toHaveStyle('width: 100%')
  })

  test('applies correct type, max, and min attributes', () => {
    render(<Input type="range" max={100} min={0} />)
    const input = screen.getByRole('slider')
    expect(input).toHaveAttribute('type', 'range')
    expect(input).toHaveAttribute('max', '100')
    expect(input).toHaveAttribute('min', '0')
  })

  test('renders input element with default styles if no props provided', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
    expect(input).toHaveStyle('border: 2px inset') // Update the expected border style
    expect(input).toHaveStyle('background-color: transparent')
  })

  test('calls onChange handler with input value when typing', () => {
    const onChangeMock = jest.fn()
    render(<Input onChange={onChangeMock} />)
    const input = screen.getByRole('textbox')

    fireEvent.input(input, { target: { value: 'testing' } })

    expect(onChangeMock).toHaveBeenCalledTimes(1)
    expect(onChangeMock).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: 'testing' } }),
    )
  })

  test('handles negative numbers as min and max values', () => {
    render(<Input type="range" max={-10} min={-50} />)
    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('max', '-10')
    expect(input).toHaveAttribute('min', '-50')
  })
})
