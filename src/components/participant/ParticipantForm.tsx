"use client";
import { useGetFormQuery, useParticipantFormSubmitMutation } from "@/redux/queries/form/formQuery";
import { useParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import ScreenLoader from "../loaders/ScreenLoader";
import Hero from "./Hero";
import { ParticipantGetFormAPIType } from "@/utils/types/client/form";
import DefaultField from "./DefaultField";
import ButtonLoader from "../loaders/ButtonLoader";
import { selectParticipantForm } from "@/redux/slices/participant/participantSlice";
import { useAppSelector } from "@/redux/hooks";
import { APIRequestType } from "@/redux/reduxTypes";

const ParticipantForm = () => {
  const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
  const { formId } = useParams();
  const { data, isError, isSuccess, isFetching, isLoading } = useGetFormQuery(
    formId as string,
    { skip: formId ? false : true }
  ) as ParticipantGetFormAPIType;
  const form = useAppSelector(selectParticipantForm);
  const [submitForm] = useParticipantFormSubmitMutation();

  if (isError) {
    toast.error("Something Error Happened!");
    return <Error />;
  }

  if (isFetching || isLoading) {
    return <ScreenLoader />;
  }


  const handleOnSubmit = async (e:FormEvent) => {
    e.preventDefault();

    let isAllFieldsFilled = true;

    data?.data?.fields?.fields.forEach((field:string) => {
      if(!form.hasOwnProperty(field)){
        isAllFieldsFilled = false;
      }
    });

    if(!isAllFieldsFilled){
      toast.error("Please fill all the required fields");
      return;
    };

    if(!formId){
      toast.error("Something Error Happened!");
      return;
    }

    try {
      setIsButtonLoading(true);

      const {data, error} = await submitForm({formId:formId as string, participant:form}) as { data: APIRequestType, error?: { data:APIRequestType } }

      if(data){
        toast.success(data?.message);
      }

      if(error){
        toast.error(error?.data?.message);
      }

      setIsButtonLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Something Error Happened!");
      setIsButtonLoading(false);
    }


  }

  return (
    <form onSubmit={handleOnSubmit} className="space-y-2">
      {isSuccess && data ? (
        <>
          <Hero
            title={data?.data?.title}
            description={data?.data?.description}
          />

          {data?.data?.fields.fields.map((field: string, idx: number) => (
            <DefaultField
              key={idx}
              field={field}
              values={data?.data?.fields?.values[idx]}
            />
          ))}
        </>
      ) : (
        <Error />
      )}

      <button
        type="submit"
        className="px-3 py-2 rounded-md smooth_transition active:scale-90 bg-primary text-white"
      >
        {isButtonLoading ? <ButtonLoader /> : "Submit"}
      </button>
    </form>
  );
};

export default ParticipantForm;

const Error = () => {
  return (
    <div className="flex items-center justify-center h-[90vh]">
      <span className="text-xl font-medium text-red-600">
        Something Error Happened
      </span>
    </div>
  );
};
