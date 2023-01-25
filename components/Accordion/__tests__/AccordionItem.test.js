import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion, { ACCORDION_TEST_ID } from '../Accordion';
import AccordionItem, {
  ACCORDION_CONTENT_TEST_ID,
  ACCORDION_HEADER_TEST_ID,
  ACCORDION_ITEM_TEST_ID,
  ACCORDION_TRIGGER_TEST_ID,
} from '../AccordionItem';

describe('AccordionItem: ', () => {
  it('should render', async () => {
    render(
      <Accordion>
        <AccordionItem header="item-title">content</AccordionItem>
      </Accordion>
    );
    const item = await screen.findByTestId(ACCORDION_ITEM_TEST_ID);
    expect(item).toMatchSnapshot();
    const header = await screen.findByTestId(ACCORDION_HEADER_TEST_ID);
    expect(header).toMatchSnapshot();
    const content = await screen.findByTestId(ACCORDION_CONTENT_TEST_ID);
    expect(content).toMatchSnapshot();
    const trigger = await screen.findByTestId(ACCORDION_TRIGGER_TEST_ID);
    expect(trigger).toMatchSnapshot();
  });

  it('should pass string to header', async () => {
    const headerString = 'item-header';
    render(
      <Accordion>
        <AccordionItem header={headerString}>content</AccordionItem>
      </Accordion>
    );
    const header = await screen.findByTestId(ACCORDION_HEADER_TEST_ID);
    expect(header).toHaveTextContent(headerString);
  });

  it('should be collapsed and hide content on click', async () => {
    const className = 'class-test';
    render(
      <Accordion
        type="single"
        defaultValue="test"
        collapsible
        className={className}
      >
        <AccordionItem value="test" header="Section 1 title">
          content
        </AccordionItem>
      </Accordion>
    );
    const buttons = await screen.findAllByTestId(ACCORDION_TRIGGER_TEST_ID);
    expect(screen.queryByText('content')).toBeInTheDocument();
    expect(await buttons[0]).toHaveAttribute('data-state', 'open');
    await userEvent.click(buttons[0]);
    expect(screen.queryByText('content')).not.toBeInTheDocument();
    expect(await buttons[0]).toHaveAttribute('data-state', 'closed');
    const accordion = await screen.findByTestId(ACCORDION_TEST_ID);
    expect(accordion).toMatchSnapshot();
  });

  it('should be expanded and show content on click', async () => {
    const className = 'class-test';
    render(
      <Accordion
        type="single"
        defaultValue="test"
        collapsible
        className={className}
      >
        <AccordionItem value="test" header="Section 1 title">
          content
        </AccordionItem>
      </Accordion>
    );
    const buttons = await screen.findAllByTestId(ACCORDION_TRIGGER_TEST_ID);
    expect(screen.queryByText('content')).toBeInTheDocument();
    expect(await buttons[0]).toHaveAttribute('data-state', 'open');
    await userEvent.click(buttons[0]);
    expect(screen.queryByText('content')).not.toBeInTheDocument();
    expect(await buttons[0]).toHaveAttribute('data-state', 'closed');
    await userEvent.click(buttons[0]);
    expect(screen.queryByText('content')).toBeInTheDocument();
    expect(await buttons[0]).toHaveAttribute('data-state', 'open');
    const accordion = await screen.findByTestId(ACCORDION_TEST_ID);
    expect(accordion).toMatchSnapshot();
  });
});
