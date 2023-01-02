import React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const Tooltip = React.forwardRef(({ trigger, content, ...props }, forwardedRef) => {
  return (
    <TooltipPrimitive.Provider ref={forwardedRef} {...props}>
      <TooltipPrimitive.Root delayDuration={0}>
        <TooltipPrimitive.Trigger className='relative'>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal className='relative'>
          <TooltipPrimitive.Content
            sideOffset={4}
            className='bg-slate-600 text-white text-sm px-2 py-1 rounded-lg  h-fit w-fit'
          >
            {content}
            <TooltipPrimitive.Arrow className='fill-slate-600' />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
});

Tooltip.displayName = "Tooltip";

export default Tooltip;