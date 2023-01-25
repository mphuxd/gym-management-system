import React from 'react';
import { render, screen } from '@testing-library/react';
import CardSimple, { CARD_SIMPLE_TEST_ID } from '../CardSimple';

describe('CardSimple ', () => {
  it('should match snapshot', async () => {
    const heading = 'Card Heading';
    const description = 'Card Description';
    render(<CardSimple heading={heading} description={description} />);

    const cardSimple = await screen.findByTestId(CARD_SIMPLE_TEST_ID);
    expect(cardSimple).toHaveTextContent(heading);
    expect(cardSimple).toHaveTextContent(description);
    expect(cardSimple).toMatchSnapshot();
  });
});
