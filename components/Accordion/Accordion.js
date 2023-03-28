import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

export const ACCORDION_TEST_ID = 'accordion';

const Accordion = React.forwardRef(
  ({ type, defaultValue, collapsible, children, ...props }, forwardedRef) => (
    <AccordionPrimitive.Root
      type={type}
      defaultValue={defaultValue}
      collapsible={collapsible}
      ref={forwardedRef}
      {...props}
      data-testid={ACCORDION_TEST_ID}
    >
      {children}
    </AccordionPrimitive.Root>
  )
);

Accordion.displayName = 'Accordion';

export default Accordion;
