import React from 'react';
import cx from 'classnames';
import * as Separator from '@radix-ui/react-separator';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@/components';

function CardSubscription({
  planName,
  planDescription,
  price,
  planLookUpKey,
  planIdValue,
  className,
  features,
  footnotes,
}) {
  const classNames = cx(className, 'flex flex-col items-center');

  return (
    <div className={classNames}>
      <div className="flex flex-col p-8 bg-white hover:bg-slate3 active:bg-slate4 outline outline-slate7 outline-[1px] focus:outline-slate8 focus:ring-2 focus:ring-blue8 rounded-2xl justify-between h-[32rem] hover:shadow-lg hover:shadow-purple6">
        <div className="description flex flex-col justify-center">
          <h2 className="text-2xl font-semibold w-fit ">{planName}</h2>
          <h3 className="mt-5">{planDescription}</h3>
          <h4 className="text-2xl font-bold mt-6">{price}</h4>
          <Separator.Root className="h-[1px] my-4" />
          <div className="flex flex-col mb-3 gap-y-1">
            {features &&
              features.map((feature) => (
                <div className="flex flex-row items-center">
                  <CheckCircledIcon width={16} height={16} className="mr-1" />
                  <span className="inline-block ">{feature}</span>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col">
          <form className="mt-4" action="/api/checkout_sessions" method="POST">
            {/* Stripe - Add a hidden field with the lookup_key of your Price */}
            <input type="hidden" name="lookup_key" value={planLookUpKey} />
            <input type="hidden" name="planId" value={planIdValue} />
            <button id="checkout-and-portal-button" type="submit">
              <Button as="div" intent="tertiary" size="large">
                Subscribe
              </Button>
            </button>
          </form>
          <span className="text-sm mt-4">{footnotes}</span>
        </div>
      </div>
    </div>
  );
}

export default CardSubscription;
