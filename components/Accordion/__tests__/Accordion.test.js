import React from 'react';
import { render, screen } from '@testing-library/react';
import Accordion, { ACCORDION_TEST_ID } from '../Accordion';
import AccordionItem from '../AccordionItem';

describe('Accordion ', () => {
  it('should render custom classnames', async () => {
    const className = 'class-test';
    render(
      <Accordion className={className}>
        <AccordionItem header="Section 1 header">content</AccordionItem>
        <AccordionItem header="Section 2 header">content 2</AccordionItem>
        <AccordionItem header="Section 3 header">content 3</AccordionItem>
      </Accordion>
    );
    const accordion = await screen.findByTestId(ACCORDION_TEST_ID);
    expect(accordion).toHaveClass(className);
    expect(accordion).toMatchSnapshot();
  });
});
