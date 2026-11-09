import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from '../button/Button';
import { Card } from './Card';

describe('Card', () => {
  it('renders heading at the chosen level, description, metadata and children', () => {
    render(
      <Card heading="Project Alpha" headingLevel={2} description="Design system" metadata="Updated today">
        <p>Extra</p>
      </Card>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Project Alpha' })).toBeInTheDocument();
    expect(screen.getByText('Design system')).toBeInTheDocument();
    expect(screen.getByText('Updated today')).toBeInTheDocument();
    expect(screen.getByText('Extra')).toBeInTheDocument();
  });

  it('defaults to an h3 and has no landmark as div', () => {
    render(<Card heading="Project Alpha" />);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    expect(screen.queryByRole('region')).not.toBeInTheDocument();
  });

  it('as section is a region named by its heading', () => {
    render(<Card as="section" heading="Usage" />);
    expect(screen.getByRole('region', { name: 'Usage' })).toBeInTheDocument();
  });

  it('as section prefers an explicit aria-label', () => {
    render(<Card as="section" aria-label="Billing summary" />);
    expect(screen.getByRole('region', { name: 'Billing summary' })).toBeInTheDocument();
  });

  it('hides the icon and treats the image as decorative by default', () => {
    const { container } = render(<Card icon={<svg data-testid="icon" />} image={{ src: 'a.png' }} />);
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true');
    expect(container.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('keeps an informative image alt', () => {
    render(<Card image={{ src: 'a.png', alt: 'Dashboard preview' }} />);
    expect(screen.getByRole('img', { name: 'Dashboard preview' })).toBeInTheDocument();
  });

  it('renders a working action and forwards className', async () => {
    const onPress = vi.fn();
    const { container } = render(
      <Card
        heading="Project Alpha"
        className="custom"
        action={<Button onPress={onPress}>Edit Project Alpha</Button>}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Edit Project Alpha' }));
    expect(onPress).toHaveBeenCalledOnce();
    expect(container.firstChild).toHaveClass('custom');
  });
});
