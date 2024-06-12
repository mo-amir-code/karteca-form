"use client";
import { useGetFormInfoQuery } from "@/redux/queries/form/formQuery";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import ScreenLoader from "../loaders/ScreenLoader";
import { IoIosCloseCircle } from "react-icons/io";
import { useAppDispatch } from "@/redux/hooks";
import {
  toggleFormActive,
  toggleGetFormActive,
} from "@/redux/slices/form/formSlice";

const Index = () => {
  const [UID, setUID] = useState<string | null>(null);
  const [isFetchSkip, setIsFetchSkip] = useState<boolean>(true);
  const [captureTimeout, setCaptureTimeout] = useState<any>(null);
  const { data, isLoading, isFetching, isError } = useGetFormInfoQuery(UID!, {
    skip: isFetchSkip,
  });
  const dispatch = useAppDispatch();

  const handleGetFormData = async (e: FormEvent) => {
    e.preventDefault();

    if (!UID) {
      toast.error("Please enter UID");
      return;
    }

    if (UID.length < 24) {
      toast.error("Enter full UID");
      return;
    }

    if (captureTimeout) {
      clearTimeout(captureTimeout);
    }

    setIsFetchSkip(false);

    const tm = setTimeout(() => {
      setIsFetchSkip(true);
    }, 2000);

    setCaptureTimeout(tm);
  };

  const handleOnValueChange = (value: string) => setUID(value);

  const handleClose = () => {
    dispatch(toggleGetFormActive({ status: false }));
    dispatch(toggleFormActive({ status: false }));
  };

  if (isError) {
    toast.error("Something went wrong");
    return;
  }

  if (isLoading || isFetching) {
    return <ScreenLoader />;
  }

  return (
    <div className="space-y-4">
      <form
        onSubmit={handleGetFormData}
        className="p-4 relative space-y-4 rounded-lg bg-white"
      >
        <p>Please enter the form UID to retrieve your submission data.</p>
        <input
          onChange={(e) => handleOnValueChange(e.target.value)}
          type="text"
          className="outline-none w-full bg-transparent text-gray-700"
          placeholder="Enter form UID"
        />
        <button
          type="submit"
          className="px-3 w-full py-2 rounded-md smooth_transition active:scale-90 bg-primary text-white"
        >
          Get Form Information
        </button>
        <button
          onClick={() => handleClose()}
          className="absolute top-0 right-4 text-red-600"
        >
          <IoIosCloseCircle className="w-4 h-4" />
        </button>
      </form>

      {data?.data && (
        <article className="p-4 bg-white rounded-lg space-y-2">
          <h1 className="text-xl font-medium">{data?.data?.title}</h1>
          <p className="text-sm">{data?.data?.description}</p>
        </article>
      )}

      {data?.data?.participants?.map((info: object, idx: number) => {
        return (
          <article key={idx} className="p-4 bg-white rounded-lg">
            <ul>
              {Object.entries(info).map(([key, value]) => {
                if (typeof value === "object") {
                  return (
                    <div
                      key={key}
                      className="text-sm text-gray-600 gap-4 font-medium flex"
                    >
                      <span className="font-semibold">{key}:</span>
                      <ul>
                        {(value as [string]).map((v: string) => (
                          <li>{v}</li>
                        ))}
                      </ul>
                    </div>
                  );
                }
                return (
                  <li key={key} className="text-sm text-gray-600 flex gap-2 font-medium">
                    <span className="font-semibold">{key}:</span>
                    <span>{value}</span>
                  </li>
                );
              })}
            </ul>
          </article>
        );
      })}
    </div>
  );
};

export default Index;
