"use client"
import { useAppDispatch } from "@/redux/hooks";
import { toggleFormActive } from "@/redux/slices/form/formSlice";
import { CiCirclePlus } from "react-icons/ci";

const CreateForm = () => {
  const dispatch = useAppDispatch();

  const handleActivateForm = () => {
    dispatch(toggleFormActive({status:true}));
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <button onClick={() => handleActivateForm()} className="w-full border-t-4 border-primary smooth_transition flex hover_effect items-center justify-center gap-2 py-12 bg-white rounded-lg">
        <CiCirclePlus className="w-20 text-primary h-20 " />
        <span className="text-xl">Create New Form</span>
      </button>
    </div>
  );
};

export default CreateForm;
