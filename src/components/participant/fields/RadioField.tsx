"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setFormFieldsValue } from "@/redux/slices/participant/participantSlice";
import { INPUT_TYPES } from "@/utils/constants";
import React from "react";

const RadioField = ({ field, values }: { field: string; values: [string] }) => {
  const dispatch = useAppDispatch();

  const handleValueChange = (value: string) => {
    dispatch(setFormFieldsValue({ field, value }));
  };

  return (
    <div className="border-b-2 px-2 py-1 w-full rounded-md">
      {values?.map((value, index) => (
        <div key={index} className="flex items-center gap-2" >
          <input onClick={(e)=> handleValueChange(value)} className="cursor-pointer" type={INPUT_TYPES.radio} name={field} />
          <span>{value}</span>
        </div>
      ))}
    </div>
  );
};

export default RadioField;
