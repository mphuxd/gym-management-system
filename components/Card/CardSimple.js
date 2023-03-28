import React from 'react';
import { ArrowRight } from '@carbon/icons-react';

export const CARD_SIMPLE_TEST_ID = 'cardSimpleTestId';

function CardSimple({ heading, description }) {
  return (
    <div
      className="flex h-52 flex-col justify-between bg-layer p-4 shadow-lg shadow-mauve7 hover:bg-layer-hover hover:shadow-mauve8 focus:bg-slate5 active:bg-layer-active"
      data-testid={CARD_SIMPLE_TEST_ID}
    >
      <div className="flex flex-col gap-y-3">
        <h2 className="text-2xl font-medium">{heading}</h2>
        <p className="max-w-sm text-lg">{description}</p>
      </div>
      <ArrowRight className="text-brand" size={24} />
    </div>
  );
}

export default CardSimple;
