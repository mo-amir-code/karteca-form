"use client";
import { useAppDispatch } from "@/redux/hooks";
import { setFormSubmitStatus, toggleFormActive } from "@/redux/slices/form/formSlice";
import { setIsFormSubmit } from "@/redux/slices/participant/participantSlice";
import { useRouter } from "next/navigation";

const SubmissionScreen = ({ title }: { title: string }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleClose = () => {
        dispatch(setFormSubmitStatus(false));
        dispatch(toggleFormActive({status: false}));
        dispatch(setIsFormSubmit({status: false}));
        router.push("/");
    }


  return (
    <article className="p-4 bg-white rounded-lg space-y-2">
      <h1 className="text-xl font-medium">{title}</h1>
      <p className="text-sm">
        Thank you! Your response has been recorded. We have successfully
        received your input and it will be reviewed or processed accordingly. If
        you have any further questions or need assistance, please feel free to
        reach out to our support team.
      </p>
      <button onClick={()=> handleClose()} className='px-4 py-2 bg-gray-900 rounded-lg text-white font-medium' >Back To Home</button>
    </article>
  );
};

export default SubmissionScreen;
