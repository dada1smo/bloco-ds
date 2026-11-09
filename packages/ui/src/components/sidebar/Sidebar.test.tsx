import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  it('renders the side rail before the content and forwards attributes and className', () => {
    render(
      <Sidebar side={<nav aria-label="Main">Menu</nav>} data-testid="layout" className="consumer">
        <article>Content</article>
      </Sidebar>,
    );
    const nav = screen.getByRole('navigation', { name: 'Main' });
    const article = screen.getByRole('article');
    expect(nav.compareDocumentPosition(article) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(screen.getByTestId('layout')).toHaveClass('consumer');
  });
});
