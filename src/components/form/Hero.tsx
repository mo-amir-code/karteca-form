"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  selectForm,
  updateFormTitleAndDescription,
} from "@/redux/slices/form/formSlice";
import { INPUT_TYPES } from "@/utils/constants";
import React, { useEffect, useState } from "react";

const Hero = () => {
  const { title, description } = useAppSelector(selectForm);
  const [newTitle, setNewTitle] = useState<string>(title);
  const [newDescription, setNewDescription] = useState<string>(description);
  const dispatch = useAppDispatch();

  const handleOnTitleChange = (value: string) => {
    setNewTitle(value);
  };

  const handleOnDescriptionChange = (value: string) => {
    setNewDescription(value);
  };

  useEffect(() => {
    dispatch(
      updateFormTitleAndDescription({
        title: newTitle,
        description: newDescription,
      })
    );
  }, [newTitle, newDescription, dispatch, updateFormTitleAndDescription]);

  return (
    <div className="p-4 space-y-3 bg-white border-t-4 border-primary rounded-lg">
      <input
        onChange={(e) => handleOnTitleChange(e.target.value)}
        type={INPUT_TYPES.text}
        value={newTitle}
        placeholder={title}
        className="text-2xl font-medium outline-none"
      />
      <textarea
        onChange={(e) => handleOnDescriptionChange(e.target.value)}
        value={newDescription}
        rows={3}
        placeholder={description}
        className="text-sm font-medium outline-none w-full row-auto"
      />
    </div>
  );
};

export default Hero;
