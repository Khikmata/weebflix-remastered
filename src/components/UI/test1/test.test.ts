import { screen } from '@testing-library/react';



test('render the component', () => {
	const check = screen.getByText('text1')
	expect(check).toBeInTheDocument();
})