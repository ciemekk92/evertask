import { render, screen, within } from '@testing-library/react';
import { IconButton } from './IconButton';

describe('IconButton', () => {
  let errorConsole: jest.SpyInstance;

  beforeAll(() => {
    errorConsole = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    errorConsole.mockRestore();
  });

  test('renders outlined icon', () => {
    render(<IconButton iconName="login">TEST</IconButton>);
    const parent = screen.getByTestId('button_wrapper');

    expect(within(parent).getByTestId('button_icon')).not.toBeNull();
  });

  test("doesn't throw errors to the console", () => {
    expect(errorConsole).not.toHaveBeenCalled();
  });
});
