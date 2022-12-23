import React from "react";
import style from "./Card.module.scss";
import { ArrowRight } from "@carbon/icons-react";

function CardSimple({ heading, description, icon }) {
  return (
    <div className={style.cardSimple}>
      <div className='flex flex-col gap-y-3'>
        <h2 className='text-2xl font-medium'>{heading}</h2>
        <p className={style.cardSimpleDescription}>{description}</p>
      </div>
      <ArrowRight size={24}></ArrowRight>
    </div>
  );
}

export default CardSimple;
