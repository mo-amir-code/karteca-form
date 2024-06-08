"use client";
import { useAppDispatch } from "@/redux/hooks";
import { updateFormValueType } from "@/redux/slices/form/formSlice";
import { inputValueTypes } from "@/utils/constants/data";
import React, { useEffect, useState } from "react";

const SelectionField = ({ index, defaultSelected }: { index: number, defaultSelected:string }) => {
    const [selectedValue, setSelectedValue] = useState<string>(defaultSelected);
    const dispatch = useAppDispatch();

    const handleValueChange = (value:string) => {
        setSelectedValue(value)
        dispatch(updateFormValueType({index, newType:value}));
    }


    useEffect(() => {
        setSelectedValue(defaultSelected);
    }, [defaultSelected, setSelectedValue]);


  return (
    <select onChange={(e)=> handleValueChange(e.target.value)} value={selectedValue} className="bg-transparent p-2 cursor-pointer">
      {inputValueTypes.map((item, idx) => (
        <option key={idx} value={item.slug}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectionField;
