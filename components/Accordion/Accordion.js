import React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const Accordion = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <AccordionPrimitive.Root ref={forwardedRef} {...props}>
      {children}
    </AccordionPrimitive.Root>
  );
});

Accordion.displayName = "Accordion";

export default Accordion;
