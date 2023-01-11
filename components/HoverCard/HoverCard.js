import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

const HoverCard = React.forwardRef(
  ({ children, trigger, ...props }, forwardedRef) => (
    <HoverCardPrimitive.Root ref={forwardedRef} {...props}>
      <HoverCardPrimitive.Trigger className="hover:underline">
        {trigger}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          side="top"
          align="start"
          className="px-4 py-3 bg-slate2 hover:bg-white outline outline-2 rounded-sm  outline-slate6 focus:outline-slate7 hover:outline-slate8"
        >
          <HoverCardPrimitive.Arrow className="fill-slate9" />
          {children}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  )
);

HoverCard.displayName = 'HoverCard';

export default HoverCard;
