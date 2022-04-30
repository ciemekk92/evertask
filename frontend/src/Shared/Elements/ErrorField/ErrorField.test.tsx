import { render, screen } from '@testing-library/react';
import { ErrorField } from './ErrorField';

describe('ErrorField', () => {
  let errorConsole: jest.SpyInstance;

  beforeAll(() => {
    errorConsole = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    errorConsole.mockRestore();
  });

  test('renders nothing when error is empty', () => {
    render(<ErrorField error={''} />);

    expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
  });

  test('renders error message, when error is not empty', () => {
    render(<ErrorField error={'Error message'} />);

    expect(screen.getByRole('presentation')).toHaveTextContent('Error message');
  });

  test("doesn't throw errors to the console", () => {
    expect(errorConsole).not.toHaveBeenCalled();
  });
});
