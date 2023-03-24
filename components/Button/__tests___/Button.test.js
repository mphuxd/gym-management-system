import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../Button';

describe('Button ', () => {
  it('should accept and render custom classnames', async () => {
    const className = 'test-class';
    render(<Button className={className}>Test Label</Button>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Label')).toHaveClass(className);
  });

  it('should support rendering element with children prop', async () => {
    const className = 'test-class';
    render(
      <Button className={className}>
        <span>child</span>
      </Button>
    );
    expect(screen.getByText('child')).toBeInTheDocument();
  });

  it('should have a button role', async () => {
    const className = 'test-class';
    render(
      <Button className={className}>
        <span>child</span>
      </Button>
    );
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should support rendering as different html elements with the as prop', async () => {
    const className = 'test-class';
    render(
      <Button data-testid="testid" as="div" className={className}>
        Text Label
      </Button>
    );
    expect(screen.getByTestId('testid')).toBeInTheDocument();
  });

  it.each(['button', 'submit', 'reset'])(
    'should support different types with type prop',
    async (type) => {
      const className = 'test-class';
      render(
        <Button type={type} className={className}>
          Text Label
        </Button>
      );

      expect(screen.getByRole('button')).toHaveAttribute('type', type);
    }
  );

  it('should render default styles', async () => {
    render(
      <div>
        <Button intent="neutral" size="base" length="auto">
          Text Label
        </Button>
        <Button>Text Label</Button>
      </div>
    );

    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toEqual(buttons[1]);
  });
});
