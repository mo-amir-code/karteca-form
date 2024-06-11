"use client";
import React, { FormEvent, useState } from "react";
import TextField from "./fields/TextField";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  createNewFieldInForm,
  deleteFormField,
  resetFormInfo,
  selectForm,
  setFormSubmitStatus,
} from "@/redux/slices/form/formSlice";
import SelectionField from "./fields/SelectionField";
import DateField from "./fields/DateField";
import { CiSquarePlus } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import RadioField from "./fields/RadioField";
import CheckboxField from "./fields/CheckboxField";
import DropDownField from "./fields/DropdownField";
import Hero from "./Hero";
import { NewFormType } from "@/redux/queries/form/formTypes";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  INPUT_TYPES,
} from "@/utils/constants";
import TimeStamps from "./TimeStamps";
import toast from "react-hot-toast";
import { useCreateFormMutation } from "@/redux/queries/form/formQuery";
import { APIRequestType } from "@/redux/reduxTypes";
import FormSubmit from "./FormSubmit";
import { FormDataAfterSubmitType } from "@/utils/types/client/form";

const Form = () => {
  const [formDataAfterSubmit, setFormDataAfterSubmit] = useState<FormDataAfterSubmitType | null>(null);
  const {
    fields,
    values,
    title,
    description,
    startTime,
    expiryTime,
    isFormSubmit,
  } = useAppSelector(selectForm);
  const dispatch = useAppDispatch();
  const [createForm] = useCreateFormMutation();

  const handleOnSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (title === DEFAULT_TITLE) {
      toast.error("Set form title");
      return;
    }

    if (description === DEFAULT_DESCRIPTION) {
      toast.error("Set form description");
      return;
    }

    let isFieldsCorrect = true;

    values.forEach((ele, idx) => {
      switch (ele.type) {
        case INPUT_TYPES.checkbox:
          if (ele.value?.length === 0) {
            isFieldsCorrect = false;
            toast.error(`Provide atleast 1 option at no. ${idx + 1} field`);
          }
          break;
        case INPUT_TYPES.radio:
          if (ele.value?.length === 0) {
            isFieldsCorrect = false;
            toast.error(`Provide atleast 1 option at no. (${idx + 1}) field`);
          }
          break;
        case INPUT_TYPES.select:
          if (ele.value?.length === 0) {
            isFieldsCorrect = false;
            toast.error(`Provide atleast 1 option at no. (${idx + 1}) field`);
          }
          break;
      }
    });

    if (!isFieldsCorrect) {
      return;
    }

    const apiData: NewFormType = {
      title,
      description,
      fields: {
        fields,
        values,
      },
      startTime,
      expiryTime,
    };

    try {
      const { data, error } = (await createForm(apiData)) as {
        data: APIRequestType;
        error?: { data: APIRequestType };
      };

      if (data.success) {
        const { uid, title, formId } = data.data;
        toast.success(data.message);
        setFormDataAfterSubmit({
          uid,
          title,
          formId
        });
        dispatch(resetFormInfo(null));
        dispatch(setFormSubmitStatus(true));
      }

      if (error?.data?.success === false) {
        toast.error(error?.data?.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something error happened!");
    }
  };

  const handleCreateNewField = (index: number) => {
    dispatch(createNewFieldInForm({ index }));
  };

  const handleDeleteField = (index: number) => {
    dispatch(deleteFormField({ index }));
  };

  return (isFormSubmit && formDataAfterSubmit) ? (
    <FormSubmit title={formDataAfterSubmit.title} uid={formDataAfterSubmit.uid} formId={formDataAfterSubmit.formId} />
  ) : (
    <form onSubmit={handleOnSubmit} className="space-y-2">
      <TimeStamps />
      <Hero />
      {fields.map((field: string, index: number) => (
        <div
          key={index}
          className="relative bg-white rounded-md space-y-4 w-full p-4"
        >
          <div className="flex gap-2">
            <TextField
              type={INPUT_TYPES.text}
              placeholder={field}
              index={index}
            />
            <SelectionField
              index={index}
              defaultSelected={values[index].type}
            />
          </div>
          {(() => {
            switch (values[index].type) {
              case INPUT_TYPES.text:
                return (
                  <TextField
                    type={values[index].type}
                    placeholder={values[index].type.toUpperCase()}
                    isDisable
                  />
                );
              case INPUT_TYPES.date:
                return <DateField isDisable />;
              case INPUT_TYPES.radio:
                return <RadioField index={index} />;
              case INPUT_TYPES.checkbox:
                return <CheckboxField index={index} />;
              case INPUT_TYPES.select:
                return <DropDownField index={index} />;
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
      <button
        type="submit"
        className="px-3 py-2 rounded-md smooth_transition active:scale-90 bg-primary text-white"
      >
        Create Form
      </button>
    </form>
  );
};

export default Form;
