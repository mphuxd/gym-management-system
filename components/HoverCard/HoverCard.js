import React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";

const HoverCard = React.forwardRef(({ children, trigger, ...props }, forwardedRef) => {
  return (
    <HoverCardPrimitive.Root ref={forwardedRef} {...props}>
      <HoverCardPrimitive.Trigger className="hover:underline">{trigger}</HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          side='top'
          align='start'
          className='px-4 py-3 bg-white outline outline-2 rounded-sm  outline-gray-200'
        >
          <HoverCardPrimitive.Arrow fill='white' />
          {children}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
});

HoverCard.displayName = "HoverCard";

export default HoverCard;
