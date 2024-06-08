"use client";
import { useAppDispatch } from "@/redux/hooks";
import { deleteFormValue, updateFormValue } from "@/redux/slices/form/formSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiSquarePlus } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const CheckboxField = ({ index }: { index: number }) => {
  const [boxes, setBoxes] = useState<[string]>([""]);
  const dispatch = useAppDispatch();

  const handleCreateNewBoxField = () => {
    if (boxes.length < 8) {
      const updatedBoxes = [...boxes];
      updatedBoxes.push("");
      setBoxes([...updatedBoxes] as [string]);
    } else {
      toast.error("Maximum 8 checkbox allowed");
    }
  };

  const handleChoiceValueChange = ({
    value,
    valueIndex,
  }: {
    value: string;
    valueIndex: number;
  }) => {
    dispatch(updateFormValue({ index, valueIndex, newValue: value}));
  };

  const handleDeleteBox = ({ valueIndex }: { valueIndex: number }) => {
    let newBoxes = [...boxes];
    newBoxes = newBoxes.filter(
      (v: string, idx: number) => idx !== valueIndex
    );
    setBoxes(newBoxes as [string]);
    dispatch(deleteFormValue({index, valueIndex}));
  };

  return (
    <div className=" relative">
      {boxes.map((box, idx) => (
        <div className="flex relative items-center gap-2">
          <input type="checkbox" checked disabled className="outline-none" />
          <input
            onChange={(e) =>
              handleChoiceValueChange({
                value: e.target.value,
                valueIndex: idx,
              })
            }
            type="text"
            className="outline-none border-b"
          />
          {idx === (boxes.length-1) && idx !== 0 && <span
            onClick={() => handleDeleteBox({ valueIndex: idx })}
            className="absolute top-1 cursor-pointer right-[48%]"
          >
            <MdDeleteForever className="w-5 h-5" />
          </span>}
        </div>
      ))}
      <span
        onClick={() => handleCreateNewBoxField()}
        className="absolute bottom-0 cursor-pointer right-[44%]"
      >
        <CiSquarePlus className="w-6 h-6" />
      </span>
    </div>
  );
};

export default CheckboxField;
