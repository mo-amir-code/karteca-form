import { CiCirclePlus } from "react-icons/ci";

const CreateForm = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <button className="w-full border-t-4 border-primary smooth_transition flex hover_effect items-center justify-center gap-2 py-12 bg-white rounded-lg">
        <CiCirclePlus className="w-20 text-primary h-20 " />
        <span className="text-xl">Create New Form</span>
      </button>
    </div>
  );
};

export default CreateForm;
