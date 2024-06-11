"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setFormFieldsValue } from "@/redux/slices/participant/participantSlice";
import React from "react";

const SelectField = ({
  field,
  values,
}: {
  field: string;
  values: [string];
}) => {
  const dispatch = useAppDispatch();

  const handleValueChange = (value: string) => {
    dispatch(setFormFieldsValue({ field, value }));
  };

  return (
    <div className="border-b-2 px-2 py-1 w-f rounded-md">
      <select onChange={(e) => handleValueChange(e.target.value)} className="bg-transparent px-4 py-2 cursor-pointer w-full" >
        {values?.map((value, index) => (
          <option key={index} value={value}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectField;
