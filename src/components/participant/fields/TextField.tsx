"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setFormFieldsValue } from "@/redux/slices/participant/participantSlice";
import { INPUT_TYPES } from "@/utils/constants";
import React from "react";

const TextField = ({field}:{field:string}) => {
    const dispatch = useAppDispatch();

    const handleValueChange = (value:string) => {
        dispatch(setFormFieldsValue({field, value}));
    }

  return (
    <div className="border-b-2 px-2 py-1 w-full rounded-md">
      <input onChange={(e)=> handleValueChange(e.target.value)} type={INPUT_TYPES.text} className="outline-none text-sm w-full bg-transparent" />
    </div>
  );
};

export default TextField;
