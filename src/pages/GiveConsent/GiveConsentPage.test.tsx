import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GiveConsentPage } from './GiveConsentPage';

test('renders consent checkboxes', () => {
    render(<GiveConsentPage />);
    const firstCheckbox = screen.getByText(/Receive newsletter/i);
    expect(firstCheckbox).toBeInTheDocument();
    const secondCheckbox = screen.getByText(/Be shown targeted ads/i);
    expect(secondCheckbox).toBeInTheDocument();
    const thirdCheckbox = screen.getByText(/Contribute to anonymous visit statistics/i);
    expect(thirdCheckbox).toBeInTheDocument();
});

test('verify if button is disabled depending on checkboxes interations', () => {
    render(<GiveConsentPage />);
    const button = screen.getByText(/Give consent/i);
    expect(button).toBeInTheDocument();
    expect(button.closest('button')).toBeDisabled();

    const firstCheckbox = screen.getByText(/Receive newsletter/i);
    fireEvent.click(firstCheckbox)

    expect(button.closest('button')).toBeEnabled();
});

test('verify if button action does not work with empty inputs', () => {
    render(<GiveConsentPage />);
    const button = screen.getByText(/Give consent/i);
    const firstCheckbox = screen.getByText(/Receive newsletter/i);
    fireEvent.click(firstCheckbox)
    fireEvent.click(button)

    const snackbar = screen.getByText(/Please, fill in a valid /i);
    expect(snackbar).toBeInTheDocument();
});
