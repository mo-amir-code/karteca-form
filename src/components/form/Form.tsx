"use client";
import React from "react";
import TextField from "./fields/TextField";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createNewFieldInForm,
  deleteFormField,
  selectForm,
} from "@/redux/slices/form/formSlice";
import SelectionField from "./fields/SelectionField";
import DateField from "./fields/DateField";
import { CiSquarePlus } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import RadioField from "./fields/RadioField";
import CheckboxField from "./fields/CheckboxField";
import DropDownField from "./fields/DropdownField";
import Hero from "./Hero";

const Form = () => {
  const { fields, values } = useAppSelector(selectForm);
  const dispatch = useAppDispatch();

  const handleCreateNewField = (index: number) => {
    dispatch(createNewFieldInForm({ index }));
  };

  const handleDeleteField = (index: number) => {
    dispatch(deleteFormField({ index }));
  };

  return (
    <form className="space-y-2">
      <Hero />
      {fields.map((field: string, index: number) => (
        <div
          key={index}
          className="relative bg-white rounded-md space-y-4 w-full p-4"
        >
          <div className="flex gap-2">
            <TextField type={"text"} placeholder={field} index={index} />
            <SelectionField
              index={index}
              defaultSelected={values[index].type}
            />
          </div>
          {(() => {
            switch (values[index].type) {
              case "text":
                return (
                  <TextField
                    type={values[index].type}
                    placeholder={values[index].type.toUpperCase()}
                    isDisable
                  />
                );
              case "date":
                return <DateField isDisable />;
              case "radio":
                return <RadioField index={index}/>
              case "checkbox":
                return <CheckboxField index={index}/>
              case "select":
                return <DropDownField index={index}/>
            }
          })()}
          <div className="absolute gap-2 -top-4 flex flex-col -right-10 bg-white p-1 rounded-sm">
            <span
              onClick={() => handleCreateNewField(index)}
              className="cursor-pointer"
            >
              <CiSquarePlus className="w-6 h-6" />
            </span>
            {index !== 0 && (
              <span
                onClick={() => handleDeleteField(index)}
                className="cursor-pointer"
              >
                <MdDeleteForever className="w-6 h-6" />
              </span>
            )}
          </div>
        </div>
      ))}
    </form>
  );
};

export default Form;
