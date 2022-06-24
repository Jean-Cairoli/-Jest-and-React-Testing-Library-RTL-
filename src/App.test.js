import { replaceCamelWithSpaces } from './App';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('spaces before camel-case capital letters', () => {
	test('Works for no inner capital letters', () => {
		expect(replaceCamelWithSpaces('Red')).toBe('Red');
	});

	test('Works for one inner capital letter', () => {
		expect(replaceCamelWithSpaces('MidnightBlue')).toBe('Midnight Blue');
	});

	test('Works for multiple inner capital letters', () => {
		expect(replaceCamelWithSpaces('MediumVioletRed')).toBe('Medium Violet Red');
	});
});

test('button has correct initial color', () => {
	render(<App />);
	// find an element with a role of button and text of change to blue
	const colorButton = screen.getByRole('button', {
		name: 'Change to Medium Violet Red',
	});

	// expect the background color to be red
	expect(colorButton).toHaveStyle({ background: 'red' });

	// click button
	fireEvent.click(colorButton);

	// excpect the background color to be blue
	expect(colorButton).toHaveStyle({ background: 'Midnight Blue' });

	// expect thje buttton text to be "Change to red"
	expect(colorButton.textContent).toBe('Change to Midnight Blue');
});

test('initial conditions', () => {
	render(<App />);

	// check that the button start out enabled
	const colorButton = screen.getByRole('button', {
		name: 'Change to Medium Violet Red',
	});
	expect(colorButton).toBeEnabled();

	// check that the checkbox starts out unchecked
	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).not.toBeChecked();
});

test('Checkbox disable button on first click and enable on second click', () => {
	render(<App />);
	const colorButton = screen.getByRole('button', {
		name: 'Change to Medium Violet Red',
	});
	const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

	fireEvent.click(checkbox);
	expect(colorButton).toBeDisabled();

	fireEvent.click(checkbox);
	expect(colorButton).toBeEnabled();
});

test('Button gray when disable', () => {
	render(<App />);
	const colorButton = screen.getByRole('button', {
		name: 'Change to Medium Violet Red',
	});
	const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });

	// disable button
	fireEvent.click(checkbox);
	//expect color gray to be disabled
	expect(colorButton).toHaveStyle({ background: 'gray' });

	// re-enable button
	fireEvent.click(checkbox);
	//expect color red to be enabled
	expect(colorButton).toHaveStyle({
		background: 'Change to Medium Violet Red',
	});

	//change to blue
	fireEvent.click(colorButton);
	// expect to change to blue
	expect(colorButton).toHaveStyle({ background: 'Midnight Blue' });
	///check the box
	fireEvent.click(checkbox);
	// expect to be desable
	expect(colorButton).toBeDisabled();

	// enabled button
	fireEvent.click(checkbox);

	// expect to change to blue
	expect(colorButton).toHaveStyle({
		background: 'Change to Medium Violet Red',
	});
});
