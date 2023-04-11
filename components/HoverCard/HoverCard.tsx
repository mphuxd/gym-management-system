import React from 'react';
import * as HoverCardPrimitive from '@radix-ui/react-hover-card';

export interface HoverCardProps extends HoverCardPrimitive.HoverCardProps {
  trigger: string;
}

function HoverCard({ children, trigger, ...props }) {
  return (
    <HoverCardPrimitive.Root {...props}>
      <HoverCardPrimitive.Trigger className="hover:underline">
        {trigger}
      </HoverCardPrimitive.Trigger>
      <HoverCardPrimitive.Portal>
        <HoverCardPrimitive.Content
          tabIndex={0}
          side="top"
          align="start"
          className="bg-layer px-4 py-3 shadow-md shadow-mauve10 outline outline-1 outline-border-subtle-dark drop-shadow-md hover:bg-layer-hover hover:outline-border-subtle-darker"
        >
          <HoverCardPrimitive.Arrow className="fill-icon" />
          {children}
        </HoverCardPrimitive.Content>
      </HoverCardPrimitive.Portal>
    </HoverCardPrimitive.Root>
  );
}

HoverCard.displayName = 'HoverCard';

export default HoverCard;
