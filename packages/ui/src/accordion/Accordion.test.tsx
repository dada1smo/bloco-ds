import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { Accordion } from './Accordion';

const items = [
  { title: 'First', content: 'First content', open: true },
  { title: 'Second', content: 'Second content' },
];

describe('Accordion', () => {
  it('opens items marked `open`', () => {
    render(<Accordion items={items} />);
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('is exclusive by default', async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: 'Second' }));
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByText('Second content')).toBeVisible();
  });

  it('keeps several open with allowsMultipleExpanded and toggles by keyboard', async () => {
    render(<Accordion items={items} allowsMultipleExpanded />);
    await userEvent.tab();
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Second' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: 'First' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('respects defaultExpandedKeys and passes className', () => {
    const { container } = render(
      <Accordion items={items} defaultExpandedKeys={['1']} className="consumer" />,
    );
    expect(screen.getByRole('button', { name: 'Second' })).toHaveAttribute('aria-expanded', 'true');
    expect(container.firstElementChild).toHaveClass('consumer');
  });
});
