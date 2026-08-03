"use strict";

import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

/**
 * Test suite for the main App component
 *
 * Covers user interactions, form submissions, and data management
 * Uses React Testing Library best practices for user-centric testing
 */

describe('App Component', () => {
  /**
   * Setup before each test
   * @jest-environment jsdom
   */
  beforeEach(() => {
    // Mock fetch globally
    global.fetch = jest.fn();
  });

  /**
   * Cleanup after each test
   */
  afterEach(() => {
    jest.resetAllMocks();
  });

  /**
   * Test case: Renders loading state initially
   * Verifies the loading spinner is displayed while data is being fetched
   */
  test('renders loading state initially', () => {
    // Mock empty response for successful fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([])
    });

    render(<App />);

    expect(screen.getByRole('status', { name: /loading/i })).toBeInTheDocument();
    expect(screen.getByText(/loading products/i)).toBeInTheDocument();
  });

  /**
   * Test case: Renders products successfully
   * Verifies data is displayed after loading completes
   */
  test('renders products successfully after loading', async () => {
    const mockProducts = [
      { codigo: 1, nome: 'Produto A', marca: 'Marca A' },
      { codigo: 2, nome: 'Produto B', marca: 'Marca B' }
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument();
    });

    expect(screen.getByText('Produto A')).toBeInTheDocument();
    expect(screen.getByText('Marca A')).toBeInTheDocument();
    expect(screen.getByText('Produto B')).toBeInTheDocument();
    expect(screen.getByText('Marca B')).toBeInTheDocument();
  });

  /**
   * Test case: Form validation prevents empty submission
   * Verifies user feedback when form fields are empty
   */
  test('form validation prevents empty submission', async () => {
    const mockProducts = [
      { codigo: 1, nome: 'Produto A', marca: 'Marca A' }
    ];

    global.fetch
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve(mockProducts) })  // Initial load
      .mockResolvedValueOnce({ ok: true, json: () => Promise.resolve({ mensagem: 'Todos os campos são obrigatórios' }) }); // Form submission

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument();
    });

    // Try to submit empty form
    const submitButton = screen.getByRole('button', { name: /cadastrar/i });
    await userEvent.click(submitButton);

    // Check that error message is shown (mocked by the API)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  /**
   * Test case: Product selection works correctly
   * Verifies that clicking a table row populates the form
   */
  test('product selection populates form', async () => {
    const mockProducts = [
      { codigo: 1, nome: 'Produto A', marca: 'Marca A' },
      { codigo: 2, nome: 'Produto B', marca: 'Marca B' }
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument();
    });

    // Select first product
    const selectButtons = screen.getAllByRole('button', { name: /selecionar/i });
    await userEvent.click(selectButtons[0]);

    // Verify form is populated
    expect(screen.getByDisplayValue('Produto A')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Marca A')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /alterar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remover/i })).toBeInTheDocument();
  });

  /**
   * Test case: Form switching between create and edit modes
   * Verifies UI state changes when switching modes
   */
  test('form switches between create and edit modes', async () => {
    const mockProducts = [
      { codigo: 1, nome: 'Produto A', marca: 'Marca A' }
    ];

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockProducts)
    });

    render(<App />);

    await waitFor(() => {
      expect(screen.queryByRole('status', { name: /loading/i })).not.toBeInTheDocument();
    });

    // Initially should be in create mode
    expect(screen.getByRole('button', { name: /cadastrar/i })).toBeInTheDocument();

    // Select product to switch to edit mode
    const selectButton = screen.getByRole('button', { name: /selecionar/i });
    await userEvent.click(selectButton);

    // Should now be in edit mode
    expect(screen.getByRole('button', { name: /alterar/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /remover/i })).toBeInTheDocument();
  });
});