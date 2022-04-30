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
    const parent = screen.getByRole('button');

    expect(within(parent).getByRole('presentation')).not.toBeNull();
  });

  test("doesn't throw errors to the console", () => {
    expect(errorConsole).not.toHaveBeenCalled();
  });
});
