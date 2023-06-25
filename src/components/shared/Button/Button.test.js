import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  test('renders button element with correct styles', () => {
    render(<Button color="primary" outlined />)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle('border: 1px solid white')
    expect(button).toHaveStyle('background-color: #28646c')
  })

  test('renders button with provided children', () => {
    const buttonText = 'Click me'
    render(<Button>{buttonText}</Button>)
    const button = screen.getByRole('button')

    expect(button).toHaveTextContent(buttonText)
  })

  test('calls onClick handler when button is clicked', () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock} />)
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
  })

  test('applies correct dimensions and padding', () => {
    render(<Button height={50} contentPadding="10px" />)
    const button = screen.getByRole('button')

    expect(button).toHaveStyle({ height: '50px', padding: '10px' })
  })

  test('applies correct margins', () => {
    render(<Button marginVertical={20} marginHorizontal={10} />)
    const button = screen.getByRole('button')

    expect(button).toHaveStyle({
      marginBottom: '20px',
      marginTop: '20px',
      marginLeft: '10px',
      marginRight: '10px',
    })
  })

  test('applies correct border styles', () => {
    render(<Button outlined borderWidth={2} borderCol="red" />)
    const button = screen.getByRole('button')

    expect(button).toHaveStyle('border: 2px solid red')
  })

  test('applies correct width based on scale prop', () => {
    render(<Button scale={false} />)
    const button = screen.getByRole('button')

    expect(button).toHaveStyle('width: auto')

    render(<Button scale />)
    expect(button).toHaveStyle('width: 100%')
  })

  test('renders button element with default styles if no props provided', () => {
    render(<Button />)
    const button = screen.getByRole('button')

    expect(button).toBeInTheDocument()
    expect(button).not.toHaveStyle('border: 1px solid white')
    expect(button).not.toHaveStyle('background-color: #28646c')
    expect(button).toHaveStyle('border: none')
    expect(button).toHaveStyle('background-color: transparent')
  })

  test('calls onClick handler when button is clicked with mouse event', () => {
    const onClickMock = jest.fn()
    render(<Button onClick={onClickMock} />)
    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(onClickMock).toHaveBeenCalledTimes(1)
    expect(onClickMock).toHaveBeenCalledWith(expect.any(MouseEvent))
  })
})
