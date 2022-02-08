import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConsentsPage } from './ConsentsPage';

test('renders table with mock', () => {
    render(<ConsentsPage />);
    const table = screen.getByText(/Consent given for/i);
    expect(table).toBeInTheDocument();

    const firstItem = screen.getByText(/Kristina Romaguera/i);
    expect(firstItem).toBeInTheDocument();

    const firstItemOnSecondPage = screen.queryByText(/Nellie Strosin/i);
    expect(firstItemOnSecondPage).toBeNull();
});

test('verify if pagination works', () => {
    render(<ConsentsPage />)
    const button = screen.getByLabelText(/Go to next page/i);
    expect(button).toBeInTheDocument();

    fireEvent.click(button)

    const firstItem = screen.queryByText(/Kristina Romaguera/i);
    expect(firstItem).toBeNull();

    const firstItemOnSecondPage = screen.getByText(/Nellie Strosin/i);
    expect(firstItemOnSecondPage).toBeInTheDocument();
});