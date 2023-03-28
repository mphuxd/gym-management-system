import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

const Tooltip = React.forwardRef(
  ({ trigger, content, ...props }, forwardedRef) => (
    <TooltipPrimitive.Provider ref={forwardedRef} {...props}>
      <TooltipPrimitive.Root delayDuration={0}>
        <TooltipPrimitive.Trigger asChild className="relative bg-transparent">
          {trigger}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal className="relative">
          <TooltipPrimitive.Content
            id={content}
            sideOffset={4}
            className="h-fit w-fit rounded-lg bg-dark px-2 py-1 text-sm text-white"
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-dark" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
