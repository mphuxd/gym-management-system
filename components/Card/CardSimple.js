import React from "react";
import { ArrowRight } from "@carbon/icons-react";

function CardSimple({ heading, description }) {
  return (
    <div className='flex flex-col justify-between h-52 p-4 bg-white focus:bg-slate5 active:bg-slate5 shadow-xl shadow-mauve7 hover:shadow-mauve8 '>
      <div className='flex flex-col gap-y-3'>
        <h2 className='text-2xl font-medium'>{heading}</h2>
        <p className='max-w-sm text-lg'>{description}</p>
      </div>
      <ArrowRight className='text-red11' size={24} />
    </div>
  );
}

export default CardSimple;
