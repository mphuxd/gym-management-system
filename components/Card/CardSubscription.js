import React from 'react';
import cx from 'classnames';
import * as Separator from '@radix-ui/react-separator';
import { CheckCircledIcon } from '@radix-ui/react-icons';
import { Button } from '@/components';

export const CARD_SUBSCRIPTION_TEST_ID = 'cardSubscriptionTestId';

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
  return (
    <div
      className={cx(
        className,
        'flex h-[32rem] flex-col items-center justify-between bg-white shadow-mauve7 drop-shadow-xl hover:shadow-lg hover:shadow-mauve8'
      )}
      data-testid={CARD_SUBSCRIPTION_TEST_ID}
    >
      <div className="flex flex-col p-8">
        <div className="flex flex-col justify-center">
          <h2 className="w-fit text-2xl font-semibold">{planName}</h2>
          <h3 className="mt-5">{planDescription}</h3>
          <h4 className="mt-6 text-2xl font-bold">{price}</h4>
          <Separator.Root className="my-4 h-px" />
          <div className="mb-3 flex flex-col gap-y-1">
            {features &&
              features.map((feature) => (
                <div key={feature} className="flex flex-row items-center">
                  <CheckCircledIcon width={16} height={16} className="mr-1" />
                  <span className="inline-block">{feature}</span>
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
          <span className="mt-4 text-sm">{footnotes}</span>
        </div>
      </div>
    </div>
  );
}

export default CardSubscription;
