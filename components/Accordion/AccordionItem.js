import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from '@carbon/icons-react';

export const ACCORDION_ITEM_TEST_ID = 'accordion-item';
export const ACCORDION_TRIGGER_TEST_ID = 'accordion-trigger';
export const ACCORDION_HEADER_TEST_ID = 'accordion-header';
export const ACCORDION_CONTENT_TEST_ID = 'accordion-content-text';

const AccordionItem = React.forwardRef(
  ({ children, header, value, ...props }, forwardedRef) => (
    <AccordionPrimitive.Item
      {...props}
      ref={forwardedRef}
      value={value}
      data-testid={ACCORDION_ITEM_TEST_ID}
    >
      <AccordionPrimitive.Header data-testid={ACCORDION_HEADER_TEST_ID}>
        <AccordionPrimitive.Trigger
          className="group flex w-full flex-row items-center justify-between bg-transparent"
          data-testid={ACCORDION_TRIGGER_TEST_ID}
        >
          <h3>{header}</h3>
          <ChevronDown className="transition duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:transform" />
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content data-testid={ACCORDION_CONTENT_TEST_ID}>
        {children}
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  )
);

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
