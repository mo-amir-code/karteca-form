"use client";
import { useAppDispatch } from "@/redux/hooks";
import {
  deleteFormValue,
  updateFormValue,
} from "@/redux/slices/form/formSlice";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { CiSquarePlus } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";

const RadioField = ({ index }: { index: number }) => {
  const [choices, setChoices] = useState<[string]>([""]);
  const dispatch = useAppDispatch();

  const handleCreateNewChoiceField = () => {
    if (choices.length < 4) {
      const updatedChoices = [...choices];
      updatedChoices.push("");
      setChoices([...updatedChoices] as [string]);
    } else {
      toast.error("Maximum 4 choices allowed");
    }
  };

  const handleChoiceValueChange = ({
    value,
    valueIndex,
  }: {
    value: string;
    valueIndex: number;
  }) => {
    dispatch(updateFormValue({ index, valueIndex, newValue: value }));
  };

  const handleDeleteChoice = ({ valueIndex }: { valueIndex: number }) => {
    let newChoices = [...choices];
    newChoices = newChoices.filter(
      (v: string, idx: number) => idx !== valueIndex
    );
    setChoices(newChoices as [string]);
    dispatch(deleteFormValue({ index, valueIndex }));
  };

  return (
    <div className=" relative">
      {choices.map((choice, idx) => (
        <div className="flex relative items-center gap-2">
          <input type="radio" checked disabled className="outline-none" />
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
          {idx === choices.length - 1 && idx !== 0 && (
            <span
              onClick={() => handleDeleteChoice({ valueIndex: idx })}
              className="absolute top-1 cursor-pointer right-[48%]"
            >
              <MdDeleteForever className="w-5 h-5" />
            </span>
          )}
        </div>
      ))}
      <span
        onClick={() => handleCreateNewChoiceField()}
        className="absolute bottom-0 cursor-pointer right-[44%]"
      >
        <CiSquarePlus className="w-6 h-6" />
      </span>
    </div>
  );
};

export default RadioField;
