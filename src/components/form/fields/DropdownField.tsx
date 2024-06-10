"use client";
import { useAppDispatch } from "@/redux/hooks";
import {
  deleteFormValue,
  updateFormValue,
} from "@/redux/slices/form/formSlice";
import { INPUT_TYPES } from "@/utils/constants";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiSquarePlus } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { MdOutlineArrowDropDown } from "react-icons/md";

const DropDownField = ({ index }: { index: number }) => {
  const [drop, setdrop] = useState<[string]>([""]);
  const dispatch = useAppDispatch();

  const handleCreateNewDropField = () => {
    if (drop.length < 20) {
      const updatedDrop = [...drop];
      updatedDrop.push("");
      setdrop([...updatedDrop] as [string]);
    } else {
      toast.error("Maximum 20 drop down options allowed");
    }
  };

  const handleDropValueChange = ({
    value,
    valueIndex,
  }: {
    value: string;
    valueIndex: number;
  }) => {
    dispatch(updateFormValue({ index, valueIndex, newValue: value }));
  };

  const handleDeletedrop = ({ valueIndex }: { valueIndex: number }) => {
    let newDrop = [...drop];
    newDrop = newDrop.filter((v: string, idx: number) => idx !== valueIndex);
    setdrop(newDrop as [string]);
    dispatch(deleteFormValue({ index, valueIndex }));
  };

  return (
    <div className=" relative">
      {drop.map((item, idx) => (
        <div key={idx} className="flex relative items-center gap-2">
          <MdOutlineArrowDropDown className="w-4 h-4" />
          <input
            onChange={(e) =>
              handleDropValueChange({
                value: e.target.value,
                valueIndex: idx,
              })
            }
            type={INPUT_TYPES.text}
            className="outline-none border-b"
          />
          {idx === (drop.length-1) && idx !== 0 && 
            <span
              onClick={() => handleDeletedrop({ valueIndex: idx })}
              className="absolute top-1 cursor-pointer right-[48%]"
            >
              <MdDeleteForever className="w-5 h-5" />
            </span>
          }
        </div>
      ))}

      <span
        onClick={() => handleCreateNewDropField()}
        className={`absolute cursor-pointer bottom-0 right-[44%]`}
      >
        <CiSquarePlus className="w-6 h-6" />
      </span>
    </div>
  );
};

export default DropDownField;
