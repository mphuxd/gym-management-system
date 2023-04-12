import React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';

export const ACCORDION_TEST_ID: string = 'accordion';

type RootElement = React.ElementRef<typeof AccordionPrimitive.Root>;
type RootProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>;

const Accordion = React.forwardRef<RootElement, RootProps>(
  (props, forwardedRef) => {
    const { className, children, ...rest } = props;
    return (
      <AccordionPrimitive.Root
        {...rest}
        ref={forwardedRef}
        data-testid={ACCORDION_TEST_ID}
      >
        {children}
      </AccordionPrimitive.Root>
    );
  }
);

export default Accordion;
