import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

export const ACCORDION_TEST_ID: string = 'accordion';

type RootElement = React.ElementRef<typeof AccordionPrimitive.Root>;
type Props = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
> & {};

const Accordion = React.forwardRef<RootElement, Props>(
  ({ children, ...props }, forwardedRef) => (
    <AccordionPrimitive.Root
      data-testid={ACCORDION_TEST_ID}
      ref={forwardedRef}
      {...props}
    >
      {children}
    </AccordionPrimitive.Root>
  )
);

export default Accordion;
