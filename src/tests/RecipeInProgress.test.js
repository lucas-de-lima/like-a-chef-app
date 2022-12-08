import { act, cleanup, screen } from '@testing-library/react';
import React from 'react';
import mockFetch from '../../cypress/mocks/fetch';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('teste da página recipe in progress', () => {
  beforeEach(async () => {
    global.fetch = jest.fn(mockFetch);
  });

  afterEach(() => {
    cleanup();
  });
  it('Verifica se a instrução é renderizada corretamente', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => history.push('/meals/52771/in-progress'));

    const instruction = await screen.findByTestId('instructions');
    expect(instruction).toBeInTheDocument();
  });
});
