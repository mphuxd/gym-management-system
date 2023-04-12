import React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

export interface TooltipProps extends TooltipPrimitive.TooltipProviderProps {
  content?: string;
}

function Tooltip({ children, content, ...props }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider {...props}>
      <TooltipPrimitive.Root delayDuration={0}>
        <TooltipPrimitive.Trigger asChild className="relative bg-transparent">
          {children}
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
  );
}

Tooltip.displayName = 'Tooltip';

export default Tooltip;
