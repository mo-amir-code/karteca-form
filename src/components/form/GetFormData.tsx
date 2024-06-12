"use client"
import { useAppDispatch } from "@/redux/hooks";
import { toggleGetFormActive } from "@/redux/slices/form/formSlice";
import { IoAnalytics } from "react-icons/io5";

const GetFormData = () => {
  const dispatch = useAppDispatch();

  const handleActivateForm = () => {
    dispatch(toggleGetFormActive({status:true}));
  }

  return (
    <div className="flex justify-center items-center">
      <button onClick={() => handleActivateForm()} className="w-full border-t-4 border-primary smooth_transition flex hover_effect items-center justify-center gap-2 py-12 bg-white rounded-lg">
        <IoAnalytics className="w-20 text-primary h-20 " />
        <span className="text-xl">Get Form Data</span>
      </button>
    </div>
  );
};

export default GetFormData;
